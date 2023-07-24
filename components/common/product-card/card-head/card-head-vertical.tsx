import React, { FC, useMemo, useRef, useState } from 'react'

import CardHeadImage from './card-head-image'
import CardHeadLabel from './card-head-label'
import CardHeadSoldOut from './card-head-soldout'
import { twMerge } from 'tailwind-merge'

const CardHeadVertical: FC<
  Partial<
    any & {
      imageNode?: React.ReactNode | (() => React.ReactNode)
      labelNode?: React.ReactNode | (() => React.ReactNode)
    }
  >
> = (props) => {
  return (
    <div className={twMerge('pt-[100%] w-full relative rounded-[15px] overflow-hidden')} role="image-container">
      <CardHeadImage {...props} />

      <CardHeadLabel {...props} />

      <CardHeadSoldOut {...props} cardType="vertical" />

      {props.children}
    </div>
  )
}
export default CardHeadVertical
