import { twMerge } from 'tailwind-merge'
import { Back } from '~/components/common/back'

export const Header = (props) => {
  const { className, leftNode, children, rightNode } = props

  return (
    <div className={twMerge('w-full h-full flex relative items-center bg-white', className)}>
      <div className={twMerge('flex h-full pl-2 items-center', 'header__left')} data-role="left">
        {leftNode}
      </div>
      <div className="absolute left-20 right-20 top-0 bottom-0 flex items-center justify-center text-center" role="middle">
        <span className="text-ellipsis overflow-hidden whitespace-nowrap">{children}</span>
      </div>
      <div className={twMerge('absolute right-0 flex h-full justify-end items-center pr-4', 'header__right')} role="right">
        {rightNode}
      </div>
    </div>
  )
}

export const SubPageHeader = (props) => {
  const {
    title,
    shareData,
    className,
    onBack,
    isServerSide,
    shareIcon,
    shareAfterClose,
    onBeforeShareShow,
    trackSharePopupClick,
    showBackHomeIcon = false,
    showBackIcon = true,
    ...rest
  } = props
  return (
    <Header
      className={twMerge('data-[role=left]:pl-2', className)}
      leftNode={showBackIcon ? <Back onClick={onBack} showBackHomeIcon={showBackHomeIcon} /> : null}
      {...rest}
    >
      {!!title && <div className="text-surface-1-fg-default-idle enki-heading-base overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>}
    </Header>
  )
}

export default SubPageHeader
