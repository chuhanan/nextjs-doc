import { useState, useEffect, useRef, HTMLAttributes, HtmlHTMLAttributes } from 'react'
import { createPortal } from 'react-dom'
import styles from './index.module.css'
import { twMerge } from 'tailwind-merge'
import { WeeeIcon } from '~/components/common/icon'
import { fixedBody, looseBody } from '~/utils/scroll'

type PopupProps = {
  show: boolean
  onClose?: () => void
  afterClose?: () => void
  animationType?: 'slide-up' | 'slide-down' | 'scale-in' | 'scale-out' | 'slide-left' | 'slide-right'
  zIndex?: number
  destroyOnClose?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  title?: string | React.ReactNode
  children: React.ReactNode
  animateTime?: number
  closable?: boolean
  popupId?: string
  /* 内容区域的类名 */
  wrapperClassName?: HtmlHTMLAttributes<HTMLElement>['className']
  wrapperStyle?: React.CSSProperties
  popStyle?: React.CSSProperties
  maskClosable?: boolean
  headerClassName?: string
}

const Popup = ({
  show,
  onClose = () => {},
  afterClose = () => {},
  animationType = 'scale-in',
  zIndex = 1000,
  destroyOnClose = false,
  position = 'center',
  title = '',
  children,
  animateTime = 250,
  closable = false,
  popupId = 'popup',
  wrapperClassName = '',
  wrapperStyle = {},
  headerClassName = '',
  popStyle = {},
  maskClosable = true,
}: PopupProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(show)
  const [firstRendered, setFirstRendered] = useState<boolean>(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    if (show) {
      fixedBody()
      setFirstRendered(true)
      setIsOpen(true)
    } else {
      looseBody()
      setIsOpen(false)
    }
    return () => {
      looseBody()
    }
  }, [show])

  useEffect(() => {
    if (!show && destroyOnClose && popupRef.current) {
      const timer = setTimeout(() => {
        afterClose()
        firstRendered && setFirstRendered(false)
        clearTimeout(timer)
        popupRef.current?.remove()
      }, 300)
    }
  }, [show, destroyOnClose, afterClose])
  if (!firstRendered && !show) {
    return null
  }
  if (!isOpen && !firstRendered) return null // 首次show组件时，默认状态是隐藏的，所以不渲染，防止闪现

  return createPortal(
    <div
      id={popupId}
      style={{ zIndex, animationDuration: `${animateTime}ms`, transform: 'translateZ(5px)', ...popStyle }}
      ref={popupRef}
      className={`fixed inset-0 flex items-center justify-center ${!isOpen ? styles['zHide'] : ''}`}
    >
      <div
        className={`touch-none absolute inset-0 bg-black opacity-30 transition-opacity duration-300 ease-out  ${
          isOpen ? styles['fade-in'] : styles['fade-out']
        }`}
        onClick={() => {
          if (maskClosable) {
            handleClose()
          }
        }}
      />
      <div
        style={{ animationDuration: `${animateTime}ms`, ...wrapperStyle }}
        className={twMerge(
          `${popupId}-content`,
          `touch-none bg-white max-w-[750px] mx-auto box-border inset-x-0 transform transition duration-300 ease-in-out ${
            isOpen ? styles[animationType + '-enter'] : styles[animationType + '-leave']
          } absolute`,
          position === 'top' && 'top-0',
          position === 'bottom' && 'bottom-0 inset-x-0 pb-safe',
          position === 'left' && 'left-0 inset-y-0',
          position === 'right' && 'right-0',
          position === 'center' && 'relative',
          wrapperClassName,
        )}
      >
        {(title || closable) && (
          <header className={twMerge('p-5 relative flex justify-center items-center', headerClassName)}>
            {title && typeof title === 'string' ? <h2 className="enki-heading-base">{title}</h2> : title}
            {closable && (
              <div className="absolute left-5 top-1/2 -translate-y-1/2" onClick={handleClose}>
                <WeeeIcon type="iconTimes" className=" text-surface-1-fg-major-idle" style={{ fontSize: 36 }} />
              </div>
            )}
          </header>
        )}
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Popup
