export const i18n = {
  locales: ['en', 'es', 'zh'],
  defaultLocale: 'en',
}

export const langConstants = {
  LANGUAGE_CHINESE: 'zh',
  LANGUAGE_CHINESE_T: 'zht',
  LANGUAGE_CHINESE_T_ALIAS: 'zh-Hant',
  LANGUAGE_EN: 'en',
  LANGUAGE_ES: 'es',
  LANGUAGE_KO: 'ko',
  LANGUAGE_JA: 'ja',
  LANGUAGE_VI: 'vi',
}

export const LANGUAGE_REGULAR = `/{${[
  langConstants.LANGUAGE_CHINESE_T,
  langConstants.LANGUAGE_EN,
  langConstants.LANGUAGE_ES,
  langConstants.LANGUAGE_KO,
  langConstants.LANGUAGE_JA,
  langConstants.LANGUAGE_VI,
  langConstants.LANGUAGE_CHINESE,
].join(',')}}`
