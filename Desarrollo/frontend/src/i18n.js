import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './i18n/locales/en/translation.json'
import es from './i18n/locales/es/translation.json'
import pt from './i18n/locales/pt/translation.json'

const resources = {
  en: { translation: en },
  es: { translation: es },
  pt: { translation: pt },
}

i18n
  .use(LanguageDetector) // Detecta y guarda automáticamente el idioma
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'es', // Usa el idioma guardado o español por defecto
    fallbackLng: 'es',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

// Escucha cambios de idioma y los guarda
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng)
})

export default i18n
