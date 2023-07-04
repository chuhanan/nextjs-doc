import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import createIntlMiddleware from 'next-intl/middleware'

export default createIntlMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'zh'],
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  // The locale can be used without a prefix (e.g. `/en/about`).
  routing: {
    type: 'prefix',
    prefix: 'always', // 处理如果是默认语言的情况 /en 会自动跳转到 / 去掉语言前缀的问题
  },
  domains: [
    // {
    //   domain: 'zolplay.com',
    //   defaultLocale: 'en',
    // },
  ],
})

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
