+++
title = "Gist.uz imkoniyatlari: Markdown, Kod va Formulalar testi"
date = 2025-12-20
updated = 2025-12-21

[taxonomies]
tags = ["Test", "Gist", "Markdown", "IT"]
authors = ["Admin"]

[extra]
# Biz boya qo'shgan "Qisqacha" (TL;DR) qismi shu yerda chiqadi
tldr = "Bu maqola saytning texnik imkoniyatlarini namoyish etadi. Unda kod bloklari, matematik formulalar va matn formatlash namunalari keltirilgan."
toc = true  # Mundarijani yoqish
+++

Bu matn **Kirish qismi**. Bu yerda shriftlarning o‘qilishi va harflar (o‘, g‘, sh, ch) qanday ko‘rinayotganini tekshiramiz. 

Gist.uz — tahliliy portal bo‘lgani uchun matn ko‘zga yoqimli bo‘lishi shart.

## 1. Matn bezaklari (Typography)

Matn ichida turli xil urg‘ularni ishlatib ko‘ramiz:
* **Qalin matn (Bold):** Muhim fikrlarni ajratish uchun.
* *Yotiq matn (Italic):* Iqtiboslar yoki atamalar uchun.
* ~~O‘chirilgan matn (Strikethrough):~~ Eskirgan ma’lumotlar uchun.
* `Inline code`: Matn ichida `variable` yoki `fayl_nomi.txt` kabi so‘zlarni yozish uchun.
* [Havola (Link)](https://gist.uz): Boshqa sahifaga o‘tish uchun.

> **Iqtibos (Blockquote):** > "Ilm-fan — bu shunchaki bilimlar to‘plami emas, balki fikrlash usulidir." 
> — *Karl Sagan*

---

## 2. Dasturlash kodlari (Syntax Highlighting)

Biz IT haqida yozamiz, shuning uchun kodlar chiroyli chiqishi kerak. Quyida **Python** va **Rust** tillarida namuna:

### Python (Aiogram bot namunasi)
```python
from aiogram import Bot, Dispatcher, types
import asyncio

async def main():
    bot = Bot(token="SIZNING_TOKENINGIZ")
    dp = Dispatcher()

    # Start komandasi uchun handler
    @dp.message(command="start")
    async def cmd_start(message: types.Message):
        await message.answer("Salom! Gist.uz botiga xush kelibsiz!")

    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())