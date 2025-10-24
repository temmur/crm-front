import './assets/main.css'

// Vue asosiy modullari
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// PrimeVue va boshqa UI kutubxonalar
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'

// ✅ Mask uchun import
import { vMaska } from 'maska/vue'

// === App yaratamiz ===
const app = createApp(App)

// === Router va PrimeVue ===
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
app.mount('#app')
