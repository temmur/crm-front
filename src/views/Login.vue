<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <!-- Card -->
    <div class="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6 transition-all">
      <!-- Back / Home -->
      <button
          @click="goHome"
          class="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-all mb-3"
      >
        <i class="pi pi-arrow-left"></i>
        <span>Bosh sahifaga qaytish</span>
      </button>

      <!-- Title -->
      <h1 class="text-2xl font-bold  text-center text-gray-800 mb-12">Kirish</h1>

      <!-- Telefon raqam -->
      <div>
        <label for="phone" class="block text-sm  font-medium text-gray-600 mb-1">Telefon raqam</label>
        <input
            id="phone"
            v-model="formData.phone"
            v-maska="'+998 ## ### ## ##'"
            type="tel"
            inputmode="numeric"
            placeholder="+998 90 123 45 67"
            class="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            @input="formData.phone = formData.phone.replace(/[^0-9+ ]/g, '')"
        />
      </div>

      <!-- Parol -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-600 mb-1">Parol</label>
        <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="******"
            class="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
      </div>

      <!-- Tugmalar -->
      <div class="space-y-3 pt-2">
        <!-- Kirish -->
        <CButton
            class="bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-full w-full py-3 shadow-md hover:scale-105 transition-transform"
            @click="submitForm"
            :disabled="loading"
            :text="loading ? 'Yuklanmoqda...' : 'Kirish'"
        />

        <!-- Ro‘yxatdan o‘tish -->
        <CButton
            class="bg-white border border-indigo-500 text-indigo-600 font-semibold rounded-full w-full py-3 hover:bg-indigo-50 transition-all"
            @click="$emit('on-change', 'register')"
            text="Ro‘yxatdan o‘tish"
        />

        <!-- Parolni unutdingizmi -->
        <button
            class="text-sm text-gray-500 underline w-full text-center hover:text-indigo-500 transition-colors"
            @click="$emit('on-change', 'reset')"
        >
          Parolni unutdingizmi?
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import CButton from '@/components/Form/CButton.vue'

const router = useRouter()

const formData = reactive({
  phone: '',
  password: '',
})

const loading = ref(false)

const submitForm = () => {
  if (!formData.phone || !formData.password) {
    alert('Iltimos, telefon va parolni kiriting!')
    return
  }

  loading.value = true
  setTimeout(() => {
    alert(`Kirish amalga oshirildi ✅\nTelefon: ${formData.phone}`)
    loading.value = false
    router.push('/') // home page ga yo‘naltirish
  }, 1000)
}

// Home sahifaga qaytish tugmasi
const goHome = () => {
  router.push('/')
}
</script>
