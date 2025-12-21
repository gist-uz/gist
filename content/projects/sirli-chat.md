+++
title = "Sirli Chat Bot — Anonim aloqa tizimi qanday ishlaydi?"
date = 2025-12-19
description = "Telegram Bot API orqali foydalanuvchilar o'rtasida 'ko'prik' (bridge) hosil qilish va ma'lumotlar maxfiyligini ta'minlash."
weight = 2
[taxonomies]
tags = ["telegram-bot", "backend", "security", "python"]
[extra]
demo = "https://t.me/sirlichat_bot"
local_image = "images/ac.jpg"
+++

**Sirli Chat Bot** — bu foydalanuvchilarning shaxsiy ma'lumotlarini yashirgan holda o'zaro muloqot qilishini ta'minlovchi vosita. Loyiha Telegram Bot API imkoniyatlaridan maksimal darajada foydalanishga qaratilgan.

### 🔐 Ishlash prinsipi (Architecture)
Bot "Man-in-the-Middle" (O'rtadagi odam) prinsipida ishlaydi:
1.  **A foydalanuvchi** xabar yozadi.
2.  **Bot** xabarni qabul qiladi, lekin uni bazaga saqlamaydi (maxfiylik uchun).
3.  Bot xabarni **B foydalanuvchiga** o'z nomidan yuboradi.

Natijada, ikki tomon bir-birining profilini ko'ra olmaydi, faqat Botni ko'radi.

### ⚙️ Texnik xususiyatlar
* **Deep Linking:** Har bir foydalanuvchi uchun `t.me/bot?start=unique_id` ko'rinishidagi unikal havola generatsiya qilinadi. Bu orqali aniq bir odamga anonim xabar yozish mumkin.
* **Media Handling:** Bot nafaqat matn, balki rasm, video, stiker va ovozli xabarlarni ham qayta ishlash (forward qilish emas, nusxalab yuborish) qobiliyatiga ega.
* **Session Management:** Suhbat jarayonini boshqarish — qachon suhbat boshlandi va qachon tugatildi.

### 🚀 Ochiq koddan o'rganish
Agar siz shunday bot yozmoqchi bo'lsangiz, ushbu loyiha sizga quyidagilarni o'rgatadi:
* Telegram'ning `user_id` va `chat_id` bilan ishlash logikasi.
* Bot orqali fayllarni qabul qilish va yuborish.
* Ma'lumotlar bazasida foydalanuvchilar sessiyasini boshqarish.

[Botni ishlatib ko'rish](https://t.me/sirlichat_bot)