import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import uz from '@/locales/uz.json'
import ru from '@/locales/ru.json'

const i18n = createI18n({
    legacy: false,
    globalInjection: true, // 👈 bu orqali butun ilovada $t ishlaydi
    locale: localStorage.getItem('locale') || 'en',
    fallbackLocale: 'en',
    messages: { en, uz, ru }
})

export default i18n
