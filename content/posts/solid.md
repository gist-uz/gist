+++
title = "SOLID: Kodingizni \"Musor\"dan \"San’at asari\"ga aylantirish sirlari"
date = 2026-01-08
draft = false
tags = ["python", "solid", "clean-code", "architecture", "senior-level"]
+++

### Kirish: OOP ni bilish yetarli emasmi? 🏗️

Biz avvalgi **[OOP haqidagi maqolamizda](@/posts/oop.md)** Class va Obyektlar nima ekanligini, ularni o‘yinlar misolida qanday ishlatishni ko‘rib chiqqan edik.

Lekin... OOP ni bilish — bu g‘isht terishni bilish degani. Chiroyli va mustahkam bino qurish uchun esa sizga **Arxitektura** kerak. Agar qoidalarga amal qilmasangiz, kodingiz vaqt o‘tishi bilan **"Makaron Monster"**ga aylanadi: bir joyni tuzatsangiz, boshqa joyi sinib ketaveradi.

Buning oldini olish uchun 5 ta oltin qoida bor. Ularning bosh harflari **SOLID** deb ataladi.

---

### 1. S — Single Responsibility Principle (Yagona Mas’uliyat) 🎯

**Qoida:** "Har bir Class yoki Funksiya faqat BITTA ishni qilishi kerak."

Tasavvur qiling, sizda `ShvetsariyaPichog'i` bor. U ham kesadi, ham buraydi, ham tirnoq oladi. Zo‘r-a? Lekin dasturlashda bu — yomon. Agar pichoq qismi sinsa, butun asbobni tashlab yuborishga to‘g‘ri keladi.

**❌ Yomon kod:**
`User` klassi ham ma’lumotni saqlaydi, ham bazaga yozadi, ham email jo‘natadi.

```python
class User:
    def __init__(self, name):
        self.name = name

    def save_to_db(self):
        print(f"{self.name} bazaga saqlandi...") # Bazaga ishi

    def send_email(self):
        print(f"{self.name}ga xat ketdi...") # Emailga ishi
```

**✅ SOLID kod:**
Har kim o‘z ishini qilsin.

```python
class User:
    def __init__(self, name):
        self.name = name

class UserRepository:
    def save(self, user):
        print(f"{user.name} bazaga saqlandi.")

class EmailService:
    def send_welcome(self, user):
        print(f"{user.name}ga xat yuborildi.")
```

Endi agar email tizimi o‘zgarsa, bazaga yozish kodi buzilib ketmaydi.

---

### 2. O — Open/Closed Principle (Ochiq/Yopiq) 🚪

**Qoida:** "Kodingiz kengaytirish uchun OCHIQ, lekin o‘zgartirish uchun YOPIQ bo‘lishi kerak."

Bu nima degani? Yangi funksiya qo‘shmoqchi bo‘lsangiz, ishlab turgan eski kodni titkilab, `if-else` larni ko‘paytirmasligingiz kerak.

**❌ Yomon kod:**
Har safar yangi to‘lov turi qo‘shilganda, shu kodni o‘zgartiraveramiz.

```python
class Payment:
    def tolov_qil(self, type):
        if type == "click":
            print("Click orqali to'landi")
        elif type == "payme":
            print("Payme orqali to'landi")
        # Ertaga Uzum qo'shilsa, yana shu yerni titkilash kerak...
```

**✅ SOLID kod:**
Yangi klass qo‘shing, eskisiga tegmang.

```python
from abc import ABC, abstractmethod

class Payment(ABC):
    @abstractmethod
    def pay(self): pass

class Click(Payment):
    def pay(self): print("Click to'lov.")

class Payme(Payment):
    def pay(self): print("Payme to'lov.")

# Yangi to'lov kerakmi? Shunchaki yangi Class ochasiz.
class Uzum(Payment):
    def pay(self): print("Uzum to'lov.")
```

---

### 3. L — Liskov Substitution Principle (Liskov O‘rnini Bosish) 🧩

**Qoida:** "Agar kod Ota klass bilan ishlasa, u hech qanday muammosiz Bola klass bilan ham ishlashi shart."

Oddiy qilib aytganda: **Agar u o‘rdakka o‘xshasa va vaqillasa, lekin batareyka bilan ishlasa — u o‘rdak emas!** Vorislik mantiqni buzmasligi kerak.

**❌ Yomon kod:**
Pingvin ham qush, lekin u ucholmaydi.

```python
class Bird:
    def fly(self): print("Uchayapman!")

class Eagle(Bird):
    pass

class Penguin(Bird):
    def fly(self):
        raise Exception("Men ucholmayman!") # 💥 Dasturni buzadi!

def move_bird(bird: Bird):
    bird.fly() # Pingvin kelsa, xatolik beradi.
```

**✅ SOLID kod:**
Uchadigan va uchmaydigan qushlarni ajratish kerak.

```python
class Bird:
    def eat(self): print("Ovqat yeyman")

class FlyingBird(Bird):
    def fly(self): print("Uchayapman")

class Penguin(Bird):
    # fly() yo'q, faqat eat() bor. Xatolik ham bo'lmaydi.
    pass
```

---

### 4. I — Interface Segregation Principle (Interfeyslarni Ajratish) 🔌

**Qoida:** "Keraksiz narsalarni majburlab tiqishtirmang."

Mijozga kerak bo‘lmagan metodlarni ishlatishga majburlamang. Hamma narsa bor bitta katta "Universal" interfeysdan ko‘ra, kichik va aniq interfeyslar yaxshiroq.

**❌ Yomon kod:**
`SmartDevice` klassi ham printer, ham skaner. Lekin oddiy printer skaner qilolmaydi-ku?

```python
class SmartDevice:
    def print(self): pass
    def scan(self): pass
    def fax(self): pass

class OldPrinter(SmartDevice):
    def print(self): print("Chop etildi")
    def scan(self): raise Exception("Skaner yo'q!") # Majburlash oqibati
```

**✅ SOLID kod:**
Vazifalarni maydalang.

```python
class Printer:
    def print(self): pass

class Scanner:
    def scan(self): pass

class OldPrinter(Printer):
    def print(self): print("Faqat chop etaman.")
    # Skanerni implement qilish shart emas!
```

---

### 5. D — Dependency Inversion Principle (Bog‘liqlikni Teskarilash) 🙃

**Qoida:** "Yuqori darajadagi modullar past darajadagi detallarga bog‘lanib qolmasligi kerak. Ikkalasi ham Abstraksiyaga bog‘lanishi kerak."

Bu eng qiyin, lekin eng muhim qoida.
Tasavvur qiling, uyingizdagi elektr rozetkasi (`Interface`). Siz unga dazmolni ham, televizorni ham tiqa olasiz. Agar simlarni to‘g‘ridan-to‘g‘ri devor ichidagi kabellarga kavsharlab (svarka) qo‘ysangiz nima bo‘ladi? Dazmol buzilsa, uyni buzishga to‘g‘ri keladi.

**❌ Yomon kod:**
Do‘kon (`Store`) to‘g‘ridan-to‘g‘ri `MySQL` ga bog‘lanib qolgan.

```python
class MySQLDatabase:
    def get_data(self): return "Ma'lumot MySQL dan"

class Store:
    def __init__(self):
        self.db = MySQLDatabase() # Qattiq bog'lanish (Hard dependency)

    def show_products(self):
        print(self.db.get_data())
```
Agar ertaga `PostgreSQL` ga o‘tmoqchi bo‘lsangiz, `Store` kodini o‘zgartirishga majbursiz.

**✅ SOLID kod:**
O‘rtaga "Rozetka" (Abstraksiya) qo‘yamiz.

```python
class DatabaseInterface: # Rozetka
    def get_data(self): pass

class MySQL(DatabaseInterface):
    def get_data(self): return "MySQL data"

class Postgres(DatabaseInterface):
    def get_data(self): return "Postgres data"

class Store:
    def __init__(self, db: DatabaseInterface):
        self.db = db # Endi farqi yo'q, qaysi baza kelishi

# Xohlasak MySQL, xohlasak Postgres ulaymiz
shop = Store(Postgres()) 
shop.show_products()
```

---

### Xulosa: Junior va Senior farqi 👨‍💻

Junior dasturchi shunchaki kodning ishlashini o‘ylaydi.
Senior dasturchi esa kodning **ertaga ham yashab qolishini** o‘ylaydi.

SOLID prinsiplari boshida vaqt oladigandek tuyulishi mumkin. "Shunchaki yozib qo‘ysam bo‘lmaydimi?" degan fikr keladi. Lekin loyiha kattalashganda, bu qoidalar sizni sochlaringiz to‘kilishidan asrab qoladi.

Kodingizni toza tuting, SOLID bo‘ling! ✊
