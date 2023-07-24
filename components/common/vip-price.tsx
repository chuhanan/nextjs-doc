import React from 'react'
import { twMerge } from 'tailwind-merge'

export enum sizeEnum {
  default = 'default',
  small = 'small',
}
export interface VIPriceButtonProps {
  className?: string
  size?: string
  price: string | number
  vipText?: string
}
export default function VIPrice({ className, size, price, vipText = 'VIP' }: VIPriceButtonProps) {
  return (
    <button>
      <span role="vip-price">
        <span>$</span>
        {price}
      </span>
      <span className="" role="vip-text">
        <span className="">{vipText}</span>
      </span>
    </button>
  )
}
