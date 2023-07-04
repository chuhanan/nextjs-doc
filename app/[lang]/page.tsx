import { useTranslations } from 'next-intl'
import { DefaultRichTextComponents } from '~/components/ui/rich-text'
import Link from 'next/link'
import GoToBtn from '~/components/biz/home/go-to-btn'
import LocaleVal from '~/components/biz/home/locale-val'

export default function Home({ params: { lang } }) {
  const t = useTranslations('Home')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>i18n demo</div>
      <p>Current locale: {lang}</p>
      <p>This text is rendered on the server: {t('Heading')}</p>
      <div>{t.rich('Paragraph1', DefaultRichTextComponents)}</div>
      <Link href={`/${lang}/todo`}>Go go Todo page</Link>
      <GoToBtn lang={lang} cation={t('Caption')} />
      <LocaleVal />
    </main>
  )
}
