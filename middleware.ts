import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '~/constants'
import createIntlMiddleware from 'next-intl/middleware'

import middwareSessionToken from '~/middwares-extra/session-token'
import middwareAuthToken from '~/middwares-extra/auth-token'
import middwareZipcode from '~/middwares-extra/zipcode'
import { getLangFromAcceptLanguage, getLangFromCookie, getLangFromReqHeaders, getLangFromUrl } from './utils/lang'

export default async function middleware(request: NextRequest) {
  const defaultLocale =
    getLangFromCookie(request) || getLangFromUrl(request) || getLangFromReqHeaders(request) || getLangFromAcceptLanguage(request) || 'en'
  //后端接口需要lang, 但是要兼容 'zht' -> 'zh-Hant'
  request.headers.set('lang', defaultLocale)
  //next-intl 处理国际化
  const handleI18nRouting = createIntlMiddleware({
    // A list of all locales that are supported
    locales: i18n.locales,
    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: defaultLocale,
    // The locale can be used without a prefix (e.g. `/en/about`).
    localePrefix: 'always', // 处理如果是默认语言的情况 /en 会自动跳转到 / 去掉语言前缀的问题
    domains: [
      // {
      //   domain: 'zolplay.com',
      //   defaultLocale: 'en',
      // },
    ],
  })
  const response: NextResponse = handleI18nRouting(request)
  console.time('middleware')
  await middwareSessionToken(request, response)

  await middwareAuthToken(request, response)

  await middwareZipcode(request, response)
  console.timeEnd('middleware')

  return response
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|enki).*)'],
}
