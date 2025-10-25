<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b border-gray-100">
    <!-- Chap tomon -->
    <div class="flex items-center space-x-3 w-full max-w-md">
      <CSearch />
    </div>

    <!-- O'ng tomon -->
    <div class="flex items-center space-x-4">
      <!-- Tugmalar -->
      <CButton :text="t('buttons.signIn')" variant="light" @click="goLogin" />
      <CButton :text="t('buttons.signUp')" variant="dark" @click="goRegister" />

      <!-- Til tanlash -->
      <CLangSwitcher
          v-model="selectedLang"
          :languages="availableLanguages"
          @update:modelValue="changeLanguage"
      />
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import CLangSwitcher from '@/components/UI/CLangSwitcher.vue'
import CButton from '@/components/Form/CButton.vue'
import CSearch from '@/components/Form/CSearch.vue'

const router = useRouter()
const { locale, t } = useI18n()

// Saqlangan tilni olish
const selectedLang = ref(localStorage.getItem('locale') || 'en')

// Mavjud tillar
const availableLanguages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: "O'zbekcha" },
]

// 👇 Watch orqali tilni kuzatamiz
watch(selectedLang, (newLang) => {
  if (locale.value !== newLang) {
    locale.value = newLang
    localStorage.setItem('locale', newLang)
  }
})

// Navigatsiya
const goLogin = () => router.push('/login')
const goRegister = () => router.push('/register')

// CLangSwitcher event uchun
const changeLanguage = (lang) => {
  selectedLang.value = lang
}
</script>
