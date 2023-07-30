import React, { cloneElement, FC, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { IntersectionOptions, useInView } from 'react-intersection-observer'
import { twMerge } from 'tailwind-merge'

export type Props = {
  children?: string | ReactNode | ReactNode[]
}

type ViewProps = {
  viewOptions?: IntersectionOptions
  placeholder?: ReactNode | null
  className?: string
  completeClassName?: string
  initialLoad?: boolean
  inViewTrackOnceCallBack?: () => void
  children: ReactElement | undefined
  /** 元素在视窗位置发生变化回调 */
  onViewChange?: (inView: boolean) => void
}

const ViewportLoad: FC<ViewProps> = ({
  placeholder,
  children,
  className = '',
  initialLoad = false,
  viewOptions = {},
  inViewTrackOnceCallBack,
  onViewChange,
  completeClassName = '',
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    ...viewOptions,
  })
  const [loaded, setLoaded] = useState<boolean>(initialLoad)
  const [complete, setComplete] = useState<boolean>(initialLoad)
  const loadRef = useRef<boolean>(initialLoad)
  const childrenRef = useRef<any>()
  const refReported = useRef(false)
  const timer = useRef<any>(null)

  const handleComplate = useCallback(() => {
    setComplete(true)
  }, [])

  useEffect(() => {
    onViewChange?.(inView)
    if (loadRef.current) return
    if (inView) {
      setLoaded(true)
      loadRef.current = true

      if (typeof inViewTrackOnceCallBack === 'function') {
        if (refReported.current) return
        timer.current = setTimeout(() => {
          refReported.current = true
          inViewTrackOnceCallBack()
        }, 1000)
      }
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [inView])

  useEffect(() => {
    if (loaded && !initialLoad) {
      if (childrenRef.current) {
        childrenRef.current.addEventListener('load', handleComplate)
        childrenRef.current.addEventListener('error', handleComplate)
        return
      }
    }
    return () => {
      childrenRef.current?.removeEventListener('load', handleComplate)
      childrenRef.current?.removeEventListener('error', handleComplate)
    }
  }, [loaded, initialLoad])

  return (
    <span ref={ref} className={twMerge(!complete && className, !!complete && completeClassName)}>
      {!loaded ? placeholder : cloneElement(children as ReactElement, { ref: childrenRef })}
    </span>
  )
}

export { ViewportLoad }
