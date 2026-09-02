+++
title = "Goodhart tuzog'i: Nega o'lchanadigan har qanday muvaffaqiyat kognitiv tanazzulga yetaklaydi?"
slug = "goodhart-tuzog-i"
date = 2026-08-08
description = "Goodhart qonuni, uning psixologiya, ta'lim va texnologiya sohalariga ta'siri va undan qutulish yo'llari haqida tahliliy maqola"
[taxonomies]
tags = ["psychology", "cognitive-science", "Goodhart-law", "metrics"]
+++

## Kirish

Zamonaviy inson o‘z hayotini raqamlashtirish va o‘lchash ehtirosiga mubtalo bo‘lgan. Biz har kuni qancha qadam bosganimizni, yiliga qancha kitob o‘qiganimizni, GitHub’da necha kun ketma-ket kod yozganimizni (streak), Duolingo’da qancha ball to‘plaganimizni yoki ijtimoiy tarmoqlarda qancha auditoriya yig‘ganimizni g‘urur bilan kuzatamiz. Bizning dashboard’larimiz, unumdorlik dasturlarimiz va shaxsiy rivojlanish ilovalarmiz yorqin grafiklar va yashil indikatorlarga to‘la.

Lekin o‘zingizga halol savol berib ko‘ring: **Yiliga 50 ta kitob o‘qiganingiz sizni donoroq qildimi yoki shunchaki sahifalarni ko‘zdan kechirish tezligingizni oshirdimi?** GitHub’dagi yashil katakchalarning uzluksizligi kodingizning arxitektura sifatini yaxshiladimi yoki shunchaki tizimni aldash uchun kichik va keraksiz kommitlar qilishga majbur qildimi?

Ushbu fenomen ortida zamonaviy psixologiya, kognitivistika va iqtisodiyotning eng xatarli tuzoqlaridan biri yotibdi. Bu — **Goodhart qonuni**. Ushbu maqolada biz mazkur kognitiv tuzoq miyamizni qanday qilib chalg‘itishi, ta’lim va shaxsiy o‘sishni soxtalashtirishi hamda fikrlash chuqurligimizni qanday qilib yuzaki ko‘rsatkichlar foydasiga qurbon qilayotganimizni tahlil qilamiz.

## Goodhart qonuni va kognitiv almashtirish

Britaniyalik iqtisodchi Charlz Gudhart 1975-yilda pul-kredit siyosatini tahlil qilar ekan, keyinchalik barcha ijtimoiy va kognitiv fanlarning poydevoriga aylangan qoidani shakllantirdi:

> *"Qachonki o‘lchov maqsadga aylansa, u yaxshi mezon bo‘lishdan to‘xtaydi."*

Buning mantiqiy mexanizmi juda oddiy, ammo oqibatlari halokatlidir. Har qanday murakkab jarayonni (masalan, intellektual o‘sish, sog‘liq, dasturchilik mahorati yoki kompaniyadagi unumdorlik) bevosita o‘lchash juda qiyin. Tizim murakkab bo‘lgani uchun biz haqiqiy maqsad o‘rniga uning **proksi-ko‘rsatkichini** tanlaymiz.

- **Haqiqiy maqsad:** Chuqur bilim va mantiqiy fikrlash. **Proksi:** O‘qilgan kitoblar soni yoki GPA bali.
- **Haqiqiy maqsad:** Tizimning barqaror va sifatli dasturiy ta’minoti. **Proksi:** Yozilgan kod qatorlari yoki kommitlar soni.
- **Haqiqiy maqsad:** Salomatlik va jismoniy quvvat. **Proksi:** Kunlik bosilgan 10,000 qadam.

Psixologik nuqtai nazardan, Daniel Kaneman ta’riflagan "Tizim 1" (tezkor, intuitiv, resurs tejovchi fikrlash) qiyin savolni oson savolga almashtirishni yaxshi ko‘radi. "Men bu mavzuni qanchalik chuqur angladim va hayotimda qo‘llay olaman?" degan murakkab savol berish o‘rniga, miyamiz "Men bu haftada nechtadir sahifa o‘qidimmi?" degan oson savolga javob izlaydi.

Oqibatda, insonda **kognitiv proxy almashtirish** sodir bo‘ladi: sub’yekt haqiqiy sifat ortidan quvishni to‘xtatib, o‘sha sifatni aks ettirishi kerak bo‘lgan **metrikani optimal darajaga yetkazish** bilan shug‘ullana boshlaydi. Tizim o‘zining asl mazmunini yo‘qotadi, faqat uning po‘stlog‘i — raqamlar qoladi.

## Ta'limdagi "metrik trans" va simulyatsiya

Zamonaviy ta’lim tizimi va o‘z-o‘zini o‘qitish madaniyati Goodhart tuzog‘ining eng yorqin qurbonidir.

Maktab va universitetlarda bilim darajasi imtihon testlari va baholar orqali o‘lchanadi. Natijada nima sodir bo‘ladi? O‘quvchilar va talabalar "fanni tushunish"ni emas, "testni topshirish texnikasi"ni o‘rganadilar. Bu jarayon psixologiyada **"Goodharting"** yoki **"Teaching to the test"** deb ataladi. Talaba mavzuning tub mantiqiy bog‘liqliklarini anglashga vaqt sarflamaydi, chunki bu metrikani oshirish uchun samarasiz resurs sarfidir. U imtihonda tushishi mumkin bo‘lgan shablonlarni yodlaydi, imtihon topshiradi va 72 soatdan keyin ma’lumotlarning 80 foizini unutadi. Metrika bajarildi (A baho olindi), lekin kognitiv kapital shakllanmadi.

Ushbu muammo zamonaviy IT-ta’limi va o‘z ustida ishlaydigan dasturchilar orasida ham ildiz otgan. Masalan, *LeetCode* platformasida yuzlab algoritmlarni yechish trendga aylandi. Algoritmlarni bilish — bu tanqidiy fikrlash va muammo yechish ko‘nikmasining proksisidir. Ammo inson maqsadi real arxitektura qurish emas, balki LeetCode reytini oshirishga qaratilganda, u "LeetCode odamiga" aylanadi: u spetsifik shablonlarni tezkor yechishni biladi, lekin noaniqlik sharoitida, real biznes mantiqiga ega loyihada duch kelganda sarosimaga tushadi.

## Neyrobiologiya: Dopamin sirtmog‘i va campbell qonuni

Nega miyamiz bu tuzoqqa bunchalik oson tushadi? Sababi neyrobiologik tuzilishimizda yotibdi.

Haqiqiy o‘sish, chuqur ta’lim va murakkab tizimlarni barpo etish — sekin, og‘riqli va noaniq jarayon. Miya uchun mavhum va uzoq muddatli maqsadlar (masalan, "yaxshi mutaxassis bo‘lish" yoki "dono inson bo‘lish") dopamin ajratish uchun yetarli darajada aniq signal bera olmaydi.

Aksincha, o‘lchanadigan metrikalar — bu **neyronal mukofot tizimi** uchun mukammal stimuldir. Duolingo’da olov belgisining yoqilishi, ilovada "30 kunlik streak" xabari, GitHub’dagi yashil katak, o‘qilgan kitoblar ro‘yxatiga qo‘yilgan "ptichka" — bularning bari miyada doimiy, kichik dopamin dozalarini ajratadi.

Natijada, neyron zanjirlarimiz haqiqiy natijaga emas, balki **indikatorni faollashtirish harakatiga** adaptatsiya bo‘ladi. Bu o‘rinda Goodhart qonunining ijtimoiy-psixologik muqobili bo‘lgan **Campbell qonuni** kuchga kiradi:

> *"Qanchalik biror ijtimoiy ko‘rsatkich qaror qabul qilish uchun ko‘proq ishlatilsa, u shunchalik ko‘p ijtimoiy bosimga uchraydi va u o‘lchashi kerak bo‘lgan ijtimoiy jarayonlarni shunchalik ko‘proq buza boshlaydi."*

Shaxsiy darajada bu kognitiv korrupsiyaga olib keladi. Inson o‘zini alday boshlaydi. U kun bo‘yi "ishladi" (chunki u 12 soat davomida kompyuter qarshisida o‘tirdi va 50 ta elektron pochtaga javob yozdi — unumdorlik metrikasi bajarildi), lekin aslida stratejik muhim bo‘lgan bitta ham murakkab vazifani hal qilmadi (chunki murakkab vazifa sekin kechadi va tezkor dopamin bermaydi).

## Startaplar va dasturlash: Soxta ko‘rsatkichlar nevrozi

Goodhart tuzog‘i individual psixologiya bilan cheklanib qolmaydi, u jamoaviy va tashkiliy madaniyatni ham zaharlovchi kuchga ega. Startaplar va texnologik kompaniyalar dunyosida bu holat **"Vanity Metrics" (soxta/manmanlik ko‘rsatkichlari)** deb ataladi.

Ilovani yuklab olgan foydalanuvchilar soni, ro‘yxatdan o‘tganlar soni, saytga tashriflar kabi ko‘rsatkichlar ko‘pincha sarmoyadorlar va asoschilarni xursand qiladigan soxta ko‘rsatkichlardir. Bular Goodhart metriksidir. Tizim ushbu raqamlarni oshirishga harakat qiladi: agressiv reklama beriladi, foydalanuvchilarga qalloblik yo‘li bilan ilova yuklatiladi. Metrika keskin o‘sadi. Ammo haqiqiy maqsad — foydalanuvchini saqlab qolish (retention), mahsulotning haqiqiy qiymati (product-market fit) va moliyaviy barqarorlik e’tiborsiz qoladi. Natijada, millionlab yuklamalarga ega bo‘lgan, lekin biror tsent daromad keltirmaydigan va foydalanuvchilar bir haftadan keyin o‘chirib tashlaydigan "o‘lik" startaplar paydo bo‘ladi.

Dasturiy ta’minot muhandisligida Goodhart qonuni arxitekturaviy haloqatga olib keladi. Agar rahbariyat dasturchilar unumdorligini yozilgan kod liniyalari (LOC) yoki yopilgan chiptalar soni bilan o‘lchay boshlasa, dasturchilar beixtiyor koddagi abstraksiyalarni ko‘paytiradi, sodda muammoni murakkablashtirib yozadi va koddagi infratuzilmani chalkashlashtiradi. Metrika oshadi, lekin dasturiy ta’minotning sifati va tushunilishi barbod bo‘ladi.

## Metrikalardan tub mohiyatga: Tanqidiy fikrlash va qutulish yollari

Gudhart tuzog‘i bizni raqamlar, jadvallar va indikatorlardan to‘liq voz kechishga da’vat etmaydi. O‘lchash — bu ilmiy progress va boshqaruvning muhim qurolidir. Muammo o‘lchashda emas, **o‘lchovning kognitiv statusida**.

Xo'sh, ushbu illyuziyadan qanday qutulish va fikrlash chuqurligini qaytarish mumkin?

### Epistemik kamtarginlik va metakognitsiya

O‘zingizga doimiy ravishda quyidagi savolni bering: *"Men hozir intellektual o‘sishga erishayapmanmi yoki shunchaki jarayonni ko‘rsatuvchi raqamni oshirayapmanmi?"* Metakognitsiya — bu o‘z fikrlash jarayonini tashqaridan kuzatish yetukligidir. Agar siz kitobni shunchaki uni "o‘qilganlar" ro‘yxatiga qo‘shish uchun shoshilib o‘qiyotganingizni sezib qolsangiz, to‘xtang. Kitobni yoping va o‘qigan oxirgi bitta bosingiz bo‘yicha insho yozishga harakat qiling. Agar yozolmasangiz, metriksi baland, lekin bilimi nolga teng bo‘lgan Goodhart victim'isiz.

### Sifat metrikalarini sifat metrikalari bilan muvozanatlash

Agar siz biror ko‘rsatkichni o‘lchashingiz shart bo‘lsa, unga qarama-qarshi bo‘lgan **sifat metriksini** joriy qiling. 

- Agar siz **o‘qigan kitoblar sonini** o‘lchasangiz, unga qarshi metrika sifatida **har bir kitob bo‘yicha yozilgan konspektlar, tahliliy maqolalar yoki amalga oshirilgan loyihalar sonini** qo‘ying.
- Agar dasturchi sifatida **yopilgan vazifalar tezligini** o‘lchasangiz, unga qarshi metrika sifatida **koddagi regression xatolar (bugs) va kodni qayta ko‘rib chiqish (code review) sifatini** qo‘shing.

### Jarayonni natija metrikasidan ustun qo‘yish

Birinchi prinsiplar bo‘yicha fikrlash bizni proksilarni olib tashlashga majbur qiladi. Masalan, "Dasturlashni o‘rganish" jarayonida maqsad "Sertifikat olish" yoki "30 ta darsni ko‘rib tugatish" emas. Maqsad — "Noma’lum muammoga duch kelganda kompyuter mantiqida fikrlay olish va muammoni unumli algoritmlar bilan hal qila olish". Metrika — sun’iy konstruksiya. Fikrlash qobiliyati — bu real, o‘lchash qiyin bo‘lgan, lekin amalda darhol ko‘rinadigan haqiqatdir.

### Dinamik metrikalar

Biror bir metrikaning uzoq vaqt davomida yagona ko‘rsatkich bo‘lib qolishiga yo‘l qo‘ymang. Agar siz doimiy ravishda bir xil ko‘rsatkichni kuzatsangiz, miyangiz uni albatta "gamifikatsiya" qiladi (ya’ni tizimni alday boshlaydi). Metrikalaringizni vaqti-vaqti bilan o‘zgartirib turing yoki ularni butunlay olib tashlab, muayyan muddat "ko‘rsatkichlarsiz, faqat jaratish va chuqur sho‘ng‘ish (pure flow)" rejimida ishlang.

## Xulosa: Raqamlashtirib bo'lmaydigan haqiqat

Zamonaviy dunyo bizni har bir narsani dashboard’larga joylashga, har bir soniyani va har bir natijani grafikda ifodalashga majbur qiladi. Bu — aniqlik va nazorat illyuziyasini beradi. Ammo inson psixologiyasi, uning ijodiy salohiyati va chuqur fikrlash qobiliyati lineyar raqamlarga sig‘maydi.

Eng muhim kashfiyotlar, eng chuqur anglashlar va eng mukammal arxitekturalar metrikani quvish natijasida emas, balki **metrikalardan xoli bo‘lgan, noaniqlik va murakkablik bag‘ridagi erkin intellektual izlanishlar** natijasida yuzaga keladi.

O‘qilgan kitoblar sonini sanashni to‘xtating — ularning g‘oyalari dunyoqarashingizni qanchalik o‘zgartirganini his qiling. GitHub’dagi yashil kataklarning uzluksizligi haqida qayg‘urishni to‘xtating — siz yozgan kod dunyodagi biror real muammoni qanchalik go‘zal va barqaror yechayotganiga e’tibor bering.

Donolik raqamlarda emas. Donolik — raqamlar ortidagi hayotiy va kognitiv haqiqatni ko‘ra olish qobiliyatidadir. Goodhart tuzog‘idan chiqishning yagona yo‘li — metrikani taxtdan tushirish va uning o‘rniga tub mohiyatni qaytarishdir.