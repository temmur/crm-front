// 🔹 Global style
import './assets/main.css'

// 🔹 Vue asosiy importlari
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 🔹 Router
import router from './router'

// 🔹 PrimeVue va kerakli modullar
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

// 🔹 PrimeVue temalar va ikonalar
import Aura from '@primevue/themes/aura'   // ixtiyoriy tema (xohlov bo‘yicha)
import Lara from '@primevue/themes/lara'   // hozirda ishlatilayotgan tema
import 'primeicons/primeicons.css'

// 🔹 i18n (ko‘p tillilik)
import { createI18n } from 'vue-i18n'
import uz from '@/locale/uz.json'
import ru from '@/locale/ru.json'
import en from '@/locale/en.json'

// 🔹 Vue ilovasini yaratish
const app = createApp(App)

// 🔹 i18n sozlamasi
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem('locale') || 'en',
    messages: {
        en,
        ru,
        uz,
    },
})

// 🔹 Pluginlar ulanishi
app.use(router)
app.use(createPinia())
app.use(i18n)
app.use(PrimeVue, {
    theme: {
        preset: Lara, // yoki Aura — istasangiz shu yerda almashtiring
    },
})
app.use(ToastService)

// 🔹 Ilovani DOMga joylash
app.mount('#app')
