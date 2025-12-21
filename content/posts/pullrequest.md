+++
title = "Gist.uz saytiga qanday qilib maqola yuborish mumkin?"
date = 2025-12-21
description = "GitHub orqali Pull Request (PR) yuborish va ochiq kodli blogga o'z hissangizni qo'shish bo'yicha qadamma-qadam qo'llanma."
[taxonomies]
tags = ["github", "tutorial", "opensource", "hamma-uchun"]
+++

Ushbu blog — **ochiq kodli** (open-source) loyiha. Bu degani, har bir dasturchi yoki texnologiya ixlosmandi o‘z bilimlarini ulashish uchun bu yerda maqola chop etishi mumkin.

Sizga murakkab dasturlarni o‘rnatish shart emas. Barchasini to‘g‘ridan-to‘g‘ri **GitHub saytining o‘zida** amalga oshirishingiz mumkin. Quyida buni qanday qilishni o‘rganamiz.

## 1-qadam: Loyihadan nusxa olish (Fork)

Avvalo, bizning loyihamizni o‘zingizning GitHub profilingizga nusxalab olishingiz kerak.

1. [Gist.uz GitHub sahifasiga](https://github.com/gist-uz/gist) kiring.
2. O‘ng tepa burchakdagi **Fork** tugmasini bosing.
3. "Create fork" tugmasini bosib tasdiqlang.

Endi sizning profilingizda loyihaning shaxsiy nusxasi paydo bo‘ldi.

## 2-qadam: Yangi fayl yaratish

Endi maqolangiz uchun fayl yaratamiz.

1. O‘zingiz "Fork" qilgan loyihaga kiring (u `sizning-nick/gist` ko‘rinishida bo‘ladi).
2. **`content`** papkasiga kiring (agar kategoriya bo'lsa, masalan `content/blog` ichiga kiring).
3. O‘ng tomondagi **Add file** tugmasini bosib, **Create new file** ni tanlang.
4. Faylga nom bering. Nom lotin harflarida va bo‘sh joylarsiz bo‘lishi kerak (masalan: `docker-ornatish-qollanmasi.md`). Oxiri albatta `.md` bilan tugasin.

## 3-qadam: Maqolani yozish (Eng muhim qismi)

Zola tizimi maqolani to‘g‘ri o‘qishi uchun faylning eng boshiga maxsus sozlamalar (**Front Matter**) yozilishi shart.

Fayl ichiga quyidagi shablonni nusxalab qo‘ying va o‘zingizga moslab o‘zgartiring:

```toml
+++
title = "Maqolangizning Sarlavhasi"
date = 2025-12-21
description = "Maqola haqida qisqacha 1-2 gap (bu qidiruv tizimlarida ko'rinadi)"
[taxonomies]
tags = ["dasturlash", "yangi texnologiya", "tutorial"]
+++

Salom! Bu mening birinchi maqolam...
(Bu yerdan pastga oddiy Markdown formatida maqolangizni yozib ketaverasiz)
