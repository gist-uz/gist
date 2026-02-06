+++
title = "OOP: Dasturlashning haqiqiy kuchi"
date = 2026-01-26
draft = false
description = "Class, Object, Inheritance, Polymorphism — Python misolida OOP asoslarini o'rganing va professional kod yozishni boshlang."
tags = ["python", "oop", "advanced", "professional", "best-practices"]
+++

# OOP: Dasturlashning Haqiqiy Kuchi 🚀

## Kirish: Nima uchun OOP?

Tasavvur qiling, siz 10,000 qator kodli dastur yozdingiz. Keyin mijoz dedi: "Mahsulotga chegirma funksiyasini qo'shing." 

**Procedural yondashuv bilan:** Siz 50 ta joyni topib, har birida kod o'zgartirishingiz kerak. Bitta joyni unutsangiz - bug! 🐛

**OOP bilan:** Siz faqat `Product` klassining ichiga kirib, bitta metod qo'shasiz. Barcha mahsulotlar avtomatik ravishda yangi funksiyani oladi. ✨

OOP - bu faqat kod yozish usuli emas, bu **kod arxitekturasi**, **kelajakka investitsiya** va **professional dasturlashning asosi**.

---

## Bo'lim 1: Asoslar - Class va Object 🏗️

### 1.1 Class - Bu Qolip, Object - Bu Mahsulot

Boshqa tillardan farqli o'laroq, Python'da **hamma narsa obyekt**. Hatto `5` raqami ham `int` klassining obyekti.

```python
class Smartphone:
    """
    Smartphone klassi - bu zavodning qolipi.
    Bu yerda biz smartfonning 'nima bo'lishi kerak' degan
    xususiyatlarini va 'nima qila olishi kerak' degan 
    harakatlarini belgilaymiz.
    """
    
    # CLASS ATTRIBUTE (Barcha smartfonlar uchun umumiy)
    manufacturer = "TechCorp"  # Zavod nomi
    warranty_years = 2
    
    def __init__(self, model, price, color="black"):
        """
        Constructor - obyekt yaratilganda birinchi ishlaydigan metod.
        Bu yerda har bir smartfonning INDIVIDUAL xususiyatlari o'rnatiladi.
        """
        # INSTANCE ATTRIBUTES (Har bir smartfonniki shaxsiy)
        self.model = model
        self.price = price
        self.color = color
        self.is_on = False  # Default holat
        self.battery = 100
    
    def power_on(self):
        """Instance method - obyektning harakati"""
        if not self.is_on:
            self.is_on = True
            print(f"{self.model} yoqildi! 📱")
        else:
            print("Allaqachon yoniq.")
    
    def use(self, minutes):
        """Smartfondan foydalanish - batareya kamayadi"""
        if self.is_on:
            self.battery -= minutes * 2
            if self.battery < 0:
                self.battery = 0
                self.is_on = False
                print("Batareya tugadi! 🔋")
        else:
            print("Avval yoqing!")

# OBYEKTLAR YARATISH
phone1 = Smartphone("Galaxy S24", 999)
phone2 = Smartphone("iPhone 15", 1199, "white")

print(phone1.model)  # Galaxy S24
print(phone2.color)  # white
print(phone1.manufacturer)  # TechCorp (Class attribute)

# Har bir obyekt mustaqil
phone1.power_on()  # Faqat phone1 yonadi
phone1.use(30)
print(phone1.battery)  # 40

phone2.power_on()  # phone2 alohida yonadi
print(phone2.battery)  # 100 (ta'sirlanmadi)
```

### 1.2 `self` - Eng Katta Jumboq va Uning Yechimi 🤔

**Savol:** Nega `self` kerak? Va nega Python uni avtomatik qo'shmaydi?

**Javob:** `self` - bu obyektning o'ziga reference (havola). Bu Python'ning **explicit is better than implicit** falsafasining bir qismi.

```python
class Counter:
    def __init__(self):
        self.count = 0
    
    def increment(self):
        # self.count degani - MENING countim
        # Har bir Counter obyektining o'zining counti bor
        self.count += 1
    
    def get_value(self):
        return self.count

# Ikki mustaqil counter
c1 = Counter()
c2 = Counter()

c1.increment()
c1.increment()
print(c1.get_value())  # 2

c2.increment()
print(c2.get_value())  # 1

# Python orqada shuni qiladi:
# c1.increment() → Counter.increment(c1)
# Ya'ni, increment funksiyasiga c1 obyekti argument sifatida beriladi
```

**MUHIM:** `self` - bu faqat konventsiya (kelishuv). Siz uni `this`, `me`, `obj` deb ham nomlashingiz mumkin, lekin **HECH QACHON bunday qilmang**! Butun Python jamoasi `self` dan foydalanadi.

---

## Bo'lim 2: OOP ning 4 Ta Ustuni 🏛️

### 2.1 Encapsulation (Inkapsulyatsiya) - Ma'lumotlarni Himoya Qilish 🔒

Encapsulation - bu ma'lumotlarni va metodlarni bir joyga to'plash va tashqaridan noto'g'ri kirishdan himoya qilish.

#### Python'da Encapsulation Darajalari:

```python
class BankAccount:
    def __init__(self, owner, initial_balance):
        # PUBLIC - hamma joydan kirish mumkin
        self.owner = owner
        
        # PROTECTED (konventsiya) - faqat klass va uning vorislarida
        # Bitta underscore _ bilan boshlanadi
        self._account_number = self._generate_account_number()
        
        # PRIVATE (name mangling) - faqat shu klassda
        # Ikki underscore __ bilan boshlanadi
        self.__balance = initial_balance
        self.__pin = "0000"
    
    @staticmethod
    def _generate_account_number():
        """Protected metod - helper funksiya"""
        import random
        return f"ACC{random.randint(10000, 99999)}"
    
    # GETTER - ma'lumotni o'qish uchun
    @property
    def balance(self):
        """Balansni ko'rish mumkin, lekin to'g'ridan o'zgartira olmaysiz"""
        return self.__balance
    
    # SETTER - ma'lumotni o'zgartirish uchun (validatsiya bilan)
    @balance.setter
    def balance(self, value):
        raise AttributeError("Balansni to'g'ridan o'zgartira olmaysiz! deposit() yoki withdraw() ishlatung.")
    
    def deposit(self, amount):
        """Pul qo'yish - validatsiya bilan"""
        if amount <= 0:
            raise ValueError("Summa musbat bo'lishi kerak!")
        self.__balance += amount
        print(f"{amount}$ qo'shildi. Yangi balans: {self.__balance}$")
    
    def withdraw(self, amount, pin):
        """Pul olish - PIN va balans tekshiruvi bilan"""
        if pin != self.__pin:
            raise PermissionError("Noto'g'ri PIN!")
        if amount > self.__balance:
            raise ValueError("Mablag' yetarli emas!")
        if amount <= 0:
            raise ValueError("Summa musbat bo'lishi kerak!")
        
        self.__balance -= amount
        print(f"{amount}$ olindi. Qolgan balans: {self.__balance}$")
    
    def change_pin(self, old_pin, new_pin):
        """PIN o'zgartirish"""
        if old_pin != self.__pin:
            raise PermissionError("Eski PIN noto'g'ri!")
        if len(new_pin) != 4 or not new_pin.isdigit():
            raise ValueError("PIN 4 ta raqamdan iborat bo'lishi kerak!")
        self.__pin = new_pin
        print("PIN muvaffaqiyatli o'zgartirildi!")

# Ishlatish
account = BankAccount("Ali", 1000)

# PUBLIC - muammo yo'q
print(account.owner)  # Ali

# PROTECTED - texnik jihatdan kirish mumkin, lekin QILMANG!
print(account._account_number)  # ACC12345

# PRIVATE - to'g'ridan kirish mumkin emas
# print(account.__balance)  # AttributeError!

# To'g'ri yo'l - getter orqali
print(account.balance)  # 1000

# Setter orqali o'zgartirishga urinish
# account.balance = 5000  # AttributeError!

# To'g'ri yo'l - metodlar orqali
account.deposit(500)  # 1500
account.withdraw(200, "0000")  # 1300

# Noto'g'ri PIN
try:
    account.withdraw(100, "1234")  # PermissionError!
except PermissionError as e:
    print(f"Xato: {e}")
```

**MUHIM NUANSA:** Python'da "private" atribut ham aslida to'liq yashirin emas. Python uni `_ClassName__attribute` ga o'zgartiradi (name mangling). Lekin bu konventsiya - agar biror kishi `account._BankAccount__balance` deb yozsa, u qoidani buzayapti va oqibatlar uning zimmasida.

```python
# Texnik jihatdan mumkin, lekin PROFESSIONAL KOD EMAS!
print(account._BankAccount__balance)  # 1300
```

#### Nega Encapsulation Kerak?

1. **Xavfsizlik:** Noto'g'ri qiymatlar berilishini oldini oladi
2. **Validatsiya:** Har bir o'zgarish tekshiriladi
3. **Kelajakdagi o'zgarishlar:** Ichki implementatsiyani o'zgartirsangiz, tashqi kod buzilmaydi
4. **API nazorati:** Foydalanuvchilar faqat ruxsat berilgan metodlardan foydalanadi

### 2.2 Inheritance (Vorislik) - Kodni Qayta Ishlatish 🧬

Inheritance - bu mavjud klassdan yangi klass yaratish orqali kodni qayta ishlatish mexanizmi.

#### Oddiy Vorislik:

```python
class Employee:
    """Asosiy xodim klassi - barcha xodimlar uchun umumiy"""
    
    company_name = "TechCorp"  # Class attribute
    
    def __init__(self, name, employee_id, salary):
        self.name = name
        self.employee_id = employee_id
        self.salary = salary
        self.is_active = True
    
    def work(self):
        print(f"{self.name} ishlayapti...")
    
    def get_annual_bonus(self):
        """Yillik bonus - oylik maoshning 10%"""
        return self.salary * 0.1

class Developer(Employee):
    """Dasturchi - Employee'dan voris oladi"""
    
    def __init__(self, name, employee_id, salary, programming_languages):
        # SUPER() - ota klassning konstruktorini chaqirish
        super().__init__(name, employee_id, salary)
        
        # Qo'shimcha atribut
        self.programming_languages = programming_languages
        self.projects = []
    
    def work(self):
        """Method Overriding - ota klassning metodini qayta yozish"""
        print(f"{self.name} kod yozyapti... 💻")
    
    def add_project(self, project_name):
        """Yangi metod - faqat Developer'da bor"""
        self.projects.append(project_name)
        print(f"Yangi loyiha qo'shildi: {project_name}")
    
    def get_annual_bonus(self):
        """Bonus override - dasturchilar ko'proq bonus oladi"""
        base_bonus = super().get_annual_bonus()  # Ota klassning bonusini olish
        project_bonus = len(self.projects) * 500  # Har bir loyiha uchun +500$
        return base_bonus + project_bonus

class Manager(Employee):
    """Menejer - Employee'dan voris oladi"""
    
    def __init__(self, name, employee_id, salary, team_size):
        super().__init__(name, employee_id, salary)
        self.team_size = team_size
    
    def work(self):
        """Method Overriding"""
        print(f"{self.name} jamoani boshqaryapti... 👔")
    
    def get_annual_bonus(self):
        """Menejerlar jamoa hajmiga qarab bonus oladi"""
        base_bonus = super().get_annual_bonus()
        team_bonus = self.team_size * 200  # Har bir xodim uchun +200$
        return base_bonus + team_bonus

# Ishlatish
dev = Developer("Sardor", "D001", 3000, ["Python", "JavaScript"])
manager = Manager("Dilnoza", "M001", 4000, 5)

# Umumiy xususiyatlar (Employee'dan)
print(dev.company_name)  # TechCorp
print(manager.is_active)  # True

# Polymorphism - bir xil metod, har xil harakat
dev.work()      # Sardor kod yozyapti... 💻
manager.work()  # Dilnoza jamoani boshqaryapti... 👔

# Developer'ga xos metodlar
dev.add_project("E-commerce website")
dev.add_project("Mobile app")

# Bonus hisoblash - har xil natija
print(f"Developer bonus: ${dev.get_annual_bonus()}")  # 300 + 1000 = 1300
print(f"Manager bonus: ${manager.get_annual_bonus()}")  # 400 + 1000 = 1400
```

#### Multiple Inheritance - Ko'p Otadan Voris Olish:

Python bir nechta klassdan bir vaqtda voris ola oladi. Bu kuchli, lekin xavfli xususiyat.

```python
class Flyable:
    """Ucha oladigan narsalar uchun mixin"""
    def fly(self):
        print(f"{self.__class__.__name__} uchmoqda... ✈️")

class Swimmable:
    """Suzadigan narsalar uchun mixin"""
    def swim(self):
        print(f"{self.__class__.__name__} suzmoqda... 🏊")

class Animal:
    """Asosiy hayvon klassi"""
    def __init__(self, name):
        self.name = name
    
    def eat(self):
        print(f"{self.name} ovqatlanmoqda...")

class Duck(Animal, Flyable, Swimmable):
    """O'rdak - uchadi ham, suzadi ham"""
    def __init__(self, name):
        super().__init__(name)
    
    def quack(self):
        print("Vak-vak! 🦆")

# Ishlatish
donald = Duck("Donald")
donald.eat()   # Animal'dan
donald.fly()   # Flyable'dan
donald.swim()  # Swimmable'dan
donald.quack() # O'ziniku
```

**MRO (Method Resolution Order):** Python qaysi klassdan metodni olishini qanday hal qiladi?

```python
print(Duck.__mro__)
# (<class 'Duck'>, <class 'Animal'>, <class 'Flyable'>, 
#  <class 'Swimmable'>, <class 'object'>)

# Python chapdan o'ngga, yuqoridan pastga qidiradi
```

#### Composition vs Inheritance - Qachon Nimani Ishlatish?

**"IS-A" munosabati → Inheritance ishlatiladi:**
- Developer IS-A Employee ✅
- Car IS-A Vehicle ✅

**"HAS-A" munosabati → Composition ishlatiladi:**
- Car HAS-A Engine ✅
- University HAS-A Student ✅

```python
# Yomon yondashuv - Inheritance
class Car(Engine):
    pass  # Car IS-A Engine? Yo'q! Mantiqiy emas.

# To'g'ri yondashuv - Composition
class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower
    
    def start(self):
        print("Engine ishga tushdi!")

class Car:
    def __init__(self, model, engine_hp):
        self.model = model
        self.engine = Engine(engine_hp)  # Car HAS-A Engine
    
    def drive(self):
        self.engine.start()
        print(f"{self.model} harakatlanmoqda...")

car = Car("Tesla Model 3", 450)
car.drive()
```

**Qoida:** "Prefer composition over inheritance" - Agar ikkilanayotgan bo'lsangiz, composition tanlang.

### 2.3 Polymorphism (Ko'p Shakllilik) - Bir Interfeys, Ko'p Implementatsiya 🎭

Polymorphism - bu bir xil interfeys orqali turli obyektlar bilan ishlash qobiliyati.

#### Duck Typing - Python'ning Sehrli Xususiyati:

Python'da type tekshirish o'rniga, "agar u o'rdakdek vaqillasa va o'rdakdek yursa, demak u o'rdak" prinsipi ishlaydi.

```python
class Dog:
    def speak(self):
        return "Vov-vov! 🐕"

class Cat:
    def speak(self):
        return "Myau! 🐈"

class Cow:
    def speak(self):
        return "Moo! 🐄"

class Robot:
    def speak(self):
        return "Beep-boop! 🤖"

# Polymorphism in action
def animal_sound(creature):
    """
    Bu funksiya creature'ning qanday typeda ekanligini tekshirmaydi.
    Faqat speak() metodi borligini kutadi.
    """
    print(creature.speak())

# Har xil obyektlar, bir xil interfeys
animals = [Dog(), Cat(), Cow(), Robot()]

for animal in animals:
    animal_sound(animal)

# Natija:
# Vov-vov! 🐕
# Myau! 🐈
# Moo! 🐄
# Beep-boop! 🤖
```

#### Operator Overloading - Operatorlarni Qayta Yozish:

Python sizga `+`, `-`, `*`, `==` kabi operatorlarning obyektlaringizda qanday ishlashini belgilash imkonini beradi.

```python
class Vector:
    """2D vektor klassi - matematikadan"""
    
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        """print() uchun"""
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        """repr() va debugger uchun"""
        return f"Vector(x={self.x}, y={self.y})"
    
    def __add__(self, other):
        """+ operatori"""
        if not isinstance(other, Vector):
            raise TypeError("Faqat Vector qo'shish mumkin!")
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        """- operatori"""
        if not isinstance(other, Vector):
            raise TypeError("Faqat Vector ayirish mumkin!")
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        """* operatori (skalaraga ko'paytirish)"""
        if not isinstance(scalar, (int, float)):
            raise TypeError("Faqat raqamga ko'paytirish mumkin!")
        return Vector(self.x * scalar, self.y * scalar)
    
    def __eq__(self, other):
        """== operatori"""
        if not isinstance(other, Vector):
            return False
        return self.x == other.x and self.y == other.y
    
    def __len__(self):
        """len() funksiyasi uchun"""
        return int((self.x**2 + self.y**2) ** 0.5)
    
    def __getitem__(self, index):
        """Indexing: v[0] va v[1]"""
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        else:
            raise IndexError("Vector faqat 2 elementga ega!")

# Magic methodlar ishda
v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(v1 + v2)   # Vector(4, 6)
print(v1 - v2)   # Vector(2, 2)
print(v1 * 2)    # Vector(6, 8)
print(v1 == v2)  # False
print(len(v1))   # 5 (3² + 4² = 25, √25 = 5)
print(v1[0])     # 3
print(v1[1])     # 4
```

**Barcha Magic Methodlar:**

| Metod | Operator | Misol |
|-------|----------|-------|
| `__add__` | `+` | `a + b` |
| `__sub__` | `-` | `a - b` |
| `__mul__` | `*` | `a * b` |
| `__truediv__` | `/` | `a / b` |
| `__eq__` | `==` | `a == b` |
| `__lt__` | `<` | `a < b` |
| `__gt__` | `>` | `a > b` |
| `__len__` | `len()` | `len(a)` |
| `__getitem__` | `[]` | `a[0]` |
| `__setitem__` | `[]=` | `a[0] = 5` |
| `__contains__` | `in` | `x in a` |
| `__call__` | `()` | `a()` |

### 2.4 Abstraction (Abstraksiya) - Murakkablikni Yashirish 🎨

Abstraction - bu faqat zarur ma'lumotlarni ko'rsatish va ichki murakkablikni yashirish.

#### Abstract Base Classes (ABC):

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    """
    Abstrak klass - to'g'ridan obyekt yaratib bo'lmaydi.
    Bu faqat "shartnoma" - barcha shakl bo'lishiga yo'l qo'yilmaydi.
    """
    
    @abstractmethod
    def area(self):
        """Har bir shakl o'z maydonini hisoblashi SHART"""
        pass
    
    @abstractmethod
    def perimeter(self):
        """Har bir shakl o'z perimetrini hisoblashi SHART"""
        pass
    
    def describe(self):
        """Oddiy metod - implementatsiya bor"""
        return f"Bu {self.__class__.__name__} shakli"

class Rectangle(Shape):
    """To'rtburchak - Shape'dan voris oladi"""
    
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        """Abstrak metodning implementatsiyasi"""
        return self.width * self.height
    
    def perimeter(self):
        """Abstrak metodning implementatsiyasi"""
        return 2 * (self.width + self.height)

class Circle(Shape):
    """Doira - Shape'dan voris oladi"""
    
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        """Abstrak metodning implementatsiyasi"""
        import math
        return math.pi * self.radius ** 2
    
    def perimeter(self):
        """Abstrak metodning implementatsiyasi"""
        import math
        return 2 * math.pi * self.radius

# Ishlatish
# shape = Shape()  # TypeError: Can't instantiate abstract class!

rect = Rectangle(10, 5)
circle = Circle(7)

print(rect.describe())  # Bu Rectangle shakli
print(f"Maydon: {rect.area()}")  # 50
print(f"Perimetr: {rect.perimeter()}")  # 30

print(circle.describe())  # Bu Circle shakli
print(f"Maydon: {circle.area():.2f}")  # 153.94
print(f"Perimetr: {circle.perimeter():.2f}")  # 43.98

# Polymorphism - barcha shakllar bir xil interfeys
def print_shape_info(shape: Shape):
    """Shape tipidagi har qanday obyektni qabul qiladi"""
    print(f"{shape.describe()}")
    print(f"  Maydon: {shape.area():.2f}")
    print(f"  Perimetr: {shape.perimeter():.2f}")
    print()

shapes = [Rectangle(10, 5), Circle(7), Rectangle(3, 3)]
for s in shapes:
    print_shape_info(s)
```

---

## Bo'lim 3: Advanced Kontseptsiyalar 🚀

### 3.1 Property Decorators - Pythonic Getters va Setters

```python
class Temperature:
    """Temperatura klassi - Celsius va Fahrenheit o'rtasida konvertatsiya"""
    
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Getter - Celsius qiymatini olish"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Setter - Celsius qiymatini o'rnatish (validatsiya bilan)"""
        if value < -273.15:
            raise ValueError("Temperatura absolut noldan past bo'lolmaydi!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Computed property - har safar hisoblash"""
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        """Fahrenheit orqali Celsius'ni o'rnatish"""
        self.celsius = (value - 32) * 5/9  # celsius setter ishlatiladi
    
    @property
    def kelvin(self):
        """Kelvin - faqat o'qish uchun (setter yo'q)"""
        return self._celsius + 273.15

# Ishlatish - xuddi oddiy atribut kabi
temp = Temperature(25)

print(temp.celsius)     # 25
print(temp.fahrenheit)  # 77.0
print(temp.kelvin)      # 298.15

# Setter orqali o'zgartirish
temp.fahrenheit = 100
print(temp.celsius)     # 37.78

# Validatsiya ishlaydi
try:
    temp.celsius = -300  # ValueError!
except ValueError as e:
    print(e)
```

### 3.2 Class Methods va Static Methods

```python
class User:
    """Foydalanuvchi klassi - turli xil metodlar namunasi"""
    
    total_users = 0  # Class attribute
    
    def __init__(self, username, email):
        self.username = username
        self.email = email
        User.total_users += 1
    
    # INSTANCE METHOD - obyekt bilan ishlaydi
    def send_email(self, message):
        """Obyektning ma'lumotlaridan foydalanadi"""
        print(f"Email jo'natildi {self.email} ga: {message}")
    
    # CLASS METHOD - klass bilan ishlaydi
    @classmethod
    def from_json(cls, json_string):
        """
        Alternative constructor - JSON'dan user yaratish.
        cls - bu klass o'zini bildiradi (User).
        """
        import json
        data = json.loads(json_string)
        return cls(data['username'], data['email'])
    
    @classmethod
    def get_user_count(cls):
        """Class attribute'ga kirish"""
        return cls.total_users
    
    # STATIC METHOD - na obyekt, na klass kerak emas
    @staticmethod
    def is_valid_email(email):
        """
        Utility funksiya - faqat parametrlardan foydalanadi.
        User klassi bilan bog'liq, lekin uning ma'lumotlariga muhtoj emas.
        """
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))

# Instance method
user1 = User("ali", "ali@example.com")
user1.send_email("Salom!")

# Class method - alternative constructor
json_data = '{"username": "vali", "email": "vali@example.com"}'
user2 = User.from_json(json_data)

# Class method - class attribute
print(User.get_user_count())  # 2

# Static method - obyekt yaratmasdan
print(User.is_valid_email("test@gmail.com"))  # True
print(User.is_valid_email("invalid-email"))    # False
```

**Qachon nimani ishlatish?**

| Metod turi | `self` | `cls` | Qachon ishlatiladi |
|------------|--------|-------|-------------------|
| Instance method | ✅ | ❌ | Obyektning ma'lumotlari kerak bo'lsa |
| Class method | ❌ | ✅ | Alternative constructor, class attributelarga kirish |
| Static method | ❌ | ❌ | Utility funksiya, na obyekt na klass kerak emas |

### 3.3 Data Classes - Boilerplate Kodni Kamaytirish

Python 3.7+ da `dataclass` decorator qo'shildi. Bu oddiy data container'lar uchun juda qulay.

```python
from dataclasses import dataclass, field
from typing import List

# Klassik yondashuv - ko'p boilerplate kod
class ProductOld:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    
    def __repr__(self):
        return f"Product(name={self.name}, price={self.price}, quantity={self.quantity})"
    
    def __eq__(self, other):
        if not isinstance(other, ProductOld):
            return False
        return (self.name == other.name and 
                self.price == other.price and 
                self.quantity == other.quantity)

# Modern yondashuv - dataclass
@dataclass
class Product:
    """
    @dataclass avtomatik qo'shadi:
    - __init__
    - __repr__
    - __eq__
    """
    name: str
    price: float
    quantity: int = 1  # Default qiymat
    tags: List[str] = field(default_factory=list)  # Mutable default uchun
    
    def total_price(self):
        """Custom metod qo'shish mumkin"""
        return self.price * self.quantity

# Ishlatish
p1 = Product("Laptop", 1000, 2, ["electronics", "computers"])
p2 = Product("Mouse", 25)

print(p1)  # Product(name='Laptop', price=1000, quantity=2, tags=['electronics', 'computers'])
print(p1.total_price())  # 2000

print(p1 == p2)  # False
```

### 3.4 Context Managers - `with` Statement

```python
class FileManager:
    """Custom context manager - file'larni xavfsiz ochish"""
    
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        """with blokning boshida ishlayd"""
        print(f"Opening {self.filename}...")
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """with blokning oxirida ishlayd (xato bo'lsa ham)"""
        if self.file:
            print(f"Closing {self.filename}...")
            self.file.close()
        
        # Agar xato bo'lsa:
        if exc_type is not None:
            print(f"Xato yuz berdi: {exc_val}")
            return False  # Xatoni propagate qilish
        return True

# Ishlatish
with FileManager("test.txt", "w") as f:
    f.write("Salom dunyo!")
    # Xato yuz bersa ham, fayl yopiladi

# Alternativ - contextlib bilan
from contextlib import contextmanager

@contextmanager
def database_connection(db_name):
    """Generator-based context manager"""
    print(f"Connecting to {db_name}...")
    conn = f"Connection to {db_name}"
    try:
        yield conn  # Bu yerda with blok ishlaydi
    finally:
        print(f"Closing connection to {db_name}...")

with database_connection("mydb") as conn:
    print(f"Using {conn}")
```

---

## Bo'lim 4: Design Patterns va Best Practices 🎯

### 4.1 Singleton Pattern - Faqat Bitta Instansiya

```python
class DatabaseConnection:
    """Singleton - faqat bitta instansiya mavjud bo'ladi"""
    
    _instance = None
    
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self, host="localhost"):
        # Faqat birinchi marta ishlatiladi
        if not hasattr(self, 'initialized'):
            self.host = host
            self.initialized = True
            print(f"Database connection yaratildi: {host}")

# Test
db1 = DatabaseConnection("localhost")
db2 = DatabaseConnection("remotehost")  # Yangi connection yaratilmaydi

print(db1 is db2)  # True - bir xil obyekt!
print(db2.host)    # localhost (birinchi qiymat)
```

### 4.2 Factory Pattern - Obyekt Yaratish Logikasini Ajratish

```python
class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Vov!"

class Cat(Animal):
    def speak(self):
        return "Myau!"

class AnimalFactory:
    """Factory - qaysi hayvon yaratishni hal qiladi"""
    
    @staticmethod
    def create_animal(animal_type):
        animals = {
            'dog': Dog,
            'cat': Cat
        }
        
        animal_class = animals.get(animal_type.lower())
        if not animal_class:
            raise ValueError(f"Noma'lum hayvon turi: {animal_type}")
        
        return animal_class()

# Ishlatish
factory = AnimalFactory()
pet1 = factory.create_animal('dog')
pet2 = factory.create_animal('cat')

print(pet1.speak())  # Vov!
print(pet2.speak())  # Myau!
```

### 4.3 Anti-Patterns - Nima Qilmaslik Kerak! ⛔

#### ❌ God Object

```python
# YOMON - bitta klass hamma narsani qiladi
class UserGodObject:
    def __init__(self, username):
        self.username = username
    
    def save_to_database(self): pass
    def send_email(self): pass
    def validate_password(self): pass
    def calculate_statistics(self): pass
    def generate_report(self): pass
    # ... va yana 50 ta metod

# YAXSHI - har bir klass bitta vazifani bajaradi (Single Responsibility)
class User:
    def __init__(self, username):
        self.username = username

class UserRepository:
    def save(self, user): pass

class EmailService:
    def send_to_user(self, user): pass

class UserValidator:
    def validate_password(self, password): pass
```

#### ❌ Yo'qsiz Inheritance

```python
# YOMON - mantiqsiz vorislik
class List(dict):  # List IS-A dict? Yo'q!
    pass

# YAXSHI - composition ishlatish
class CustomList:
    def __init__(self):
        self.data = {}  # HAS-A dict
```

---

## Bo'lim 5: Real Dunyo Misoli - E-commerce Tizimi 🛒

Keling, hamma bilimlarimizni birlashtirib, to'liq e-commerce tizimini yozamiz:

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List
from datetime import datetime

# 1. PRODUCT HIERARCHY (Inheritance + Abstraction)
class Product(ABC):
    """Abstrak mahsulot klassi"""
    
    def __init__(self, name, price, stock):
        self.name = name
        self._price = price  # Protected
        self.stock = stock
    
    @property
    def price(self):
        return self._price
    
    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Narx manfiy bo'lolmaydi!")
        self._price = value
    
    @abstractmethod
    def get_category(self):
        """Har bir mahsulot o'z kategoriyasini qaytarishi kerak"""
        pass
    
    def __str__(self):
        return f"{self.name} - ${self.price}"

class Electronics(Product):
    def __init__(self, name, price, stock, warranty_months):
        super().__init__(name, price, stock)
        self.warranty_months = warranty_months
    
    def get_category(self):
        return "Electronics"

class Clothing(Product):
    def __init__(self, name, price, stock, size):
        super().__init__(name, price, stock)
        self.size = size
    
    def get_category(self):
        return "Clothing"

# 2. SHOPPING CART (Encapsulation + Composition)
class ShoppingCart:
    """Xarid savati - composition misoli"""
    
    def __init__(self):
        self._items = []  # Private
    
    def add_item(self, product: Product, quantity=1):
        """Mahsulot qo'shish - validatsiya bilan"""
        if quantity <= 0:
            raise ValueError("Miqdor musbat bo'lishi kerak!")
        
        if product.stock < quantity:
            raise ValueError(f"Omborda yetarli emas! (Mavjud: {product.stock})")
        
        self._items.append({'product': product, 'quantity': quantity})
        print(f"✅ {product.name} savatchaga qo'shildi (x{quantity})")
    
    def remove_item(self, product_name: str):
        """Mahsulotni o'chirish"""
        self._items = [item for item in self._items 
                       if item['product'].name != product_name]
    
    @property
    def total(self):
        """Jami narx - computed property"""
        return sum(item['product'].price * item['quantity'] 
                   for item in self._items)
    
    @property
    def item_count(self):
        """Mahsulotlar soni"""
        return sum(item['quantity'] for item in self._items)
    
    def __len__(self):
        """len(cart) uchun"""
        return len(self._items)
    
    def __iter__(self):
        """for item in cart uchun"""
        return iter(self._items)

# 3. USER SYSTEM (Inheritance + Polymorphism)
class User:
    """Asosiy foydalanuvchi"""
    
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.cart = ShoppingCart()  # Composition
    
    def get_discount(self):
        """Chegirma - har xil userda har xil"""
        return 0  # Oddiy user - chegirma yo'q

class PremiumUser(User):
    """Premium user - qo'shimcha imtiyozlar"""
    
    def __init__(self, username, email, membership_level):
        super().__init__(username, email)
        self.membership_level = membership_level
    
    def get_discount(self):
        """Premium userlar chegirma oladi"""
        discounts = {
            'silver': 0.05,   # 5%
            'gold': 0.10,     # 10%
            'platinum': 0.20  # 20%
        }
        return discounts.get(self.membership_level, 0)

# 4. ORDER PROCESSING (Factory Pattern + Strategy Pattern)
@dataclass
class Order:
    """Buyurtma - dataclass misoli"""
    user: User
    items: List[dict] = field(default_factory=list)
    order_date: datetime = field(default_factory=datetime.now)
    status: str = "pending"
    
    def calculate_total(self):
        """Umumiy narxni hisoblash - chegirma bilan"""
        subtotal = sum(item['product'].price * item['quantity'] 
                       for item in self.items)
        discount = subtotal * self.user.get_discount()
        return subtotal - discount
    
    def process(self):
        """Buyurtmani qayta ishlash"""
        # Omborni tekshirish
        for item in self.items:
            product = item['product']
            quantity = item['quantity']
            
            if product.stock < quantity:
                raise ValueError(f"Yetarli emas: {product.name}")
            
            product.stock -= quantity
        
        self.status = "processed"
        print(f"✅ Buyurtma qabul qilindi! Jami: ${self.calculate_total():.2f}")

# 5. ISHLATISH - DEMO
def main():
    # Mahsulotlar yaratish
    laptop = Electronics("MacBook Pro", 2000, 10, 12)
    phone = Electronics("iPhone 15", 1000, 15, 12)
    shirt = Clothing("T-Shirt", 30, 50, "L")
    
    # Userlar
    regular_user = User("ali", "ali@example.com")
    premium_user = PremiumUser("vali", "vali@example.com", "gold")
    
    # Regular user xarid qiladi
    regular_user.cart.add_item(laptop, 1)
    regular_user.cart.add_item(shirt, 2)
    
    print(f"\nOddiy user savatchasi:")
    print(f"Mahsulotlar soni: {regular_user.cart.item_count}")
    print(f"Jami: ${regular_user.cart.total}")
    
    # Premium user xarid qiladi
    premium_user.cart.add_item(phone, 2)
    premium_user.cart.add_item(shirt, 3)
    
    print(f"\nPremium user savatchasi:")
    print(f"Mahsulotlar soni: {premium_user.cart.item_count}")
    print(f"Jami (chegirmasiz): ${premium_user.cart.total}")
    
    # Buyurtmalarni yaratish
    order1 = Order(regular_user, list(regular_user.cart))
    order2 = Order(premium_user, list(premium_user.cart))
    
    print("\n--- BUYURTMALARNI QAYTA ISHLASH ---")
    order1.process()
    print(f"Chegirma: {regular_user.get_discount() * 100}%")
    
    order2.process()
    print(f"Chegirma: {premium_user.get_discount() * 100}%")
    
    # Polymorphism - bir xil metod, har xil natija
    users = [regular_user, premium_user]
    for user in users:
        print(f"{user.username}: {user.get_discount() * 100}% chegirma")

if __name__ == "__main__":
    main()
```

---

## Xulosa: OOP Roadmap 🗺️

### 1. Boshlang'ich daraja:
- ✅ Class va Object tushunchasi
- ✅ `__init__` va `self`
- ✅ Instance vs Class attributes
- ✅ Basic methods

### 2. O'rta daraja:
- ✅ Encapsulation (public, protected, private)
- ✅ Inheritance va `super()`
- ✅ Method overriding
- ✅ Basic polymorphism

### 3. Ilg'or daraja:
- ✅ Abstract Base Classes
- ✅ Multiple inheritance va MRO
- ✅ Magic methods (dunder methods)
- ✅ Property decorators
- ✅ Class methods va Static methods
- ✅ Data classes
- ✅ Context managers

### 4. Professional daraja:
- ✅ Design patterns (Singleton, Factory, Strategy)
- ✅ Composition vs Inheritance
- ✅ SOLID principles
- ✅ Anti-patterns va qanday qilib ulardan qochish
- ✅ Type hints va mypy
- ✅ Testing (unittest, pytest)

### OOP Qo'llash Tamoyillari:

| Printsip | Qachon ishlatish |
|----------|-----------------|
| **Encapsulation** | Ma'lumotlarni himoya qilish kerak bo'lsa |
| **Inheritance** | "IS-A" munosabati bo'lsa |
| **Composition** | "HAS-A" munosabati bo'lsa (ko'proq ishlatiladi) |
| **Polymorphism** | Bir xil interfeys, turli implementatsiya kerak bo'lsa |
| **Abstraction** | Umumiy qoidalar (contract) belgilash kerak bo'lsa |

### Oxirgi Maslahat:

1. **"Prefer composition over inheritance"** - Agar ikkilanayotgan bo'lsangiz, composition tanlang
2. **Keep it simple** - Haddan tashqari murakkab hierarchy yaratmang
3. **Follow SOLID** - Ayniqsa Single Responsibility Principle
4. **Write tests** - OOP kodni test qilish osonroq
5. **Use type hints** - IDE va mypy yordami
6. **Read others' code** - Django, Flask, Requests kabi mashhur kutubxonalar qanday yozilgan?

OOP - bu shunchaki kod yozish usuli emas, bu **architecting software**, **managing complexity** va **building scalable systems** haqida. Professional dasturchi bo'lish uchun OOPni chuqur tushunish shart! 🚀

**Keyingi o'rganish uchun:** SOLID principles, Design Patterns (GoF), Clean Code (Robert Martin)
