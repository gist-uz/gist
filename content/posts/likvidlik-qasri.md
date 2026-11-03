+++
title = "Likvidlik qasri va preference overhang tuzog'i: Nega milliard dollarlik startaplar ta'sischilari hamma narsasiz qoladi?"
slug = "likvidlik-qasri"
date = 2026-11-03
description = "Nega milliard dollarlik qiymatga ega startaplarning asoschilari kutilganidan umuman boshqacha vaziyatda qola olishlari va bu qanday sodir bo'lishini o'rganish."
[taxonomies]
tags = ["startap", "venchur kapitali", "likvidlik", "investitsiya"]
[extra]
draft_model = "gemini-3.6-flash"
review_model = "gpt-4o"
ai_authors = "Google gemini-3.6-flash + OpenAI GPT-4o"
+++

## Qog'ozdagi boylik va valyuatsiya illyuziyasi

Venchur moliyalashtirish sohasidagi eng katta adashishlardan biri bu "post-money valuation" tushunchasini kompaniyaning haqiqiy bozor qiymati deb qabul qilishdir.

Klassik iqtisodiyotda kompaniya qiymati uning kelajakdagi pul oqimlarining diskontlangan miqdori yoki sof foydasi bilan o‘lchanadi. Venchur dunyosida esa valyuatsiya oxirgi investordan olingan eng kichik ulush narxining butun kompaniya aksiyalari soniga ekstrapolatsiyasidir. Misol uchun, agar investor kompaniyaning 1 foiz ulushi uchun 10 million dollar to‘lasa, qog‘ozda kompaniya 1 milliard dollarga tenglashtiriladi. Biroq, bu millionlar investorga "preferensial" aksiya sotib olinishini bildiradi, oddiy aksiya emas.

**Imtiyozli aksiya** oddiy aksiyaga nisbatan qonuniy va moliyaviy ustunliklarga ega. Startap asoschilari va xodimlari esa, qoida tariqasida, faqat oddiy aksiyalar yoki uning opsionlariga egalik qilishadi. Ommaviy axborot vositalari kompaniya valyuatsiyasini e’lon qilganda, ular imtiyozli va oddiy aksiyalar o‘rtasidagi farqni hisobga olmaydilar, natijada qog‘ozdagi boylikning illyuziyasi yuzaga keladi.

### Venchur kapitali murakkabliklari

Venchur kapitali investorlar tomonidan taqdim etilgan kapital murakkab va yuqori ustunlikka ega bo‘lgan moliyaviy instrumentdir. Baholash ko‘tarilgani sari, investorlar o‘z tavakkalchiliklarini ta’minlash uchun shartnomalarga tobora qat’iyroq shartlarni kiritadilar. Netijada, "paper valuation" (qog‘ozdagi baho) o‘sadi, lekin ta’sischi va xodimlarning haqiqiy likvidlik ehtimoli keskin pasayib boradi.

---

## Preference overhang va ustuvorlik tartibi: Moliyaviy arxitekturaning anatomiyasi

Ekzit sodir bo‘lganda, tushgan pul barcha aksiyadorlar o‘rtasida shunchaki ulush foiziga qarab bo‘linmaydi. Bajariladigan birinchi jarayon — bu "liquidation waterfall", ya’ni mablag‘larning qat’iy iyerarxiya bo‘yicha taqsimlanishini belgilaydi.

Bu iyerarxiyaning markazida **liquidation preference** tushunchasi turadi. Bu shartnomaviy huquq bo‘lib, imtiyozli aksiyadorlarga kompaniya sotilganda yoki tugatilganda o‘z pulini oddiy aksiyadorlarga biror sent tegishidan oldin qaytarib olish kafolatini beradi.

### Nozik tafovutlar

Liquidation preference’ning ikkita asosiy turi va ularning oqibatlari mavjud:

1. **Non-participating preferred stock (ishtirok etmaydigan imtiyozli aksiya):** Investor sotuvdan tushgan puldan o‘zi kiritgan sarmoyasini yoki imtiyozdan voz kechib, o‘z ulush foiziga ko‘ra oddiy aksiyadorlar bilan birga pulni bo‘lishishni tanlaydi.
   
2. **Participating preferred stock (ishtirok etuvchi imtiyozli aksiya):** Bu ta’sischilar uchun eng xavfli shartnoma hisoblansada, investor avval o‘z sarmoyasini to‘liq qaytarib oladi va qolgan puldan ham o‘z foiziga mutanosib ulush oladi.

### Preference overhang ssenariysi

Preference overhang, ya'ni kompaniya bir necha investitsiya raundlaridan o‘tib, investorlarga kafolatlangan umumiy qaytarilish summasi (liquidation preference) kompaniyaning real sotilish bahosidan oshib ketganda yuzaga keladi.

#### Amaliy simulyatsiya:
  
* Aytaylik, startap Seed, Series A, B va C raundlarida umumiy hisobda **150 million dollar** venchur kapitali jalb qildi.
* So‘nggi raundda kompaniya qog‘ozda **500 million dollar**ga baholandi. Ta’sischilarda kompaniyaning 40% ulushi bor.
* Bozor konyunkturasi o‘zgardi va kompaniya **200 million dollar**ga sotildi.

Yuzaki qaraganda, 40 foizlik ulushga ega ta’sischilar 80 million dollar olishi kerakdek tuyuladi. Biroq, qamrab olingan barcha mexanizmlarni hisobga olgan holda xavfli holatga tushishi mumkin.

---

## Seniority structure: Investorlar o'rtasidagi yashirin urush

Aksariyat insonlar ta’sischilar va investorlar o‘rtasidagi ziddiyatni tushunishadi, ammo investorlarning o‘zlari o‘rtasidagi iyerarxiya va manfaatlar to‘qnashuvi ko‘pincha nazardan chetda qoladi.

Investitsiya raundlari ko‘paygani sari "seniority structure" yoki ustuvorlik zanjiri shakllanadi. Qoida tariqasida, eng oxirgi kirgan investorlar (masalan, Series C yoki D) "standard seniority" shartini qo‘yishadi. Bu degani, kompaniya sotilganda pul birinchi bo‘lib Series C investoriga, so‘ng Series B, keyin Series A investoriga beriladi.

Bu iyerarxiya muayyan ssenariylarda makkor holatlarni keltirib chiqaradi, masalan kompaniya inqirozga uchrayotganida va zudlik bilan pullanganida, Series C investori o‘zining sarmoyasini saqlab qolish uchun kompaniyani zararli sotishga rozi bo‘lishi mumkin.

Aksincha, kompaniyaga 100 million dollarlik sotilish taklifi tushganida, ta’sischi va ilk investorlar uchun bunday sotuvda "veto" huquqi tug'ilishi mumkin, chunki bu pul miqdori fond rentabelligi talablariga javob bermaydi va kompaniyani bankrotlik yoqasiga yetaklanishi mumkin.

---

## ESOP va xodimlarning aldangan umidlari

Venchur ekosistemasidagi eng katta ma’naviy va etik muammolardan biri bu **ESOP** (Employee Stock Ownership Plan — xodimlarning aksiya opsionlari rejasi) atrofidagi illuziyadir.

Kompaniyalar top-muhandislar va mahsulot menejerlarini jalb qilish uchun ularga bozor narxidan pastroq maosh taklif etib, "0.5% ulush" yoki "50,000 dona opsion" va’da qilmoqda. Biroq, oddiy xodimlar kapital strukturasi va preference overhang mexanizmini tushunmaydilar. Ularga berilgan opsionlar oddiy aksiyalar berish huquqini beradi, halos.

Xodimlar uchun yaratilgan uchta asosiy tuzoq mavjud:

1. **Strike price va soliq tuzog‘i:** Opsion aksiyani muayyan past narxda sotib olish huquqi bo‘lib, xodim opsionni aksiyaga aylantirish uchun pul to‘lashi va qog‘ozdagi daromad uchun soliq to‘lashi kerak bo‘ladi.
2. **Dilution:** Har bir yangi investitsiya raundi, investorlarning "anti-dilution" bandlari va yangi opsion hovuzlari xodimlarning ulushini muntazam ravishda kamaytirib boradi.
3. **Waterfall qurboni:** Yuqorida ta’kidlanganidek, agar kompaniya investorlarning liquidation preference summasidan pastroq narxga sotilsa, oddiy aksiyadorlar nol qiymatga ega bo‘lishadi.

Oqibatda, yillar davomida mehnat qilgan va past maoshga rozi bo‘lgan dasturchilar kompaniya sotilganda haqiqiy daromad ko‘rolmaydilar.

---

## Down round, recapitalization va "washout" ssenariylari

Kompaniya shishirilgan valyuatsiyasini oqlay olmaganida va unga zudlik bilan yangi kapital kerak bo‘lganda, **Down round** sodir bo‘ladi. Bu holatda "preference overhang" tuzog‘i o‘zining eng shafqatsiz ko‘rinishini namoyon etadi.

Yangi investorlar yoki mavjud investorlar inqirozli raundda kompaniya kapitalini qayta qurish shartlar orqali juda og‘ir shartlarni jadallashtirishi mumkin:

1. **Eski aksiyalarning yo'q qilinishi:** Yangi investorlar kompaniyaning barcha mavjud aksiyalarining qiymatini amalda nolga tenglashtiradi.
2. **Anti-dilution triggers:** Illiq shartlarga ega bo‘lmagan eski investorlar va ta’sischilar o‘z ulushlarining 90-99 foizini yo‘qotadilar.
3. **Menejmentni qayta rag'batlantirish:** Ta’sischilar va jamoa a’zolari ishdan yiroqlashmasligi uchun maxsus "carve-out" yaratishadi.

Bunday vaziyatda ta’sischi kompaniyada o‘z ulushidan to‘liq mahrum bo‘ladi va shunchaki investorlar topshirig‘ini bajaruvchi yollanma ijrochiga aylanadi.

---

## Venchur kapitalining teskari rag'batlantirish mexanizmi (Power law conflict)

Venchur fondlari ta’sischilarni yuqori valyuatsiya va og‘ir shartnomalarga majburlashining sababi venchur kapitali biznes modelida yashirin.

Venchur kapitali **Power law** asosida ishlaydi. Fond kiritgan 10 ta investitsiyadan faqat 1 tasi butun fondning barcha yo‘qotishlarini qoplashi talab qilinadi va yuqori daromadni ta’minlaydi.

Shu sababli, venchur investori uchun startapning 30-50 million dollarga barqaror sotilishi — muvaffaqiyatsizlik. Ularga faqat 1 milliard dollarlik yoki undan yuqori natija kerak.

### Startap ssenariysi:

Bir tomondan, ta’sischi uchun kompaniyaning 50 million dollarga sotilishi uning va oilasining moliyaviy erkinligini ta’minlaydigan ajoyib natija. Boshqa tomondan, venchur investori uchun 50 millionlik ekzit hech narsani o‘zgartirmaydi. Natijada, startap sun’iy mezonlarga dosh berolmay, bankrot bo‘ladi yoki preference overhang tubiga cho‘kadi.

---

## Qanday qilib tuzoqdan qochish mumkin: Ta'sischilar uchun yangi strategik kompas

So‘nggi yillarda yuz bergan iqtisodiy inqirozlar va ko‘plab "qog‘ozdagi yakkashoxlar"ning jimjit tugatilishi zamonaviy startap arxitekturasida yangi to‘lqinni keltirib chiqardi.

Muvaffaqiyatli va haqiqiy likvidlikka erishish uchun quyidagi strategik tamoyillarni qo‘llash talab etiladi:

### 1. Valyuatsiyadan ko'ra shartlarni ustun qo'yish
Pastroq valyuatsiya, lekin "toza" shartnomalar kelajakda ta’sischi uchun eng katta himoyadir.

### 2. Kapital samaradorligi va bootstrapping gibridlari
Iloji boricha erta davrda cash-flow positive holatiga o'tish va faqat zaruriyat bo‘lgandagina venchur kapitalini jalb qilish lozim.

### 3. Ikkinchi darajali sotuvlar
Agar kompaniya yuqori valyuatsiyalarda investitsiya olsayotgan bo‘lsa, ta’sischilar kechki raundlarda o‘z ulushlarining kichik qismini likvidatsiya qilishlari kerak.

### 4. ESOP strategiyasini shaffoflashtirish
Xodimlarni jalb qilishda ularga kompaniyaning liquidation preference yuklamasini va waterfall tartibini ochiq tushuntirish kerak.

---

## Xulosa

Startaplar dunyosi afsonalar va illyuziyalarga boy. Vurushli matbuot relizlari va milliard dollarlik valyuatsiyalar — bu ko‘rgazmali vitrinalar. Vitrinaning orqasida qat’iy iqtisodiy va huquqiy qonunlar mavjud.

"Preference overhang" tuzog‘i bizga shuni ko‘rsatadiki, biznesning haqiqiy muvaffaqiyati — bu uning sarlavhalardagi bahosi emas, balki yaratilgan real qiymat va bu qiymatning barcha ishtirokchilar o‘rtasida adolatli bo‘linish qobiliyatidir.

Zamonaviy startap asoschisi uchun eng birinchi vazifa — mahsulot yaratish emas, balki moliyaviy xavflarini boshqarish va oldini olishdir.