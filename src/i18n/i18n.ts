// src/i18n/i18n.ts
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import uz from '@/locales/uz.json'
import ru from '@/locales/ru.json'

const messages = {
    en: en,
    uz: uz,
    ru: ru,
}

const defaultLocale = 'en'
const savedLocale = localStorage.getItem('locale') || defaultLocale

const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: defaultLocale,
    messages,
})

export default i18n
