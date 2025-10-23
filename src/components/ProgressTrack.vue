<template>
  <div class="bg-white rounded-2xl p-6 shadow-md">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">Progress track</h3>
    <div class="space-y-4">
      <div v-for="(item, index) in tracks" :key="index">
        <div class="flex justify-between text-sm mb-1">
          <span class="font-medium text-gray-700">{{ item.name }}</span>
          <span class="text-gray-600">{{ item.progress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
              class="h-2 rounded-full"
              :style="{ width: item.progress + '%', backgroundColor: item.color }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tracks = [
  { name: "Rocket - SaaS Template", progress: 34, color: "#6D28D9" },
  { name: "Pixel - Design System", progress: 60, color: "#EF4444" },
  { name: "Spaces - Listings Template", progress: 45, color: "#10B981" },
  { name: "Stellar - Dashboard", progress: 35, color: "#2563EB" },
  { name: "Volt - Dashboard", progress: 34, color: "#8B5CF6" },
]
</script>
