import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure required API keys are present
if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is missing.");
  process.exit(1);
}
if (!process.env.OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY environment variable is missing.");
  process.exit(1);
}

// Initialize clients
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const categories = [
  "IT va Dasturlash (yangi texnologiyalar, sun'iy intellekt, dasturiy injiniring)",
  "Startaplar va Biznes (biznes modellar, startap muvaffaqaqiyati/xatolari, venchur kapitali)",
  "Ilm-fan va Texnologiya (kashfiyotlar, kelajak texnologiyalari, fizika/kosmos)",
  "Tanqidiy fikrlash va Psixologiya (kognitiv xatolar, samaradorlik, inson psixologiyasi, ta'lim)",
  "Karyera va O'z-o'zini rivojlantirish (deep work, vaqtni boshqarish, kasbiy o'sish)"
];

const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)];

function slugify(text) {
  let slug = text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text

  if (slug.length > 50) {
    slug = slug.substring(0, 50).replace(/-+$/, '');
  }

  return slug;
}

function sentenceCaseHeadings(markdown) {
  return markdown
    .split('\n')
    .map((line) => {
      const m = line.match(/^(##+\s+)(\S)(.*)$/);
      if (!m) return line;
      const [, prefix, firstChar, rest] = m;
      return `${prefix}${firstChar.toUpperCase()}${rest}`;
    })
    .join('\n');
}

function getExistingTopics() {
  const postsDir = path.join(__dirname, '..', 'content', 'posts');
  let topics = [];
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md') && file !== '_index.md');
    for (const file of files) {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const titleMatch = content.match(/title\s*=\s*"([^"]+)"/);
      if (titleMatch && titleMatch[1]) {
        topics.push(titleMatch[1]);
      }
    }
  }
  return topics;
}

async function generateArticle() {
  const selectedCategory = getRandomCategory();
  console.log(`\n🤖 Seçilgan mavzu yo'nalishi: ${selectedCategory}\n`);

  const existingTopics = getExistingTopics();
  const excludePrompt = existingTopics.length > 0
    ? `\nDiqqat! Saytda quyidagi mavzularda maqolalar ALLAQACHON yozilgan. Iltimos, mutlaqo YANGI, avval yozilmagan mavzu tanlang:\n- ${existingTopics.join('\n- ')}\n`
    : "";

  // Phase 1: Drafting with Gemini
  console.log("Bosqich 1: Gemini orqali dastlabki qoralamani yozish...");

  const draftPrompt = `
Siz "Gist.uz" - ilm-fan, dasturlash, startaplar va tanqidiy fikrlash haqida tahliliy maqolalar platformasi uchun tajribali avtorsiz.
Bugungi maqola mavzusi quyidagi yo'nalishda bo'lishi kerak: ${selectedCategory}
${excludePrompt}
O'zingiz aniq va qiziqarli, o'quvchini jalb qiladigan, zamonaviy va biroz provokatsion sarlavha o'ylab toping.
Keyin shu mavzuda keng qamrovli, tahliliy, mantiqiy ketma-ketlikka ega bo'lgan maqola yozing. Matn hajmi juda katta va batafsil (kamida 1200-1500 so'z) bo'lishi SHART. Har bir paragrafda chuqur fi[...]
Matn faqat o'zbek tilida (kirill yozuvidan qochib, lotin alifbosida) bo'lishi shart.
MUHIM uslub qoidasi: barcha title, subtitle, header va oddiy matn Sentence case bo'lsin.
Faqat birinchi so'z bosh harf bilan yozilsin, qolgan so'zlar kichik harf bo'lsin (proper noun va rasmiy acronym bundan mustasno).
Never use Title Case (capitalizing the first letter of every word).
`;

  let draftText = "";
  let usedGeminiModel = null;
  const geminiModels = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-3-flash'];

  for (const modelName of geminiModels) {
    try {
      console.log(`Gemini modeli orqali urinish: ${modelName}`);
      const draftResponse = await ai.models.generateContent({
        model: modelName,
        contents: draftPrompt,
      });
      draftText = draftResponse.text;
      usedGeminiModel = modelName;
      console.log(`Gemini (${modelName}) qoralamani muvaffaqiyatli yakunladi!\n`);
      break; // Successfully generated, exit loop
    } catch (error) {
      console.warn(`⚠️ ${modelName} modelida xatolik:`, error.message);
    }
  }

  // Phase 2: Review and formatting with OpenAI
  const today = new Date().toISOString().split('T')[0];
  let reviewPrompt = "";

  if (draftText) {
    console.log("Bosqich 2: OpenAI (GPT-4o) orqali matnni sayqallash va formatlash...");
    reviewPrompt = `
Quyida sizga "Gist.uz" sayti uchun yozilgan maqola qoralamasi taqdim etiladi. Sizning vazifangiz:
1. Matn sifatini juda yuqori darajaga ko'tarish, xatolarni to'g'rilash va tilni yanada boy, professional va tahliliy (lekin tushunarli) qilish.
2. Zola static site generator talablariga mos keladigan TO'LIQ Markdown faylini yaratish.

Faylning eng yuqori qismida quyidagi kabi Frontmatter bo'lishi SHART:
+++
title = "Maqolaning zo'r sarlavhasi"
slug = "qisqa-nom"
date = ${today}
description = "Maqola haqida 1-2 gapdan iborat qisqacha, qiziqarli ta'rif"
[taxonomies]
tags = ["tag1", "tag2", "tag3", "tag4"]
+++

Frontmatterdan keyin esa darhol maqolaning o'zi, markdown formatida (## sarlavhalar, *qalin yozuvlar*, ro'yxatlar) kelishi kerak. Matn uzun, batafsil va sifatli bo'lsin. Hech qanday markdown kod [...]

MUHIM QOIDA: Barcha title, subtitle, header (##, ###) va oddiy matn Sentence case bo'lsin.
Faqat birinchi so'z bosh harf bilan yozilsin, qolgan so'zlar kichik harf bo'lsin (proper noun va rasmiy acronym bundan mustasno).
Never use Title Case (capitalizing the first letter of every word).

MUHIM: slug maydonida FAQAT 1-2 so'zdan iborat juda qisqa nom yozing. Masalan: "etika-dilemma", "kvant-kompyuter", "startap-xato". HECH QACHON uzun slug yozmang!

Important formatting rule for TOML front matter:
- Return valid TOML only.
- If any field contains double quotes ("), escape them as \".
- Do not output unescaped " inside TOML string values.

Mana qoralama:
${draftText}
`;
  } else {
    console.log("Bosqich 1: Barcha Gemini modellari band yoki xato berdi.");
    console.log("Bosqich 2: OpenAI (GPT-4o) butun maqolani noldan o'zi yozmoqda...");
    reviewPrompt = `
Siz "Gist.uz" - ilm-fan, dasturlash, startaplar va tanqidiy fikrlash haqida tahliliy maqolalar platformasi uchun tajribali avtorsiz.
Bugungi maqola mavzusi quyidagi yo'nalishda bo'lishi kerak: ${selectedCategory}
${excludePrompt}
O'zingiz aniq va qiziqarli, o'quvchini jalb qiladigan, zamonaviy va biroz provokatsion sarlavha o'ylab toping.
Keyin shu mavzuda keng qamrovli, tahliliy, mantiqiy ketma-ketlikka ega bo'lgan maqola yozing. Matn hajmi juda katta va batafsil (kamida 1200-1500 so'z) bo'lishi SHART. Har bir paragrafda chuqur f[...]
Matn faqat o'zbek tilida (kirill yozuvidan qochib, lotin alifbosida) bo'lishi shart.
Zola static site generator talablariga mos keladigan TO'LIQ Markdown faylini yarating.

Faylning eng yuqori qismida quyidagi kabi Frontmatter bo'lishi SHART:
+++
title = "Maqolaning zo'r sarlavhasi"
slug = "qisqa-nom"
date = ${today}
description = "Maqola haqida 1-2 gapdan iborat qisqacha, qiziqarli ta'rif"
[taxonomies]
tags = ["tag1", "tag2", "tag3", "tag4"]
+++

Frontmatterdan keyin esa darhol maqolaning o'zi, markdown formatida (## sarlavhalar, *qalin yozuvlar*, ro'yxatlar) kelishi kerak. Matn uzun, batafsil va sifatli bo'lsin. Hech qanday markdown kod [...]

MUHIM QOIDA: Barcha title, subtitle, header (##, ###) va oddiy matn Sentence case bo'lsin.
Faqat birinchi so'z bosh harf bilan yozilsin, qolgan so'zlar kichik harf bo'lsin (proper noun va rasmiy acronym bundan mustasno).
Never use Title Case (capitalizing the first letter of every word).

MUHIM: slug maydonida FAQAT 1-2 so'zdan iborat juda qisqa nom yozing. Masalan: "etika-dilemma", "kvant-kompyuter", "startap-xato". HECH QACHON uzun slug yozmang!

Important formatting rule for TOML front matter:
- Return valid TOML only.
- If any field contains double quotes ("), escape them as \".
- Do not output unescaped " inside TOML string values.
`;
  }

  let finalMarkdown = "";
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: reviewPrompt }],
    });

    finalMarkdown = completion.choices[0].message.content;

    // Remove markdown code block wrapping if GPT still added it
    if (finalMarkdown.startsWith("```markdown")) {
      finalMarkdown = finalMarkdown.substring(11);
    }
    if (finalMarkdown.startsWith("```")) {
      finalMarkdown = finalMarkdown.substring(3);
    }
    if (finalMarkdown.endsWith("```")) {
      finalMarkdown = finalMarkdown.substring(0, finalMarkdown.length - 3);
    }
    finalMarkdown = finalMarkdown.trim();

    // Enforce heading capitalization for ##/### as a post-processing safety step
    finalMarkdown = sentenceCaseHeadings(finalMarkdown);

    // Post-processing to inject AI metadata into frontmatter
    const extraBlock = `[extra]\ndraft_model = "${usedGeminiModel || 'none'}"\nreview_model = "gpt-4o"\nai_authors = "${usedGeminiModel ? `Google ${usedGeminiModel} + OpenAI GPT-4o` : 'OpenAI GPT-4o'}"\n`;
    if (finalMarkdown.startsWith('+++')) {
      const secondPos = finalMarkdown.indexOf('+++', 3);
      if (secondPos !== -1 && !finalMarkdown.substring(0, secondPos).includes('[extra]')) {
        finalMarkdown = finalMarkdown.substring(0, secondPos) + extraBlock + finalMarkdown.substring(secondPos);
      }
    }

    console.log("OpenAI matnni yakunladi!\n");
  } catch (error) {
    console.error("OpenAI API da xatolik yuz berdi:", error);
    process.exit(1);
  }

  // Extract title and slug
  let slug = `maqola-${Date.now()}`;
  const slugMatch = finalMarkdown.match(/slug\s*=\s*"([^"]+)"/);
  const titleMatch = finalMarkdown.match(/title\s*=\s*"([^"]+)"/);

  if (slugMatch && slugMatch[1]) {
    slug = slugify(slugMatch[1]);
  } else if (titleMatch && titleMatch[1]) {
    slug = slugify(titleMatch[1]);
  }

  let title = titleMatch && titleMatch[1] ? titleMatch[1] : "Yangi Maqola";

  const descMatch = finalMarkdown.match(/description\s*=\s*"([^"]+)"/);
  const description = descMatch && descMatch[1] ? descMatch[1] : "";

  // Save the file
  const postsDir = path.join(__dirname, '..', 'content', 'posts');
  const filePath = path.join(postsDir, `${slug}.md`);
  fs.writeFileSync(filePath, finalMarkdown, 'utf-8');
  console.log(`✅ Maqola muvaffaqiyatli saqlandi: content/posts/${slug}.md\n`);

  // Phase 3: Save Telegram notification data for later (after git push + Cloudflare deploy)
  const articleUrl = `https://gist.uz/posts/${slug}/`;
  const notificationData = {
    title,
    description,
    slug,
    url: articleUrl
  };
  const notifPath = path.join(__dirname, '..', '.telegram-notification.json');
  fs.writeFileSync(notifPath, JSON.stringify(notificationData, null, 2), 'utf-8');
  console.log("📋 Telegram xabar ma'lumotlari saqlandi (.telegram-notification.json)\n");
}

generateArticle();
