import { NextIntlClientProvider } from 'next-intl'
import useClientIntl from '~/hooks/useClientIntl'
import ProductSections from './product-sections'

const ProductSectionsIntlWrapper = ({ product }) => {
  const { locale, messages } = useClientIntl({ i18nObjectKey: 'ProductCard' })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ProductSections product={product} />
    </NextIntlClientProvider>
  )
}

export default ProductSectionsIntlWrapper
