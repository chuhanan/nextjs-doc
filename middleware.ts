import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '~/constants'
import createIntlMiddleware from 'next-intl/middleware'
import middwareSessionToken from '~/middwares-extra/session-token'

export default async function middleware(request: NextRequest) {
  // Use the incoming request
  const defaultLocale = request.headers.get('x-default-locale') || 'en'

  // Create and call the next-intl middleware
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

  middwareSessionToken(request, response)

  // Alter the response
  response.headers.set('x-default-locale', defaultLocale)

  return response
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
