import React, { FC, useMemo, useRef, useState } from 'react'

import CardHeadImage from './card-head-image'
import { twMerge } from 'tailwind-merge'

const CardHeadFetureThisWeek: FC<
  Partial<
    any & {
      imageNode?: React.ReactNode | (() => React.ReactNode)
      labelNode?: React.ReactNode | (() => React.ReactNode)
    }
  >
> = (props) => {
  return (
    <div className={twMerge('pt-0 relative w-[146px] h-[146px] flex-none')} role="image-container">
      <CardHeadImage {...props} />

      {props.children}
    </div>
  )
}
export default CardHeadFetureThisWeek
