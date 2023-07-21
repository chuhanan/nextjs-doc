import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface Options {
  scrollHeight?: number
  targetRef?: any
  cb?: (sticky?: boolean) => void
}

/**
 * 页面滚动时候添加吸顶下部分阴影
 * @param ref 需要添加阴影的元素
 * @param options
 */
const useSticky = (options?: Options) => {
  const { scrollHeight = 47 } = options

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: `${0 - scrollHeight}px 0px 0px 0px`,
    initialInView: true,
  })

  useEffect(() => {
    let targetRef = options?.targetRef
    if (options.cb) {
      options.cb(!inView)
      return
    }
    if (!targetRef?.current) return
    targetRef.current.style.boxShadow = inView ? '' : '0px 3px 8px rgba(0, 0, 0, 0.09)'
  }, [inView, scrollHeight])

  return {
    eleRef: ref,
  }
}

export default useSticky
