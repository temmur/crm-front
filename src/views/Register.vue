<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <!-- Card -->
    <div class="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6 transition-all">
      <!-- Back / Home -->
      <button
          @click="goHome"
          class="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-all"
      >
        <i class="pi pi-arrow-left"></i>
        <span>Bosh sahifaga qaytish</span>
      </button>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-center text-gray-800">
        {{
          step === 1
              ? "Ro‘yxatdan o‘tish"
              : step === 2
                  ? "SMS Tasdiqlash"
                  : "Yangi parol o‘rnatish"
        }}
      </h1>

      <!-- Step 1: Foydalanuvchi ma’lumotlari -->
      <div v-if="step === 1" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Ism va familya</label>
          <input
              v-model="form.fullname"
              type="text"
              placeholder="Ism Familya"
              class="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600">Telefon raqam</label>
          <input
              v-model="form.phone"
              v-maska="'+998 ## ### ## ##'"
              type="tel"
              placeholder="+998 __ ___ __ __"
              class="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <CButton
            class="bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-full w-full py-3 shadow-md hover:scale-105 transition-transform"
            @click="goToOtp"
            text="Davom etish"
        />

        <CButton
            class="bg-white border border-indigo-500 text-indigo-600 font-semibold rounded-full w-full py-3 hover:bg-indigo-50 transition-all"
            @click="goToLogin"
            text="Kirish"
        />
      </div>

      <!-- Step 2: OTP -->
      <div v-else-if="step === 2" class="space-y-5">
        <p class="text-center text-gray-600 text-sm">
          SMS orqali kelgan <b>6 xonali kodni</b> kiriting:
        </p>

        <div class="flex space-x-2 justify-center">
          <input
              v-for="(digit, index) in otp"
              :key="index"
              v-model="otp[index]"
              maxlength="1"
              type="text"
              inputmode="numeric"
              class="w-10 h-10 border text-center rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              @input="focusNext(index)"
          />
        </div>

        <div v-if="otpError" class="text-red-500 text-sm text-center">{{ otpError }}</div>

        <div class="flex space-x-3">
          <CButton
              class="flex-1 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full py-2 shadow-md hover:scale-105 transition-transform"
              @click="verifyOtp"
              text="Tasdiqlash"
          />
          <CButton
              class="flex-1 bg-gray-400 text-white rounded-full py-2 shadow-md hover:bg-gray-500 transition-all"
              @click="clearOtp"
              text="Tozalash"
          />
        </div>

        <CButton
            class="bg-white border border-indigo-500 text-indigo-600 font-semibold rounded-full w-full py-3 hover:bg-indigo-50 transition-all"
            @click="goToLogin"
            text="Kirish"
        />
      </div>

      <!-- Step 3: Parol -->
      <div v-else-if="step === 3" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Yangi parol</label>
          <input
              v-model="form.password"
              type="password"
              placeholder="******"
              class="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600">Parolni tasdiqlash</label>
          <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="******"
              class="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <p v-if="passwordError" class="text-red-500 text-sm text-center">{{ passwordError }}</p>

        <CButton
            class="bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-full w-full py-3 shadow-md hover:scale-105 transition-transform"
            @click="submitForm"
            text="Ro‘yxatdan o‘tish"
        />

        <CButton
            class="bg-white border border-indigo-500 text-indigo-600 font-semibold rounded-full w-full py-3 hover:bg-indigo-50 transition-all"
            @click="goToLogin"
            text="Kirish"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits } from 'vue'
import CButton from '@/components/Form/CButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits<{ (e: 'on-change', value: string): void }>()

const step = ref(1)
const form = reactive({ fullname: '', phone: '', password: '', confirmPassword: '' })
const otp = reactive(["", "", "", "", "", ""])
const otpError = ref("")
const correctOtp = "201104"
const passwordError = ref("")

// Boshlang'ich step
const goToOtp = () => {
  if (!form.fullname || !form.phone) {
    alert("Iltimos, ism-familya va telefon raqamni to‘ldiring!")
    return
  }
  step.value = 2
}

const focusNext = (index: number) => {
  if (otp[index].length === 1 && index < otp.length - 1) {
    const nextInput = document.querySelectorAll<HTMLInputElement>("input[type='text']")[index + 1]
    nextInput?.focus()
  }
}

const verifyOtp = () => {
  const enteredOtp = otp.join("")
  if (enteredOtp === correctOtp) {
    otpError.value = ""
    step.value = 3
  } else {
    otpError.value = "Kod noto‘g‘ri ❌"
  }
}

const clearOtp = () => {
  for (let i = 0; i < otp.length; i++) otp[i] = ""
  otpError.value = ""
}

const submitForm = () => {
  if (form.password.length < 6) {
    passwordError.value = "Parol kamida 6 ta belgidan iborat bo‘lishi kerak"
    return
  }
  if (form.password !== form.confirmPassword) {
    passwordError.value = "Parollar bir xil emas ❌"
    return
  }
  passwordError.value = ""
  alert("Ro‘yxatdan muvaffaqiyatli o‘tdingiz ✅")
  router.push('/')
}

// Home / Login navigatsiyasi
const goToLogin = () => router.push('/login')
const goHome = () => router.push('/')
</script>
