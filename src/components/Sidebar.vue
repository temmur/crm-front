<template>
  <div class="w-64 bg-gray-900 text-white flex flex-col p-5 space-y-5 min-h-screen">
    <!-- Logo yoki nom -->
    <router-link to="/">
      <p class="text-xl font-bold px-9">CRM Panel</p>
    </router-link>

    <!-- Menu -->
    <ul class="space-y-2 bg-gray-900">
      <router-link
          v-for="(item, i) in nav"
          :key="i"
          :to="item.router"
          class="block"
      >
        <li
            class="p-3 my-2 px-9 cursor-pointer
                 bg-gray-900 text-white font-medium
                 transition-all duration-200
                 hover:bg-slate-800 hover:text-blue-300
                 rounded-full text-center"
        >
          {{ item.title }}
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const nav = ref([
  { title: "Vazifalar", router: "" },
  { title: "Xabarlar", router: "/news" },
  { title: "Joylashuvlar", router: "" },
  { title: "Sozlamalar", router: "/settings" },
  { title: "Kalendar", router: "/calendar" }, // ✅ faqat shu ishlaydi
  { title: "Xarita", router: "/map" },
]);
</script>

<style scoped>
p {
  font-family: 'Poppins', sans-serif;
}
</style>
