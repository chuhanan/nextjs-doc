import { useLocale } from 'next-intl'
import BaseLayout from '~/components/layout/root'

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
  return <BaseLayout lang={lang}>{children}</BaseLayout>
}
