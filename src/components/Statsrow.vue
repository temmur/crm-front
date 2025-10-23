<template>

  <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">

    <div class="flex items-center justify-between">

      <div class="w-25">
        <img src="https://avatars.mds.yandex.net/i?id=22eb68545d2d7ee03814342fbe3dca20b8c0657a-4411102-images-thumbs&n=13" alt="">
      </div>
      <div>
        <h3 class="text-gray-500 text-sm font-medium">{{ title }}</h3>
        <p class="text-2xl font-bold text-gray-800 mt-1">{{ value }}</p>
        <p class="text-xs text-gray-400 mt-1">{{ subtitle }}</p>
        <div v-if="growth" class="text-xs mt-2 text-green-500 font-medium">
          ↑ {{ growth }} Since last month
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  subtitle: String,
  icon: String,
  growth: String
})
</script>


