import { useEffect, useRef, useMemo, useState } from 'react'
import { useInView, IntersectionOptions } from 'react-intersection-observer'
/**
 *
 * @param options 懒加载
 * @returns
 */
function useLazyData(inviewOptions: IntersectionOptions, initialShow?: boolean) {
  const { ref, inView, entry } = useInView({
    threshold: 0.01,
    rootMargin: '30px 0px 0px 0px',
    ...inviewOptions,
  })
  /** 是否使用真实的数据 */
  const [show, setShow] = useState<boolean>(initialShow || false)
  const scanedRef = useRef<boolean>(false)

  useEffect(() => {
    if (scanedRef.current) return
    if (inView) {
      scanedRef.current = true
      setShow(true)
    }
  }, [inView])

  return { ref, inView, entry, show }
}

export default useLazyData
