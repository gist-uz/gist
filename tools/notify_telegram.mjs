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

function escapeMarkdownV2(text) {
    return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
}

const message = `[​](${escapeMarkdownV2(data.url)})` +
    `![\\#️⃣](tg://emoji?id=5197460222628624076) *Yangi maqola Gist\\.uz'da\\!*\n\n` +
    `![📖](tg://emoji?id=5422884098010030326) *Sarlavha:* ${escapeMarkdownV2(data.title)}\n` +
    `![💡](tg://emoji?id=5422677162190742205) *Qisqacha:* _${escapeMarkdownV2(data.description)}_`;

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
            text: message,
            parse_mode: 'MarkdownV2',
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
