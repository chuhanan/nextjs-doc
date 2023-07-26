import React, { FC, useMemo, useRef, useState } from 'react'

import CardHeadImage from './card-head-image'
import { ProductCardProps } from '../types'
import CardHeadLabel from './card-head-label'
import CardHeadSoldOut from './card-head-soldout'
import { twMerge } from 'tailwind-merge'

const CardHeadHorizontal = (props) => {
  return (
    <div className={twMerge('pt-0 relative w-[105px] h-[105px] flex-none')} role="image-container">
      <CardHeadImage className="rounded-[10px]" {...props} />

      <CardHeadLabel {...props} />

      <CardHeadSoldOut {...props} cardType="horizontal" className="top-0 left-0 w-full h-full rounded-2 text-center" />

      {props.children}
    </div>
  )
}
export default CardHeadHorizontal
