import { NextIntlClientProvider } from 'next-intl'
import useClientIntl from '~/hooks/useClientIntl'
import ReviewCard from './review-card'

const ReviewCardIntlWrapper = ({ product }) => {
  const { locale, messages } = useClientIntl({ i18nObjectKey: 'ReviewCard' })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReviewCard data={product} />
    </NextIntlClientProvider>
  )
}

export default ReviewCardIntlWrapper
