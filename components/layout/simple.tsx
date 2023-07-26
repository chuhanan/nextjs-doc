'use client'

import React, { ReactNode, useEffect } from 'react'
import Header from '~/components/common/header'
import { twMerge } from 'tailwind-merge'
import useGlobal, { GlobalProvider } from '~/store/global'
import DataProvider from './data-provider'
export interface Props {
  className?: string
  headerWrapClassName?: string
  headerClassName?: string
  title?: string | React.ReactNode
  contentClassName?: string
  children?: ReactNode
  onShare?: (any) => void
  shareData?: ObjectType
  onBack?: () => string
  topNode?: React.ReactNode
  header?: React.ReactNode | boolean
  //是否默认微信分享信息
  isServerSide?: boolean
  shareIcon?: string
  shareAfterClose?: () => void
  trackSharePopupClick?: (e) => void
  onBeforeShareShow?: (modal: any) => void
  rightNode?: React.ReactNode
  showBackHomeIcon?: boolean
  headerBottomSlot?: React.ReactNode
  contentBottomSlot?: React.ReactNode
  statusBarColor?: string
  stickyParams?: {
    custom?: boolean
    scrollHeight?: number
    targetRef?: any
    cb?: (sticky?: boolean) => void
  }
  //在服务端渲染时, 如果能拿到url上的参数, 可以优化状态栏等
  appStatusBarHeight?: number
  showBackIcon?: boolean
  prefetchApiList?: Array<any>
}

function LayoutInner(props: Props) {
  const {
    className,
    headerClassName,
    headerWrapClassName,
    contentClassName,
    children,
    header,
    topNode,
    headerBottomSlot,
    contentBottomSlot,
    statusBarColor,
    appStatusBarHeight,
    prefetchApiList,
    ...rest
  } = props
  const { cart, setCartData } = useGlobal()
  // const headerRef = useRef(null)
  console.log(cart, 'cart')
  const { custom = false, targetRef, ...others } = props.stickyParams || {}

  // const { eleRef } = useSticky({
  //   targetRef,
  //   ...others,
  // })

  // const [statusBarHeight, setStatusBarHeight] = useState(appStatusBarHeight)

  // useEffect(() => {
  //   if (appStatusBarHeight && statusBarHeight !== appStatusBarHeight) {
  //     setStatusBarHeight(appStatusBarHeight)
  //   }
  // }, [appStatusBarHeight])

  return (
    <>
      <DataProvider prefetchApiList={prefetchApiList} />
      <div className={twMerge('min-h-screen md:w-[750px] md:mx-auto md:my-0', className)}>
        <div
          className="sticky z-[302] top-0"
          style={{
            position: '-webkit-sticky',
          }}
          id="layout-header"
          // ref={headerRef}
        >
          {/* {statusBarHeight > 0 && <div style={{ backgroundColor: statusBarColor }} />} */}
          {topNode}
          {header !== false && (
            <div className={twMerge('flex items-center justify-center h-12 max-w-[750px] md:w-[750px] md:mx-auto md:my-0', headerWrapClassName)}>
              {header ? (
                header
              ) : (
                <Header
                  {...rest}
                  className={twMerge((process.env.ENV_VAR || process.env.NEXT_PUBLIC_ENV_VAR) === 'test' && '!bg-[#49c468]', headerClassName)}
                />
              )}
            </div>
          )}
          {!!headerBottomSlot && headerBottomSlot}
        </div>
        {!!children && (
          <div className={contentClassName} role="content">
            {/* {!custom && <div ref={eleRef} />} */}
            {children}
          </div>
        )}
        {!!contentBottomSlot && contentBottomSlot}
      </div>
    </>
  )
}

export default function Layout(props) {
  return (
    <GlobalProvider data={{}}>
      <LayoutInner {...props} />
    </GlobalProvider>
  )
}
