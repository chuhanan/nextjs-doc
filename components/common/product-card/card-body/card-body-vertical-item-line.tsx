import React, { FC, useMemo } from 'react'
import CardBodyTopTag from './card-body-top-tag'
import CardBodyProductName from './card-body-product-name'
import CardBodyPrice from './card-body-price'
import CardBodyBottomInfo from './card-body-bottom-info'

const CardBodyVerticalItemLine: FC<Partial<any>> = (props) => {
  return (
    <div role="mid-box" className="mx-2.5 my-1.5">
      <div className="h-[60px]">
        <CardBodyTopTag {...props} />
        <CardBodyProductName {...props} className="pb-1.5" />
      </div>

      <CardBodyPrice {...props} className="mt-0" />

      <CardBodyBottomInfo {...props} />
    </div>
  )
}
export default CardBodyVerticalItemLine
