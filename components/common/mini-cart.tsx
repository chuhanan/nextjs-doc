'use client'
import { useRouter } from 'next/navigation'
import { CSSProperties, FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { WeeeIcon } from '~/components/common/icon'
import useGlobal from '~/store/global'

type IProps = {
  onClick?: () => void
  iconStyle?: CSSProperties
  className?: string
}
const MiniCart: FC<IProps> = ({ onClick, iconStyle = {}, className = '' }) => {
  const router = useRouter()
  const { cart } = useGlobal()
  const count = cart?.quantity || 0
  return (
    <div
      className={twMerge(
        'relative w-10 h-10 flex items-center justify-center rounded-full border border-solid border-surface-1-fg-hairline-idle',
        className,
      )}
      onClick={() => {
        onClick && onClick()
        router.push('/cart')
      }}
    >
      {<WeeeIcon type="iconIcon" className="text-surface-1-fg-default-idle" style={Object.assign({ fontSize: 20 }, iconStyle)} />}
      {count > 0 && (
        <div className="absolute top-0 -right-1.5 px-1.5 py-0.5 bg-pricing-surface-1-bg-idle rounded-full enki-utility-xs-subdued text-surface-1-bg-idle flex justify-center items-center">
          {count > 999 ? '999+' : count}
        </div>
      )}
    </div>
  )
}

export default MiniCart
