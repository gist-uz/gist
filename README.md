# Gist.uz — Ochiq Kodli Texnologik Blog

Ushbu loyiha **Gist.uz** saytining manba kodi hisoblanadi. Sayt **Zola** statik sayt generatori yordamida qurilgan va **Cloudflare Pages** orqali ishlaydi.

Maqsadimiz — o‘zbek tilida sifatli texnik kontent yaratish va dasturchilar hamjamiyatini rivojlantirish. Loyiha ochiq (open-source) bo‘lib, har kim o‘z hissasini qo‘shishi mumkin.

## 🚀 Loyihani mahalliy kompyuterda ishga tushirish

O‘zgarish kiritishdan oldin saytni o‘z kompyuteringizda ko‘rishni istasangiz, quyidagi qadamlarni bajaring:

### 1. Zola-ni o‘rnatish
Sayt ishlashi uchun **Zola** dasturi kerak bo‘ladi.
* **macOS:** `brew install zola`
* **Windows:** `choco install zola`
* **Linux:** Paket menejeringiz orqali yoki [GitHub Release](https://github.com/getzola/zola/releases) sahifasidan yuklab oling.

### 2. Loyihani ko‘chirib olish (Clone)
```bash
git clone [https://github.com/gist-uz/gist.git](https://github.com/gist-uz/gist.git)
cd gist
```

### 3. Serverni ishga tushirish
Terminalda quyidagi buyruqni bering:
```bash
zola serve
```
Sayt `http://127.0.0.1:1111` manzilida ochiladi.

---

## ✍️ Qanday qilib maqola qo‘shish mumkin?

Biz hamjamiyat a'zolarining maqolalarini kutib qolamiz! Yangi post qo‘shish uchun quyidagi tartibda ishlang:

1.  **Fork qiling:** Ushbu repository-ni o‘z profilingizga "Fork" tugmasi orqali nusxalab oling.
2.  **Fayl yarating:** `content/` papkasi ichida yangi `.md` (Markdown) fayl yarating (masalan: `content/blog/yangi-maqola.md`).
3.  **Front Matter yozing:** Faylning eng yuqori qismiga quyidagi sozlamalarni kiriting:

    ```toml
    +++
    title = "Maqola Sarlavhasi"
    date = 2025-12-21
    description = "Maqola haqida qisqacha ta'rif (meta description uchun)"
    [taxonomies]
    tags = ["dasturlash", "tutorial", "zola"]
    +++
    ```

4.  **Maqolani yozing:** "+++" belgisidan pastga maqola matnini yozing. Markdown formatidan foydalaning (sarlavhalar uchun `#`, rasmlar uchun `![]()`, kodlar uchun ` ``` `).
5.  **Pull Request (PR) yuboring:** O‘zgarishlarni saqlang, GitHub-ga yuklang va bizning asosiy repository-ga **Pull Request** yuboring.

Biz sizning PR-ingizni ko‘rib chiqamiz va agar hammasi joyida bo‘lsa, u saytda e'lon qilinadi!

---

## 🛠 Texnologiyalar

* **Engine:** [Zola](https://www.getzola.org/) (Rust tilida yozilgan tezkor SSG)
* **Hosting:** Cloudflare Pages
* **Theme:** Apollo (moslashtirilgan)

## 📄 Litsenziya

Ushbu loyiha ochiq manba bo'lib, [MIT License](LICENSE) ostida tarqatiladi.