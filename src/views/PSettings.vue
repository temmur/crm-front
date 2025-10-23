<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

const name = ref('John Doe')
const email = ref('john@example.com')
const language = ref<'en'|'ru'|'uz'>('en')
const theme = ref<'light'|'dark'>('light')
const notifications = ref(true)
const password = ref('')
const confirmPassword = ref('')
const twoFactor = ref(false)


const avatar = ref<string | null>(null)
const initialSnapshot = reactive({
  name: name.value,
  email: email.value,
  language: language.value,
  theme: theme.value,
  notifications: notifications.value,
  twoFactor: twoFactor.value,
})

const dirty = computed(() =>
    name.value !== initialSnapshot.name ||
    email.value !== initialSnapshot.email ||
    language.value !== initialSnapshot.language ||
    theme.value !== initialSnapshot.theme ||
    notifications.value !== initialSnapshot.notifications ||
    twoFactor.value !== initialSnapshot.twoFactor ||
    !!password.value || !!confirmPassword.value || !!avatar.value
)

const errors = reactive<{email?: string; password?: string; confirm?: string}>({})

function validate() {
  errors.email = ''
  errors.password = ''
  errors.confirm = ''

  // very basic checks
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email.value)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (password.value || confirmPassword.value) {
    if (password.value.length < 8) errors.password = 'Minimum 8 characters.'
    if (password.value !== confirmPassword.value) errors.confirm = 'Passwords do not match.'
  }
  return !errors.email && !errors.password && !errors.confirm
}

function resetChanges() {
  name.value = initialSnapshot.name
  email.value = initialSnapshot.email
  language.value = initialSnapshot.language as any
  theme.value = initialSnapshot.theme as any
  notifications.value = initialSnapshot.notifications
  twoFactor.value = initialSnapshot.twoFactor
  password.value = ''
  confirmPassword.value = ''
  avatar.value = null
}

function saveSettings() {
  if (!validate()) return

  console.log('Settings saved:', {
    name: name.value,
    email: email.value,
    language: language.value,
    theme: theme.value,
    notifications: notifications.value,
    twoFactor: twoFactor.value,
  })

  initialSnapshot.name = name.value
  initialSnapshot.email = email.value
  initialSnapshot.language = language.value
  initialSnapshot.theme = theme.value
  initialSnapshot.notifications = notifications.value
  initialSnapshot.twoFactor = twoFactor.value
  password.value = ''
  confirmPassword.value = ''
}

function onAvatarChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  avatar.value = URL.createObjectURL(file)
}


const strength = computed(() => {
  const v = password.value
  let s = 0
  if (v.length >= 8) s++
  if (/[A-Z]/.test(v)) s++
  if (/[a-z]/.test(v)) s++
  if (/\d/.test(v)) s++
  if (/[^A-Za-z0-9]/.test(v)) s++
  return Math.min(s, 4)
})
const strengthLabel = computed(() => ['Very weak','Weak','Okay','Strong','Excellent'][strength.value])


const themeDotClass = computed(() => theme.value === 'dark' ? 'bg-gray-900' : 'bg-gray-200')
</script>

<template>

  <div class="relative">
    <div
        class="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-indigo-100/80 via-transparent to-transparent"
        aria-hidden="true"
    />
  </div>

  <div class="mx-auto max-w-6xl p-6 lg:p-8 space-y-8">

    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Personal Settings</h1>
        <p class="mt-1 text-sm text-gray-600">Update your profile, preferences, and security options.</p>
      </div>


      <div class="flex items-center gap-2">
        <button
            class="btn-ghost"
            :disabled="!dirty"
            @click="resetChanges"
        >Reset</button>
        <button
            class="btn-primary"
            :class="!dirty && 'opacity-60'"
            :disabled="!dirty"
            @click="saveSettings"
        >
          Save changes
        </button>
      </div>
    </header>


    <section class="card">
      <div class="card-head">
        <h2 class="card-title">Profile</h2>
        <p class="card-desc">This information appears on your profile.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-[180px_1fr] items-start">

        <div class="space-y-3">
          <div class="relative h-36 w-36 overflow-hidden rounded-2xl ring-1 ring-gray-200 bg-gray-50">
            <img
                v-if="avatar"
                :src="avatar"
                alt="Avatar"
                class="h-full w-full object-cover"
            />
            <img
                v-else
                src="https://api.dicebear.com/7.x/shapes/svg?seed=user"
                alt="Avatar"
                class="h-full w-full object-cover"
            />
          </div>
          <label class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16V4m0 0 4 4m-4-4-4 4M20 16.5v1.75A2.75 2.75 0 0 1 17.25 21H6.75A2.75 2.75 0 0 1 4 18.25V16.5"/></svg>
            Upload
            <input type="file" class="hidden" accept="image/*" @change="onAvatarChange">
          </label>
        </div>


        <div class="grid gap-5 sm:grid-cols-2">
          <label class="fld">
            <span class="fld-label">Full name</span>
            <input v-model.trim="name" type="text" placeholder="Your name" class="input">
          </label>
          <label class="fld">
            <span class="fld-label">Email</span>
            <input v-model.trim="email" type="email" placeholder="you@example.com" class="input" :class="errors.email && 'ring-red-400'">
            <span v-if="errors.email" class="fld-hint-err">{{ errors.email }}</span>
          </label>

          <div class="sm:col-span-2 grid grid-cols-2 gap-4">
            <label class="fld">
              <span class="fld-label">Language</span>
              <select v-model="language" class="select">
                <option value="en">English</option>
                <option value="ru">Russian</option>
                <option value="uz">Uzbek</option>
              </select>
            </label>

            <label class="fld">
              <span class="fld-label">Theme</span>
              <div class="flex items-center gap-2">
                <span :class="['h-4 w-4 rounded-full border border-gray-300', themeDotClass]" />
                <select v-model="theme" class="select">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>


    <section class="card">
      <div class="card-head">
        <h2 class="card-title">Preferences</h2>
        <p class="card-desc">Notifications and UI behavior.</p>
      </div>

      <div class="flex items-center justify-between rounded-xl border border-gray-200 p-4">
        <div>
          <h3 class="text-sm font-medium text-gray-900">Enable notifications</h3>
          <p class="text-sm text-gray-500">Receive product updates and important alerts.</p>
        </div>

        <button
            type="button"
            class="sw"
            :class="notifications ? 'sw-on' : 'sw-off'"
            @click="notifications = !notifications"
            :aria-pressed="notifications.toString()"
        >
          <span class="sw-dot" :class="notifications ? 'translate-x-5' : 'translate-x-1'"></span>
        </button>
      </div>
    </section>


    <section class="card">
      <div class="card-head">
        <h2 class="card-title">Security</h2>
        <p class="card-desc">Use a strong password and enable 2FA to protect your account.</p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <label class="fld">
          <span class="fld-label">New password</span>
          <input v-model="password" type="password" placeholder="At least 8 characters" class="input" :class="errors.password && 'ring-red-400'">
          <div class="mt-2">
            <div class="h-1.5 w-full overflow-hidden rounded bg-gray-100">
              <div
                  class="h-full transition-all"
                  :class="[
                  strength===0 && 'w-0',
                  strength===1 && 'w-1/5 bg-red-400',
                  strength===2 && 'w-2/5 bg-amber-400',
                  strength===3 && 'w-3/5 bg-yellow-400',
                  strength===4 && 'w-full bg-emerald-500'
                ]"
              />
            </div>
            <p class="mt-1 text-xs text-gray-500">{{ strengthLabel }}</p>
            <span v-if="errors.password" class="fld-hint-err">{{ errors.password }}</span>
          </div>
        </label>

        <label class="fld">
          <span class="fld-label">Confirm password</span>
          <input v-model="confirmPassword" type="password" placeholder="Repeat new password" class="input" :class="errors.confirm && 'ring-red-400'">
          <span v-if="errors.confirm" class="fld-hint-err">{{ errors.confirm }}</span>
        </label>
      </div>

      <div class="mt-6 flex items-center justify-between rounded-xl border border-gray-200 p-4">
        <div>
          <h3 class="text-sm font-medium text-gray-900">Two-factor authentication</h3>
          <p class="text-sm text-gray-500">Add an extra layer of security using an authenticator app.</p>
        </div>
        <button
            type="button"
            class="sw"
            :class="twoFactor ? 'sw-on' : 'sw-off'"
            @click="twoFactor = !twoFactor"
            :aria-pressed="twoFactor.toString()"
        >
          <span class="sw-dot" :class="twoFactor ? 'translate-x-5' : 'translate-x-1'"></span>
        </button>
      </div>
    </section>


    <section class="card border-red-200 bg-red-50/70">
      <div class="card-head">
        <h2 class="card-title text-red-700">Danger zone</h2>
        <p class="card-desc text-red-600">Irreversible actions. Proceed with caution.</p>
      </div>

      <button class="btn-danger">Delete account</button>
    </section>
  </div>


  <transition name="bar">
    <div
        v-if="dirty"
        class="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
    >
      <div class="flex items-center gap-3 rounded-2xl border bg-white/90 backdrop-blur px-4 py-3 shadow-lg ring-1 ring-black/5">
        <span class="text-sm text-gray-700">You have unsaved changes</span>
        <button class="btn-ghost" @click="resetChanges">Reset</button>
        <button class="btn-primary" @click="saveSettings">Save changes</button>
      </div>
    </div>
  </transition>
</template>


