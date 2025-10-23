<template>
  <div class="flex flex-col space-y-4 w-full max-w-xl relative">
    <div class="relative">
      <CInput
          v-model="query"
          placeholder="Search products by title..."
      >
        <template #icon>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z" />
          </svg>
        </template>
      </CInput>
    </div>
    <div v-if="loading" class="text-gray-500 animate-pulse">Searching...</div>
    <div v-else-if="products.length === 0 && query" class="text-gray-500 absolute top-10 w-full max-w-[450px] h-full left-0 right-0! mt-2! bg-white border border-gray-300 rounded-xl
           min-h-60 max-h-60 overflow-y-auto shadow-lg z-50 text-center flex flex-col items-center justify-center text-xl">
      No results found for "{{ query }}"
    </div>
    <div
        v-if="products.length"
        class="absolute top-10 w-full max-w-[450px] left-0 right-0! mt-2! bg-white border border-gray-300 rounded-xl
           max-h-60 overflow-y-auto shadow-lg z-50"
    >
      <div
          v-for="product in products"
          :key="product.id"
          class="flex items-center gap-3 p-3 border-b border-gray-200 last:border-none
             hover:bg-gray-50 transition-all cursor-pointer"
      >
        <img
            :src="product.thumbnail"
            alt="product"
            class="w-10 h-10 object-cover rounded-lg flex-shrink-0"
        />
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-gray-800 text-sm truncate">
            {{ product.title }}
          </h3>
          <p class="text-gray-500 text-xs line-clamp-1">
            {{ product.description }}
          </p>
          <div class="text-indigo-600 font-medium text-sm">${{ product.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CInput from "@/components/UI/CInput.vue";
const query = ref('')
const products = ref<any[]>([])
const loading = ref(false)
let timeout: number | undefined


async function searchProducts() {
  if (!query.value.trim()) {
    products.value = []
    return
  }

  loading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query.value}`)
    const data = await res.json()
    products.value = data.products || []
  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}


watch(query, (val) => {
  clearTimeout(timeout)
  if (!val.trim()) {
    products.value = []
    return
  }
  timeout = window.setTimeout(() => {
    searchProducts()
  }, 500)
})
</script>
