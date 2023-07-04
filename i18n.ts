import { getRequestConfig } from 'next-intl/server'

export const i18n = {
  locales: ['en', 'es', 'zh'],
  defaultLocale: 'en',
}

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./locales/${locale}.json`)).default,
}))
