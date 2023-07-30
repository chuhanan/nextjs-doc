import React, { FC, useMemo } from 'react'

import { ProductCardProps } from '../types'
import CardBodyTopTag from './card-body-top-tag'
import CardBodyProductName from './card-body-product-name'
import CardBodyPrice from './card-body-price'

const CardBodyFetureThisWeek: FC<Partial<ProductCardProps>> = (props) => {
  return (
    <div role="mid-box" className="flex flex-col self-stretch justify-start ml-2 overflow-hidden">
      <CardBodyTopTag {...props} />

      <CardBodyProductName {...props} />

      {props?.data?.sub_name && (
        <div className="text-surface-1-fg-minor-idle enki-card-label-base-subdued mt-1.5 line-clamp-1">{props?.data?.sub_name}</div>
      )}

      <CardBodyPrice {...props} className="mt-2" />
    </div>
  )
}
export default CardBodyFetureThisWeek
