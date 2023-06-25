import { getDictionary } from '~/get-locale'
// import Image from 'next/image'
// import { Locale } from '~/i18n-config'
import Counter from '../../components/counter'
import LocaleSwitcher from '../../components/locale-switcher'

export default async function Home({ params: { lang } }) {
  const locale = await getDictionary(lang)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>i18n demo</div>
      <LocaleSwitcher />
      <p>Current locale: {lang}</p>
      <p>This text is rendered on the server: {locale['server-component'].welcome}</p>
      <Counter dictionary={locale.counter} />
    </main>
  )
}
