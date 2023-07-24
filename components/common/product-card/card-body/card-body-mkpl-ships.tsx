import React from 'react'
import { twMerge } from 'tailwind-merge'
import styles from '../corner-css/index.module.css'

export default function CardBodyMkplShip(props: Partial<any>) {
  const { data, className, showSoldBy = true } = props
  const { delivery_desc } = data?.vender_info_view || {}

  if (delivery_desc && showSoldBy) {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={twMerge('max-w-[120px] whitespace-nowrap overflow-hidden leading-4 flex items-center', className, styles.shipsFrom)}
        dangerouslySetInnerHTML={{ __html: delivery_desc }}
      ></div>
    )
  }
  return null
}
