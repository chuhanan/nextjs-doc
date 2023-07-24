import { WeeeIcon } from '~/components/common/icon'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function ActivityList(props) {
  const t = useTranslations('Common')
  const { product } = props
  if (product?.activity_list) {
    return (
      <div className="mx-4 py-4 text-xs font-semibold text-surface-1-fg-minor-idle flex items-center justify-between content-between mt-2 border-surface-2-bg-idle border-solid border-b">
        <div className="flex items-center">
          <span className="mr-2">{t('bogo_promotion_label')}</span>
          <span className="inline-block text-critical-surface-1-bg-hover border solid border-critical-surface-1-bg-hover rounded-md px-1.5 align-middle overflow-hidden whitespace-nowrap text-ellipsis">
            {product?.activity_list?.title}
          </span>
        </div>
        <Link prefetch={false} href={product?.activity_list?.activity_link || ''}>
          <div className="text-primary-standalone-idle flex items-center enki-utility-sm">
            <span>{t('bogo_promotion_terms_link')}</span>
            <WeeeIcon className="text-2xl ml-0.5" type="iconArrowRight" />
          </div>
        </Link>
      </div>
    )
  }
  return null
}
