import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  data?: any
}
export default function Bogo(props: Props) {
  const { activity_tag_list } = props?.data || {}

  return (
    <div
      className={twMerge(
        'mb-1 box-border px-2 h-[18px] !leading-[18px] rounded-xl enki-badge-label-sm text-pricing-surface-2-fg-default-idle bg-pricing-surface-2-bg-idle',
        'overflow-hidden text-ellipsis whitespace-nowrap max-w-full',
      )}
    >
      {activity_tag_list?.[0]}
    </div>
  )
}
