import { twMerge } from 'tailwind-merge'
import PictureSwiper from './picture-swiper'
import LightningDeal from './lightning-deal'
import ProductTools from './product-tools'

interface IProps {
  className?: string
  product: any
  shareInfo?: any
  shareImageInfo?: any
}

export default function Picture(props: IProps) {
  const { className, product, shareImageInfo, shareInfo } = props
  return (
    <div className="relative">
      <PictureSwiper imageUrls={product?.media_urls} />
      <div className="absolute -bottom-0.5 right-0 z-10 w-full">
        {product?.special_price_today && <LightningDeal product={product} />}
        <ProductTools isGroupOrder={false} product={product} shareInfo={shareInfo} shareImageInfo={shareImageInfo} />
      </div>
    </div>
  )
}
