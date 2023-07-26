import PreloadResources from '~/components/common/preload-resources'
import LazyloadScript from '../common/lazyload-scripts'
import { cookies } from 'next/headers'
import '~/assets/styles/global.css'
import '~/assets/iconfont/iconfont.css'

interface IRootLayoutProps {
  lang: string
  children: React.ReactNode
  extraHeader?: React.ReactNode
}

export async function generateMetadata({ params }) {
  return {
    title: 'Weee! - The Largest Asian and Hispanic Grocery Store in North America',
    charset: 'utf-8',
    viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
  }
}

export default function BaseLayout(props: IRootLayoutProps) {
  const { lang, children, extraHeader } = props
  const cookieList = cookies()
  const globalCookie = {}
  Object.keys(cookieList).forEach((key) => {
    globalCookie[key] = cookieList[key]
  })
  return (
    <>
      <PreloadResources lang={lang} />
      <html lang={lang}>
        <head>
          <link rel="stylesheet" href={`https://static.weeecdn.com/static/font-face-css/${lang}-845175b2.css`} />
          <link rel="stylesheet" href={`https://static.weeecdn.com/static/font-enki-css/${lang}-c65aeff5.css`} />
          <link rel="stylesheet" href={`https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.0.4/swiper-bundle.min.css`} />
          {extraHeader}
          <LazyloadScript />
        </head>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </>
  )
}
