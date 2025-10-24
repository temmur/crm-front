<template>
  <div class="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-sm">
    <!-- Image -->
    <img :src="img" :alt="title" class="w-full h-48 object-cover" />

    <!-- Card content -->
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-yellow-500 mb-2">⭐️ {{ rating }}</p>

      <p class="text-gray-700">
        {{ showMore ? description : shortDescription }}
      </p>

      <button
          v-if="description.length > 100"
          @click="toggleShow"
          class="mt-2 text-blue-500 hover:underline"
      >
        {{ showMore ? 'Show Less' : 'Show More' }}
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  img: String,
  title: String,
  description: String,
  rating: Number
})

const showMore = ref(false)

const shortDescription = computed(() => {
  return props.description.length > 100
      ? props.description.slice(0, 100) + '...'
      : props.description
})

const toggleShow = () => {
  showMore.value = !showMore.value
}
</script>