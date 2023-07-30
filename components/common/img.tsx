import { getCroppedImageUrl } from '~/components/common/cropped-image/packages/utils/getCroppedImageUrl'
import { twMerge } from 'tailwind-merge'
import { forwardRef } from 'react'

type Props = {
  croppedImageOptions?: any
  className?: string
  src: string | { src: string }
} & ObjectType

const Img = forwardRef((props: Props, ref) => {
  let { className, alt = 'Weee! - Groceries Delivered', src, croppedImageOptions, ...others } = props
  const finalSrc = typeof src === 'string' ? src : src?.src ? src.src : ''
  if (!finalSrc) return null
  return (
    <img
      ref={ref as any}
      className={twMerge(className)}
      src={getCroppedImageUrl(finalSrc, { devicePixelRatio: 2, ...croppedImageOptions })}
      alt={alt}
      {...others}
    />
  )
})

export default Img
