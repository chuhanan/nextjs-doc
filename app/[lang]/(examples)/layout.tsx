import { useLocale } from 'next-intl'
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function ExampleLayout({ children }: { children: React.ReactNode; modal?: React.ReactNode }) {
  const lang = useLocale()
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  )
}
