'use client'
import React, { cloneElement, FC, ReactElement, JSXElementConstructor, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { IntersectionOptions, useInView } from 'react-intersection-observer'
import { twMerge } from 'tailwind-merge'

type ViewProps = Partial<any> & {
  viewOptions?: IntersectionOptions
  placeholder: ReactElement<any, string | JSXElementConstructor<any>>
  initialLoad?: boolean
}

const ImageLazy: FC<ViewProps> = React.forwardRef(({ initialLoad = false, viewOptions = {}, src, placeholder, className, ...rest }) => {
  const { inView, ref } = useInView({
    threshold: 0.05,
    ...viewOptions,
  })
  const viewRef = useRef<boolean>(false)

  const [complete, setComplete] = useState<boolean>(initialLoad)
  const [loaded, setLoaded] = useState<boolean>(initialLoad)

  const handleComplate = useCallback(() => {
    setComplete(true)
  }, [])

  useEffect(() => {
    if (viewRef.current) return
    if (inView) {
      viewRef.current = true
      setLoaded(true)
      let img = new Image()
      img.src = src
      img.onload = handleComplate
      img.onerror = handleComplate
    }
  }, [inView])

  return (
    <>
      {!complete && cloneElement(placeholder, { ref })}
      <img {...rest} className={twMerge(twMerge(className, !complete && 'hidden'))} src={loaded ? src : ''} />
    </>
  )
})

export default ImageLazy
