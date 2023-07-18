import { useLocale } from 'next-intl'
import BaseLayout from '~/components/layout/root'
import { headers } from 'next/headers'

export const metadata = {
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    images: '/og-image.png',
  },
}

export default async function WeeeLayout({ children }) {
  const lang = useLocale()
  const headerList = headers()
  console.log(headerList.get('weee_session_token'), '1--weee_session_token')
  return (
    <BaseLayout lang={lang}>
      <>{children}</>
    </BaseLayout>
  )
}
