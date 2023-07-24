import { twMerge } from 'tailwind-merge'
import LazyImage from '~/components/common/lazy-image'

const CardHeadImage: React.FC<
  Partial<
    any & {
      imageNode?: React.ReactNode | (() => React.ReactNode)
    }
  >
> = (props) => {
  const { data, imageNode, imageSize, className } = props
  const productImage = (
    <LazyImage
      role="product-image"
      placeholder={
        <div className="w-full h-full absolute top-0 left-0 m-0 object-cover skeleton bg-[#f3f3f3]">
          <div className="w-full h-full default-img" />
        </div>
      }
      className={twMerge('w-full h-full absolute top-0 left-0 m-0 object-cover', className)}
      src={data?.square_img_url || data?.img || data?.image_url}
      alt={`weee_${data?.parent_category}_${data?.name}`}
    />
  )

  if (props.isRobot) {
    return productImage
  }
  if (imageNode) {
    const _imageNode = typeof imageNode === 'function' ? imageNode() : imageNode
    if (_imageNode) {
      return _imageNode
    }
  }
  return productImage
}

export default CardHeadImage
