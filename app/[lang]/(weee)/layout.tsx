import { useLocale } from 'next-intl'

export default async function WeeeLayout({ children }) {
  const lang = useLocale()

  return (
    <html lang={lang}>
      <body>
        <div>WeeeLayout</div>
        <main>{children}</main>
      </body>
    </html>
  )
}
