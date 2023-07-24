import React from 'react'
import { twMerge } from 'tailwind-merge'

type IconProps = {
  className?: string
  type: string
  [key: string]: any
  far?: boolean
  style?: React.CSSProperties
}

export function WeeeIcon(props: IconProps) {
  const { type, className, ...rest } = props
  return <i {...rest} className={twMerge(`icon iconfont ${type}`, className)}></i>
}
