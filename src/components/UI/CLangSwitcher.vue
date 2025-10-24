<template>
  <div class="relative inline-block text-left">
    <button
        @click="toggleDropdown"
        class="inline-flex cursor-pointer justify-center w-full px-4! py-2! text-sm font-medium bg-gray-900 text-white border border-gray-700 hover:bg-gray-800 active:bg-black transition rounded-md focus:outline-none"
    >
      {{ currentLabel }}
      <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
        v-if="isOpen"
        class="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg"
    >
      <ul class="py-1">
        <li
            v-for="lang in languages"
            :key="lang.code"
            @click="selectLanguage(lang.code)"
            class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          {{ lang.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'

interface Language {
  code: string
  label: string
}

const props = defineProps<{
  languages: Language[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { locale } = useI18n()
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (code: string) => {
  emit('update:modelValue', code)
  locale.value = code
  localStorage.setItem('locale', code)
  isOpen.value = false
}

const currentLabel = computed(() => {
  const selected = props.languages.find(lang => lang.code === props.modelValue)
  return selected?.label ?? 'Select Language'
})
</script>
