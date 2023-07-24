import React, { cloneElement } from 'react'
import useLazyData from '~/hooks/useLazyData'
import { IntersectionOptions } from 'react-intersection-observer'

type Props = {
  skeleton: React.ReactElement
  inviewOptions?: IntersectionOptions
} & Record<string, any>

const LazyView = ({ skeleton, children, inviewOptions }: Props) => {
  const { ref: viewRef, show } = useLazyData({
    threshold: 0.01,
    rootMargin: '6px 0px 0px 0px',
    ...inviewOptions,
  })
  if (!!skeleton && !show) return cloneElement(skeleton, { viewRef: viewRef })
  return children
}

export default LazyView
