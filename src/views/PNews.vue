<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <!-- Sarlavha -->
    <h1
        class="text-3xl font-bold text-center text-blue-700 mb-10 flex items-center justify-center gap-3"
    >
      <img
          src="https://images.icon-icons.com/1515/PNG/512/message_105089.png"
          alt="xabarlar ikonka"
          class="w-8 h-8"
      />
      So‘nggi xabarlar
    </h1>

    <!-- Yangiliklar ro‘yxati -->
    <div class="max-w-5xl mx-auto space-y-10">
      <div
          v-for="(news, index) in newsList"
          :key="index"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col sm:flex-row items-start gap-6"
      >
        <!-- Rasm -->
        <img
            :src="news.image"
            alt="news image"
            class="w-full sm:w-56 h-44 object-cover rounded-xl"
        />

        <!-- Kontent -->
        <div class="flex-1">
          <p class="text-sm text-gray-500 mb-1">{{ news.date }}</p>
          <h2
              class="text-lg font-semibold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer transition"
          >
            {{ news.title }}
          </h2>
          <p class="text-gray-600 text-sm mb-4 line-clamp-3">
            {{ news.description }}
          </p>
          <button
              class="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            Batafsil →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const newsList = [
  {
    title: "Yangi sayohat loyihasi ishga tushdi",
    date: "25 Oktabr, 2025",
    description:
        "Bizning platformamizda yangi sayohat loyihasi ishga tushdi! Endi foydalanuvchilar o‘z yo‘nalishlarini oson tanlashlari mumkin.",
    image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Turkiya yo‘nalishi uchun chegirmalar boshlandi",
    date: "22 Oktabr, 2025",
    description:
        "Sayohatni rejalashtiryapsizmi? Turkiya uchun maxsus chegirmalar 1-noyabrgacha amal qiladi. Hoziroq ro‘yxatdan o‘ting!",
    image: "https://i.ytimg.com/vi/Jifz5MPE82E/maxresdefault.jpg",
  },
  {
    title: "Buxoroda yangi turistik markaz ochildi",
    date: "20 Oktabr, 2025",
    description:
        "Buxoroda qadimiy me’moriy obidalar bilan tanishish uchun yangi markaz faoliyat boshladi. Har kuni ekskursiyalar tashkil etiladi.",
    image:
        "https://avatars.mds.yandex.net/get-altay/11732311/2a0000018dbcafd8c34241231531459c4c78/XXL_height",
  },
  {
    title: "Platformamiz yangi versiyada!",
    date: "15 Oktabr, 2025",
    description:
        "Yangi dizayn, tezroq yuklanish va yaxshilangan xavfsizlik! Endi sizning sayohatingiz yanada qulay va xavfsiz.",
    image:
        "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=900&q=80",
  },
];
</script>

<style scoped>
h1 {
  font-family: 'Poppins', sans-serif;
}

/* line-clamp ishlashi uchun qo‘shimcha */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
