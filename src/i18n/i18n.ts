// src/i18n/i18n.ts
import { createI18n } from 'vue-i18n'

const messages = {
    en: { welcome: 'Welcome', language: 'Language' },
    es: { welcome: 'Bienvenido', language: 'Idioma' },
    fr: { welcome: 'Bienvenue', language: 'Langue' },
    de: { welcome: 'Willkommen', language: 'Sprache' },
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
