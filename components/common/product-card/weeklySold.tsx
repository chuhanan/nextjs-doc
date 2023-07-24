import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  data?: any
  className?: string
}

export default function WeeklySold(props: Props) {
  const { last_week_sold_count_ui } = props?.data || {}
  const weekSoldCount = last_week_sold_count_ui !== '0' ? last_week_sold_count_ui : '' // 格式化显示的周销量
  return weekSoldCount ? (
    <div
      className={twMerge(
        'inline-block mb-0.5 h-[18px] !leading-[18px] px-2 enki-badge-label-sm text-subdued-surface-1-fg-default-idle bg-[#f3f3f3] rounded-xl',
        props.className,
      )}
    >
      {/* {t('sold_count', { soldCount: weekSoldCount })} */}
      已售:12
    </div>
  ) : null
}
