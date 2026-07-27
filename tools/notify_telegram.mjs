import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notifPath = path.join(__dirname, '..', '.telegram-notification.json');

if (!fs.existsSync(notifPath)) {
    console.log("⚠️ .telegram-notification.json topilmadi, Telegram xabar yuborilmadi.");
    process.exit(0);
}

const tgToken = process.env.TELEGRAM_BOT_TOKEN;
const tgChatId = process.env.TELEGRAM_CHAT_ID;

if (!tgToken || !tgChatId) {
    console.log("⚠️ TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID yo'q, o'tkazib yuborildi.");
    process.exit(0);
}

const data = JSON.parse(fs.readFileSync(notifPath, 'utf-8'));

// Custom emoji: bot egasi Premium bo'lsa, animated custom emoji ishlaydi
// Entities orqali custom emoji yuboriladi (to'g'ri usul)
const EMOJI = {
    HASH:  { char: "#️⃣", id: "5197460222628624076" },
    INFO:  { char: "ℹ️",  id: "5422440780075672662" },
    BOOK:  { char: "📖", id: "5422884098010030326" },
    BULB:  { char: "💡", id: "5422677162190742205" },
};

// Xabar matni — oddiy emoji placeholder bilan
const line1 = `#️⃣ Yangi maqola Gist.uz'da!\n\n`;
const line2 = `📖 Sarlavha: ${data.title}\n`;
const line3 = `💡 Qisqacha: ${data.description}`;
const text = line1 + line2 + line3;

// Custom emoji entities — har bir emoji uchun offset va length hisoblash
function buildEntities(text) {
    const entities = [];
    
    // #️⃣ emoji — birinchi belgi (offset 0)
    entities.push({
        type: "custom_emoji",
        offset: 0,
        length: EMOJI.HASH.char.length,
        custom_emoji_id: EMOJI.HASH.id
    });

    // 📖 emoji — line2 boshida
    const bookOffset = line1.length;
    entities.push({
        type: "custom_emoji",
        offset: bookOffset,
        length: EMOJI.BOOK.char.length,
        custom_emoji_id: EMOJI.BOOK.id
    });

    // 💡 emoji — line3 boshida
    const bulbOffset = line1.length + line2.length;
    entities.push({
        type: "custom_emoji",
        offset: bulbOffset,
        length: EMOJI.BULB.char.length,
        custom_emoji_id: EMOJI.BULB.id
    });

    // Bold: "Yangi maqola Gist.uz'da!" 
    const boldStart = EMOJI.HASH.char.length + 1; // after emoji + space
    const boldText = "Yangi maqola Gist.uz'da!";
    entities.push({
        type: "bold",
        offset: boldStart,
        length: boldText.length
    });

    // Bold: "Sarlavha:" 
    const sarlavhaStart = bookOffset + EMOJI.BOOK.char.length + 1;
    entities.push({
        type: "bold",
        offset: sarlavhaStart,
        length: "Sarlavha:".length
    });

    // Italic: description
    const descStart = bulbOffset + EMOJI.BULB.char.length + " Qisqacha: ".length;
    entities.push({
        type: "italic",
        offset: descStart,
        length: data.description.length
    });

    return entities;
}

const entities = buildEntities(text);

const inlineKeyboard = {
    inline_keyboard: [
        [{ text: "📖 Maqolani o'qish", url: data.url }]
    ]
};

try {
    const res = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: tgChatId,
            text: text,
            entities: entities,
            reply_markup: inlineKeyboard,
            link_preview_options: {
                url: data.url,
                show_above_text: true,
                prefer_large_media: true
            }
        })
    });

    if (res.ok) {
        console.log("✅ Telegramga xabar yuborildi!");
    } else {
        console.error("❌ Telegram xatolik:", await res.text());
    }
} catch (err) {
    console.error("❌ Tarmoq xatosi:", err);
}

// Tozalash
fs.unlinkSync(notifPath);
