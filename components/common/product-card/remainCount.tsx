import { useTranslations } from 'next-intl'
import React from 'react'

export default function RemainCount(props: Partial<any>) {
  const { data, cardType } = props
  const t = useTranslations('ProductCard')
  const remainCount = 10 //getRemainingCount(data);

  return remainCount ? (
    <div className="w-full mb-1.5">
      <span className="enki-badge-label-sm text-pricing-standalone-idle inline-block">
        {cardType === 'horizontal' ? t('remain_count', { remainCount: remainCount }) : t('order_soon', { quantity: remainCount })}
        {/* {cardType === 'horizontal' ? 'remain count 2' : 'order soon'} */}
      </span>
    </div>
  ) : null
}
