+++
title = "OOP: Dasturlashni o‘yinchoq qilish san’ati"
date = 2026-01-06
draft = false
tags = ["python", "oop", "deep-dive", "senior-level", "coding"]
+++

### Kirish: Nega Senior dasturchilar OOP ni yaxshi ko‘radi? 🍝 vs 🍱

Dasturlashni yangi boshlaganda kodingiz **Spagetti**ga o‘xshaydi: hamma narsa aralash-quralash, bitta joyni tortsangiz, boshqa joyi uzilib ketadi.

**OOP (Obyektga Yo‘naltirilgan Dasturlash)** esa kodingizni **Bento Box (Yapon tushlik qutisi)** ga aylantiradi: guruch alohida, go‘sht alohida, salat alohida. Har biri o‘z joyida va bir-biriga xalaqit bermaydi.

Bugun biz OOP ni shunchaki nazariya emas, balki real loyihalarda qanday ishlashini **Video O‘yinlar** mantig‘i orqali chuqur o‘rganamiz.

---

### 1. Class va Object: "Blueprint" va "Spawn" 🏗️

Eng ko‘p adashtiriladigan narsa: **Class** bu narsa emas, bu shunchaki qog‘ozdagi chizma.

* **Class:** Bu zavoddagi qolip. Masalan, "Dushman Tanki" chizmasi. Unda hali metall yo‘q, u otmaydi, yurmaydi.
* **Object (Instance):** Bu o‘sha qolipdan chiqqan, maydonda yurgan haqiqiy tank.

```python
class Tank:
    # Bu Class atributi (Hamma tanklar uchun umumiy qoida)
    # Agar buni o'zgartirsangiz, o'yindagi barcha tanklarda o'zgaradi
    server_region = "Asia" 

    def __init__(self, model, ammo):
        # Bu Instance atributlari (Har bir tankniki shaxsiy)
        self.model = model
        self.ammo = ammo

# Spawn qilamiz (Obyekt yaratamiz)
t1 = Tank("T-90", 50)
t2 = Tank("Abrams", 40)

print(t1.model)  # T-90
print(t2.model)  # Abrams
print(t1.server_region) # Asia (Ikkalasi ham bitta serverda)
```

**Qoida:** `server_region` o‘zgarsa, hamma tanklarda o‘zgaradi. `ammo` o‘zgarsa, faqat bitta tankniki o‘zgaradi.

---

### 2. `self` nima o‘zi? (Eng katta jumboq) 🤯

Ko‘pchilik so‘raydi: *"Nega har bir funksiyaga `self` yozishim shart?"*

Tasavvur qiling, o‘yinda 100 ta askar bor. Siz bittasiga "Otish!" deb buyruq berdingiz. Kompyuter qaysi biri otishi kerakligini qayerdan biladi?

**`self` — bu "Men" degani.**

Funksiya chaqirilganda, Python orqa fonda shunday qiladi:
`Tank.otish(t1)` — ya'ni, aynan `t1` otmoqda, `t2` emas.

```python
    def otish(self):
        # self.ammo degani — aynan MENING o'qim kamaysin, boshqaniki emas.
        self.ammo -= 1 
```

---

### 3. Sehrli Metodlar (Magic Methods): Kodingizga "Dush" beramiz ✨

Python-da `__` bilan boshlanib, `__` bilan tugaydigan metodlar bor. Bular "Dunder" (Double Underscore) metodlar deyiladi. Ular klassingizni xuddi Python-ning o‘zini kodidek tabiiy ishlashini ta’minlaydi.

#### `__init__` (Constructor)
Obyekt "tug‘ilgan" paytda (Spawn bo‘lganda) avtomatik ishlaydigan kod. Boshlang‘ich sozlamalar shu yerda bo‘ladi.

#### `__str__` (String Representation)
Oddiy holatda `print(t1)` qilsangiz, ekranga `<__main__.Tank object at 0x7f...>` degan xunuk yozuv chiqadi. `__str__` buni to‘g‘irlaydi.

```python
class Player:
    def __init__(self, nick, level):
        self.nick = nick
        self.level = level

    # Print qilinganda nima chiqsin?
    def __str__(self):
        return f"🎮 O'yinchi: {self.nick} | Level: {self.level}"

p1 = Player("Faker", 99)
print(p1) 
# Natija: 🎮 O'yinchi: Faker | Level: 99
```

---

### 4. Vorislik (Inheritance) va `super()` kuchi 🧬

Vorislik — bu "Copy-Paste" qilmasdan kodni kengaytirish usuli. Lekin bu yerda **`super()`** degan narsa bor, uni ko‘pchilik tushunmaydi.

Aytaylik, oddiy `Soldier` bor, biz uning asosida `Sniper` yaratmoqchimiz. Snayper ham askar, lekin uning qo‘shimcha `scope` (optika) xususiyati bo‘lishi kerak.

```python
class Soldier:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def run(self):
        print(f"{self.name} yugurmoqda!")

class Sniper(Soldier):
    def __init__(self, name, hp, zoom_level):
        # MUHIM JOYI: Ota klassning (Soldier) __init__ ini ishlatib yuboramiz
        # Chunki name va hp ni qayta yozish shart emas!
        super().__init__(name, hp) 
        
        # Bu esa yangi xususiyat
        self.zoom = zoom_level 

    def aim(self):
        print(f"{self.name} nishonga oldi ({self.zoom}x zoom).")

s1 = Sniper("Ghost", 100, "8x")
s1.run()  # Otasidan oldi
s1.aim()  # O'zining skilli
```

**`super().__init__(...)`** bo‘lmasa, otasidagi kodlar ishlamay qoladi va `name`, `hp` yaratilmaydi.

---

### 5. Polimorfizm: Bitta buyruq, har xil natija 🎭

Bu tushuncha juda sodda: Har xil obyektlar bitta metodga ega bo‘lsa, ularni bir xil tarzda boshqarish mumkin.

Masalan, o‘yinda `Qush`, `Samolyot` va `Supermen` bor. Hammasida `fly()` metodi bor. Biz ularni bitta siklga (loop) solib uchira olamiz.

```python
objektlar = [Qush(), Samolyot(), Supermen()]

for obj in objektlar:
    obj.fly() 
    # Python tekshirib o'tirmaydi, agar fly() bormi? Bajaraveradi.
    # Bu "Duck Typing" deyiladi: O'rdak kabi vaqillasa — demak u o'rdak.
```

---

### 6. Inkapsulyatsiya: "Private" ma’lumotlar 🔒

Haqiqiy loyihada ba’zi ma’lumotlarni tashqaridan himoyalash kerak. Masalan, bank hisobidagi pulni to‘g‘ridan-to‘g‘ri o‘zgartirib bo‘lmasligi kerak (Minusga kirib ketmasligi uchun).

Python-da to‘liq "Private" yo‘q, lekin kelishuv bor:
1.  `_name` (bitta chiziq): "Tegma, bu ichki o‘zgaruvchi" (lekin tegsa bo‘ladi).
2.  `__name` (ikkita chiziq): Python buni nomini o‘zgartirib yuboradi, tashqaridan topish qiyin bo‘ladi.

Zamonariy Python-da **Getter** va **Setter** lar uchun `@property` dekoratori ishlatiladi. Bu haqiqiy professional yondashuv:

```python
class Account:
    def __init__(self, money):
        self.__money = money # Yashirin (Private)

    # Getter: Pulni ko'rish uchun ruxsat beramiz
    @property
    def balance(self):
        return f"Sizda {self.__money}$ bor."

    # Setter: Pulni o'zgartirish uchun qoida qo'yamiz
    @balance.setter
    def balance(self, value):
        if value < 0:
            print("Xatolik! Balans manfiy bo'lolmaydi.")
        else:
            self.__money = value

acc = Account(100)
print(acc.balance) # Sizda 100$ bor.

acc.balance = -50  # Xatolik! Balans manfiy bo'lolmaydi.
acc.balance = 500  # Ishladi.
```

Bu usul orqali siz o‘zgaruvchini himoyalaysiz va unga "Filtr" o‘rnatasiz.

---

### Xulosa: Qachon nimani ishlatamiz?

| Tushuncha | Qachon kerak? |
| :--- | :--- |
| **Class** | Yangi turdagi ma'lumot (User, Post, Product) yaratmoqchi bo'lsangiz. |
| **Instance** | O'sha ma'lumotdan aniq bitta nusxa kerak bo'lsa (User: Abror). |
| **Inheritance** | Kod qaytarilmasligi uchun (Admin ham User, lekin qo'shimcha huquqi bor). |
| **Encapsulation** | Ma'lumotni noto'g'ri o'zgartirishdan saqlash uchun. |
| **Polymorphism** | Har xil obyektlar bilan bir xil tilda gaplashish uchun. |

OOP — bu dasturlashning "kattalar ligasi". Boshida qiyin tuyuladi, lekin bir marta tushunib olsangiz, orqaga qaytolmaysiz! 🚀
