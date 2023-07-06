import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl'
import pick from 'lodash/pick'
import LocaleValClient from './locale-val-client'

export default function LocaleVal() {
  const locale = useLocale()
  const messages = useMessages()
  return (
    <NextIntlClientProvider locale={locale} messages={pick(messages, 'Root.Metadata.TitleTemplate')}>
      <LocaleValClient />
    </NextIntlClientProvider>
  )
}
