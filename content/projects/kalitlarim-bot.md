+++
title = "Kalitlarim Bot — Fayllarni shifrlash"
date = 2025-12-18
description = "Telegram serverlaridan bepul bulutli ombor (cloud storage) sifatida foydalanish va ma'lumotlar bazasi arxitekturasi."
weight = 1
[taxonomies]
tags = ["database", "telegram-api", "tools"]
[extra]
local_image = "images/kb.jpg"
demo = "https://t.me/kalitlarim_bot"
+++

**Kalitlarim Bot** — bu oddiy fayl almashish servisi emas, balki Telegram'ning cheksiz serverlaridan oqilona foydalanish usulidir. Loyiha g'oyasi oddiy: faylni yuklaysiz va unga "kalit" (parol) biriktirasiz.

### 🧩 Loyiha arxitekturasi
Loyiha **Key-Value** (Kalit-Qiymat) ma'lumotlar bazasi prinsipiga asoslangan:
1.  **Upload:** Foydalanuvchi fayl yuborganida, Telegram unga `file_id` beradi. Bot faylni o'zini emas, faqat shu ID ni va foydalanuvchi kiritgan "Kalit so'z"ni bazaga saqlaydi.
2.  **Download:** Boshqa foydalanuvchi kalit so'zni yozganda, bot bazadan unga mos `file_id` ni topadi va Telegram serveridan faylni chaqirib beradi.

Bu usul server xotirasini tejashga va katta hajmdagi fayllarni ham oson boshqarishga yordam beradi.

### ✨ Asosiy funksional
* **Parollash tizimi:** Faylga kirishni cheklash imkoniyati.
* **Universal format:** `.exe`, `.apk`, `.pdf`, `.mp4` — format tanlamaydi.
* **Share funksiyasi:** Kalitni ulashish orqali faylni istalgan joydan yuklab olish mumkin.

### 👨‍💻 Dasturchilar uchun
Ushbu loyiha orqali siz:
* NoSQL yoki SQL bazalarda oddiy bog'lanishlarni (Relations) qurishni;
* Foydalanuvchi kiritgan ma'lumotlarni validatsiya qilishni;
* Telegram Bot orqali "File Management System" yaratishni o'rganasiz.

[Botga o'tish](https://t.me/kalitlarim_bot)