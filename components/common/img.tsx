import { getCroppedImageUrl } from '~/components/common/cropped-image/packages/utils/getCroppedImageUrl'
import { twMerge } from 'tailwind-merge'

type Props = {
  croppedImageOptions?: any
  className?: string
  src: string | { src: string }
} & ObjectType

export default function Img(props: Props) {
  let { className, alt = 'Weee! - Groceries Delivered', src, croppedImageOptions, ...others } = props
  const finalSrc = typeof src === 'string' ? src : src?.src ? src.src : ''
  return (
    <img className={twMerge(className)} src={getCroppedImageUrl(finalSrc, { devicePixelRatio: 2, ...croppedImageOptions })} alt={alt} {...others} />
  )
}
