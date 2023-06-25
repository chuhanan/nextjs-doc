import 'server-only'
import type { Locale } from './i18n-config'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('./locales/en.json').then((module) => module.default),
  es: () => import('./locales/es.json').then((module) => module.default),
  zh: () => import('./locales/zh.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
