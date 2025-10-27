import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import ToastService from 'primevue/toastservice'
import { vMaska } from 'maska/vue'
import 'primeicons/primeicons.css'
import i18n from '@/i18n/i18n.js'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { theme: { preset: Lara } })
app.use(ToastService)
app.directive('maska', vMaska)
app.use(i18n)
app.mount('#app')
