import PreloadResources from '~/components/common/preload-resources'
import LazyloadScript from '../common/lazyload-scripts'
import '~/assets/styles/global.css'

interface IRootLayoutProps {
  lang: string
  children: React.ReactNode
}

export async function generateMetadata({ params }) {
  return {
    title: 'Weee! - The Largest Asian and Hispanic Grocery Store in North America',
    charset: 'utf-8',
    viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
  }
}

export default function BaseLayout(props: IRootLayoutProps) {
  const { lang, children } = props
  return (
    <>
      <PreloadResources lang={lang} />
      <html lang={lang}>
        <head>
          <LazyloadScript />
        </head>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </>
  )
}
