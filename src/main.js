import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'   // ✅ this is the theme preset
import Lara from '@primevue/themes/lara'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'
import i18n from "@/i18n/i18n.js";
// createApp(App).use(router).use(PrimeVue).mount('#app')

// ✅ Mask uchun import
import { vMaska } from 'maska/vue'

// === App yaratamiz ===
const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Lara
    }
})
app.use(ToastService)

// ✅ Maskani global directive sifatida ro‘yxatga olamiz
app.directive('maska', vMaska)

// === App’ni ishga tushiramiz ===
app.use(i18n)
app.mount('#app')
