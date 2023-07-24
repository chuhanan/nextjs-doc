import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl'
import pick from 'lodash/pick'

export default function useClientIntl(props: { i18nObjectKey: string }) {
  const locale = useLocale()
  const messages = useMessages()

  return {
    locale,
    messages: pick(messages, props.i18nObjectKey),
  }
}
