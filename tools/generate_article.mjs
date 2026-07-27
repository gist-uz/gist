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
  "Startaplar va Biznes (biznes modellar, startap muvaffaqiyati/xatolari, venchur kapitali)",
  "Ilm-fan va Texnologiya (kashfiyotlar, kelajak texnologiyalari, fizika/kosmos)",
  "Tanqidiy fikrlash va Psixologiya (kognitiv xatolar, samaradorlik, inson psixologiyasi, ta'lim)",
  "Karyera va O'z-o'zini rivojlantirish (deep work, vaqtni boshqarish, kasbiy o'sish)"
];

const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)];

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

async function generateArticle() {
  const selectedCategory = getRandomCategory();
  console.log(`\n🤖 Seçilgan mavzu yo'nalishi: ${selectedCategory}\n`);

  // Phase 1: Drafting with Gemini
  console.log("Bosqich 1: Gemini orqali dastlabki qoralamani yozish...");
  
  const draftPrompt = `
Siz "Gist.uz" - ilm-fan, dasturlash, startaplar va tanqidiy fikrlash haqida tahliliy maqolalar platformasi uchun tajribali avtorsiz.
Bugungi maqola mavzusi quyidagi yo'nalishda bo'lishi kerak: ${selectedCategory}
O'zingiz aniq va qiziqarli, o'quvchini jalb qiladigan, zamonaviy va biroz provokatsion sarlavha o'ylab toping.
Keyin shu mavzuda keng qamrovli, tahliliy, mantiqiy ketma-ketlikka ega bo'lgan maqola yozing (kamida 800-1000 so'z).
Matn faqat o'zbek tilida (kirill yozuvidan qochib, lotin alifbosida) bo'lishi shart.
`;

  let draftText = "";
  try {
    const draftResponse = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: draftPrompt,
    });
    draftText = draftResponse.text;
    console.log("Gemini qoralamani muvaffaqiyatli yakunladi!\n");
  } catch (error) {
    console.error("Gemini API da xatolik yuz berdi:", error);
    process.exit(1);
  }

  // Phase 2: Review and formatting with OpenAI
  console.log("Bosqich 2: OpenAI (GPT-4o) orqali matnni sayqallash va formatlash...");
  
  const today = new Date().toISOString().split('T')[0];

  const reviewPrompt = `
Quyida sizga "Gist.uz" sayti uchun yozilgan maqola qoralamasi taqdim etiladi. Sizning vazifangiz:
1. Matn sifatini juda yuqori darajaga ko'tarish, xatolarni to'g'rilash va tilni yanada boy, professional va tahliliy (lekin tushunarli) qilish.
2. Zola static site generator talablariga mos keladigan TO'LIQ Markdown faylini yaratish.

Faylning eng yuqori qismida quyidagi kabi Frontmatter bo'lishi SHART:
+++
title = "Maqolaning zo'r sarlavhasi"
date = ${today}
description = "Maqola haqida 1-2 gapdan iborat qisqacha, qiziqarli ta'rif"
[taxonomies]
tags = ["tag1", "tag2", "tag3", "tag4"]
+++

Frontmatterdan keyin esa darhol maqolaning o'zi, markdown formatida (## sarlavhalar, *qalin yozuvlar*, ro'yxatlar) kelishi kerak. Matn uzun, batafsil va sifatli bo'lsin. Hech qanday markdown kod bloklari ichiga olmang, to'g'ridan to'g'ri fayl matnini bering (ya'ni \`\`\`markdown deb boshlamang).

Mana qoralama:
${draftText}
`;

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

    console.log("OpenAI matnni yakunladi!\n");
  } catch (error) {
    console.error("OpenAI API da xatolik yuz berdi:", error);
    process.exit(1);
  }

  // Extract title for slug
  let slug = `maqola-${Date.now()}`;
  const titleMatch = finalMarkdown.match(/title\s*=\s*"([^"]+)"/);
  let title = "Yangi Maqola";
  if (titleMatch && titleMatch[1]) {
      title = titleMatch[1];
      slug = slugify(titleMatch[1]);
  }
  
  const descMatch = finalMarkdown.match(/description\s*=\s*"([^"]+)"/);
  const description = descMatch && descMatch[1] ? descMatch[1] : "";

  // Save the file
  const postsDir = path.join(__dirname, '..', 'content', 'posts');
  const filePath = path.join(postsDir, `${slug}.md`);
  fs.writeFileSync(filePath, finalMarkdown, 'utf-8');
  console.log(`✅ Maqola muvaffaqiyatli saqlandi: content/posts/${slug}.md\n`);
  
  // Phase 3: Telegram Notification
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;
  
  if (tgToken && tgChatId) {
      console.log("Bosqich 3: Telegramga e'lon yuborish...");
      const articleUrl = `https://gist.uz/posts/${slug}/`; // Based on your site structure
      
      const message = `🔥 **Yangi maqola Gist.uz'da!**\n\n` + 
                      `📖 **Sarlavha:** ${title}\n` +
                      `💡 **Qisqacha:** ${description}\n\n` +
                      `👉 To'liq o'qish uchun havola: ${articleUrl}`;
                      
      try {
          const res = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  chat_id: tgChatId,
                  text: message,
                  parse_mode: 'Markdown'
              })
          });
          if (res.ok) {
              console.log("✅ Telegramga xabar yuborildi!");
          } else {
              console.error("❌ Telegram xabar jo'natishda xatolik:", await res.text());
          }
      } catch (err) {
          console.error("❌ Telegram qismida tarmoq xatosi:", err);
      }
  } else {
      console.log("⚠️ TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID yo'q, Telegram e'lon o'tkazib yuborildi.");
  }
}

generateArticle();
