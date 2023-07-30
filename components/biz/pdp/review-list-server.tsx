import { NextIntlClientProvider } from 'next-intl'
import useClientIntl from '~/hooks/useClientIntl'
import ReviewList from './review-list'

const ReviewListIntlWrapper = ({ id, post }) => {
  const { locale, messages } = useClientIntl({ i18nObjectKey: 'ReviewList' })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReviewList id={id} post={post} />
    </NextIntlClientProvider>
  )
}

export default ReviewListIntlWrapper
