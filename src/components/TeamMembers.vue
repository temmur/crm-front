<template>
  <div class="bg-white rounded-2xl p-6 shadow-md">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-800">Team Members</h3>
      <button class="text-sm text-sky-500 hover:underline">View All</button>
    </div>

    <div class="space-y-4">
      <div
          v-for="(member, index) in members"
          :key="index"
          class="flex justify-between items-center"
      >
        <div class="flex items-center gap-3">
          <img
              :src="member.avatar"
              alt="avatar"
              class="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p class="font-medium text-gray-800">{{ member.name }}</p>
            <p class="text-sm text-gray-500">{{ member.role }}</p>
          </div>
        </div>
        <button
            v-if="member.actionText"
            class="px-3 py-1 text-sm rounded bg-sky-100 text-sky-600"
        >
          {{ member.actionText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  members: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>
