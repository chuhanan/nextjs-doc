import Link from 'next/link'
import { WeeeIcon } from '~/components/common/icon'
import Img from '~/components/common/img'

export default function BodyVendorInfo(props) {
  const { product } = props
  if (!(!product?.is_mkpl || !product?.vender_info_view)) {
    return (
      <Link
        href={`/mkpl/vendor/${product?.vender_info_view?.vender_id}`}
        className="mx-5 py-[14px] flex items-center justify-between border-surface-2-bg-idle border-solid border-b"
      >
        {product?.vender_info_view?.vender_logo_url && (
          <div className="w-[32px] h-[32px] border flex-shrink-0 box-border border-solid rounded-2 overflow-hidden mr-2.5 border-surface-1-fg-hairline-idle">
            <Img className="w-full h-full object-cover" src={product?.vender_info_view?.vender_logo_url} alt="Weee! - Groceries Delivered" />
          </div>
        )}
        <div className="w-[calc(100%-50px)] flex flex-col justify-between">
          <div className="enki-utility-sm-subdued text-surface-1-fg-major-idle">
            <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: product?.vender_info_view?.eta_range_desc }}></div>
            <div className="mt-[5px] line-clamp-2" dangerouslySetInnerHTML={{ __html: product?.vender_info_view?.delivery_full_desc }}></div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <WeeeIcon type="iconArrowRight" />
        </div>
      </Link>
    )
  }
  return null
}
