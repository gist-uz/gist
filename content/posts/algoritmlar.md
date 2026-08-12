+++
title = "Algoritmlar qabristoni: deterministik mantiqdan ehtimoliy intellektga o‘tish va dasturiy injiniringning yangi paradigma shoki"
slug = "algoritmlar"
date = 2026-08-12
description = "Kompyuter fanlari tarixidagi keskin uzilish haqidagi maqola: deterministik mantiqdan ehtimoliy injiniringga o'tish jarayoni va uning dasturchilar uchun yangi fikrlash tizimini talab qilishi."
[taxonomies]
tags = ["algoritmlar", "sun'iy intellekt", "dasturiy injiniring", "ehtimoliy injiniring"]
+++

## Kirish: yetmish yillik ishonchning tanazzuli

Kompyuter fanlari rivojlanishi bilan dasturiy injiniring ancha vaqt davomida qat'iy deterministik gipotezalarga asoslanib kelgan: **A kirish signali + B algoritm = har doim C chiqish natijasi.** Bu tushuncha Alan Tyuring va Jon fon Neyman davridan beri dasturchilarni o‘ziga jalb etgan. Bu qat'iy dunyoqarash har bir dastur qatori niya yozilishida va tuzatishda muqarrar ma'noni mujassamlashgan edi.

*Binar mantiq (0 va 1), shartli operatorlar (if/else), sikllar va qat'iy tiplash bu jarayonning muhim qismlari edi. Dasturiy ta'minotni yaratish jarayonida yuzaga keladigan xatolarni aniqlab, yetkazgan zararini tuzatish mumkin edi.* Agar tizimda xatolik yuz bersa, uning sababi kodingizdagi mantiqsizlik edi.

Biroq, bugun biz tarixdagi eng keskin uzilishlardan biriga guvoh bo’lmoqdamiz. Sun'iy intellekt, ayniqsa yirik til modellari (LLM) va neyron tarmoqlarining paydo bo‘lishi bilan bu deterministik nazariyaning o‘rniga **ehtimoliy injiniring** — stoxastik jarayonlar asosida qurilgan yangi era kirib kelmoqda.

Ushbu maqolada biz an'anaviy dasturlash fikrlashining inqirozi, ehtimoliy kodning dasturchi miyasiga va arxitekturasiga keltiruvchi o'zgarishlarini tahlil qilamiz hamda muhandislik yondashuvlarimizni yangilash yo’llarini izlaymiz.

## Deterministik illyuziya: mantiqiy xotirjamlikning so‘ngishi

Nega dasturchilar klassik kod yozishni afzal ko‘rishadi? Chunki bu kodlar **bashorat qilinadigan** va **takrorlanuvchan** tabiatga ega. `2 + 2` amalini yozsangiz va natija har doim `4` bo'ladi. Turli turdagi xatoliklarni (masalan, `NullPointerException` yoki `Segmentation Fault`) bartaraf etish uchun dasturchilar stack trace’ga suyanib, xatolikni kuzatib va uni tuzata oladilar.

Biroq, generativ AI va neyron tarmoqlar bu illyuziyani shunchaki yo'qotdi. Generativ model asosida ishlaydigan tizimlarda bir xil kirish ma'lumotlari (`prompt`) doimo bir xil natijani bera olmaydi. Modellarning `temperature`, `top_p` va boshqa probabilistik parametrlari tufayli, bir xil so'rov 10 ta turli xil javobni yaratishi mumkin.

> **Hayotiy misol:** Banking tizimi uchun kredit tartibotini yozar ekansiz, an'anaviy tizimda yozilgan qoidalar to'liq deterministik bo‘ladi. Lekin, endi siz ushbu tartibotni generativ modellarga topshirsangiz, u 99 ta holatda to‘g‘ri natija bera olishiga qaramasdan, kutilmagan bir rad javobini ham generatsiya qilishi mumkin. Bu xatolik an'anaviy usulda izlab topish mumkin bo‘lmagan nuqtada yashiringan bo‘lishi mumkin.

## "Xatolik" endi bug emas, tizimning tabiiy xususiyatidir

An’anaviy dasturiy injiniringda xatolik bu anomal holat. Ehtimoliy injiniringda esa xatolik tizimning ajralmas xususiyati sifatida ko‘riladi. Neyron tarmoqlari "gallyusinatsiya" qilayotganda ular aslida noqonuniy emas, balki ehtimolliy natijani qayta ishlamoqdalar. 

Bu holda:

1. **Unit-testlarning inqirozi:** Model chiqishini `assert model_output == "Expected Result"` bilan tekshira olmaysiz.
2. **Reproduktivlikning yo'qolishi:** Bir marta yuz bergan xatolikni qayta tiklay olish qiyin.
3. **Mantiqiy noaniqlik:** Sizning kodingiz to‘g‘ri bo'lishi mumkin, ammo modelning noto‘g‘ri fazoda bo‘lishi sababli tizim muvaffaqiyatsizlikka uchrashi mumkin.

Bu muammo nafaqat texnik; bu dasturchi va sistema o‘rtasidagi ma'naviy bog‘liqlikni ham ifodalaydi. 

## Yangi arxitektura: deterministik qobiq va ehtimoliy yadro

Kelajakda biz qanday qilib hayot uchun muhim tizimlarni yaratamiz? **Hybrid System Architecture (Gibrid tizimlar arxitekturasi)** konsepsiyasi yordamida:

```
+-------------------------------------------------------+
|  Deterministik Qobiq                                   |
|  - Qat'iy qoidalar, Guardrails, Validatsiyalar        |
|  - An'anaviy kod (Rust, Go, TypeScript)                |
|                                                       |
|   +-----------------------------------------------+   |
|   |  Ehtimoliy Yadro                                |   |
|   |  - LLMlar, Neyron tarmoqlari, Agentlar          |   |
|   |  - Stoxastik qarorlar, Generativ mantiq         |   |
|   +-----------------------------------------------+   |
|                                                       |
|  - Evals, Safety Nets, Fallback mexanizmlari          |
+-------------------------------------------------------+
```

1. **Ehtimoliy Yadro:** Yaratuvchanlik vazifasini bajaradi.
2. **Deterministik Qobiq:** Ehtimoliy yadroning natijalarini nazorat qiladi.

Endi biz kod yozishda **"xatti-harakatlar chegarasini belgilash"** ustida ishlaymiz.

### Evals (Baholash): Testlarning o'rnini bosuvchi yangi paradigma

Evals yordamida hisobotlarni statistika asosida baholaymiz. Endi dasturchilar **aniqlik ehtimoli va xavf auditiga** ko'proq e'tibor beriladi. Bu esa yangi ko‘nikma — aktuar fikrni talab etadi.

## Kognitiv rekonstruksiya: dasturchi miyasida nima o'zgarishi kerak?

Ehtimoliy fikrlashga o'tish dasturchilardan quyidagi o'zgarishlarni talab etadi:

### A. Deterministik mutlaqlikdan voz kechish

Har bir kirish uchun qat'iy natija kutmaslik. 

### B. Intuiv injiniring va Empirizm

An'anaviy dasturlash nazariydan amalga oshirilsa, ehtimoliy injiniring tajriba orqali kashf qilinadi.

### D. Sistemali fikrlash

Dasturchilar kodning deterministik asosini chuqur tushunishi kerak, ayniqsa AI yordamida yozilayotgan kodlar uchun.

## Dasturiy ta'minotning sifat inqirozi va "mantiqsiz kod" epidemiyasi

AI yordamida kod yozishning osonlashishi natijasida biz **"Mantiqsiz Kod Epidemiyasi"** kelib chiqishini kuzatmoqdamiz, bu esa:

* **Texnik qarzning eksponentsiya o'sishi**
* **Xavfsizlik tuynuklari**
* **Tizimlar kaskadli qulashi** kabi oqibatlarni keltirib chiqarishi mumkin.

## Xulosa: xaosni jilovlash san'ati

Tyuring davri tugadi. Endilikda, kuchli dasturchilar ehtimollik xaosini jilovlash orqali turli kutilmagan hodisalarni boshqarishni o‘rganishlari kerak. Ular mantiqni hisoblamaydi, balki *ehtimollik* va *noaniqlik*larni boshqaradilar. Muvaffaqiyatning yo‘li — boshqaruv illyuziyasidan voz kechish va xaosni injiniring asosiy quroliga aylantirishdir.