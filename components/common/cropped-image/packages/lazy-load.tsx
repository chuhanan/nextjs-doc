import { CSSProperties, FC, PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { twMerge } from 'tailwind-merge'

export type LazyloadProps = {
  scrollContainer?: Element
  once?: boolean
  offset?: number
  minHeight?: number
  height?: number
  placeholder?: ReactElement
  unmountIfInvisible?: boolean
  className?: string
  placeholderCls?: string
  style?: CSSProperties
  placeholderStyle?: CSSProperties
}

export const Lazyload: FC<PropsWithChildren<LazyloadProps>> = ({
  scrollContainer,
  once,
  offset,
  height,
  minHeight,
  placeholder,
  unmountIfInvisible,
  className,
  placeholderCls,
  style,
  placeholderStyle,
  children,
}) => {
  const { ref, inView, entry } = useInView({
    root: scrollContainer ?? null,
    rootMargin: `0px 0px ${offset}px 0px`,
    triggerOnce: once,
  })
  const [isAlive, setIsAlive] = useState<boolean>(false)

  useEffect(() => {
    if (inView) {
      setIsAlive(true)
      return
    }
    if (unmountIfInvisible) {
      setIsAlive(false)
    }
  }, [inView, unmountIfInvisible])

  return (
    <div ref={ref} style={{ ...style, minHeight, height }} className={twMerge('h-full', className)}>
      {isAlive ? (
        children
      ) : (
        <div className={twMerge('h-full', placeholderCls)} style={placeholderStyle}>
          {placeholder}
        </div>
      )}
    </div>
  )
}
