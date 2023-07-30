import Link from 'next/link'
import Favorite from '~/components/common/product-card/favorite'
import PopupShare from '~/components/common/popup-share'

type Props = {
  product: any
  shareInfo?: any
  shareImageInfo?: any
  isGroupOrder?: boolean
}

export default function ProductTools({ product, shareInfo, shareImageInfo, isGroupOrder }: Props) {
  if (!product) return null
  let id = product.id
  // const { saveClick, shareClick } = useClickActionT2();
  const global_vendor = product?.is_mkpl ? product?.vender_info_view?.vender_id : null

  // const beforeIconShowPopup = (show: () => void) => {
  //   shareClick({
  //     mod_nm: PdpMod.detail,
  //     mod_pos: 0,
  //     co: {
  //       target_nm: id,
  //       target_type: ClickTargetType.product
  //     }
  //   });
  //   show();
  // };

  return (
    <>
      <div className="flex justify-between h-9 px-5 py-0 items-center">
        {!isGroupOrder && !!product?.brand_name && (
          <Link
            className="w-1/3 text-interactive-standalone-idle enki-utility-base overflow-hidden text-ellipsis whitespace-nowrap"
            prefetch={false}
            href={product?.brand_link_url || `/brand/detail/${product?.brand_slug}/${product?.brand_key}`}
          >
            <span>{product?.brand_name}</span>
          </Link>
        )}
        {isGroupOrder && (
          <div className="w-1/3 text-interactive-standalone-idle enki-utility-base overflow-hidden text-ellipsis whitespace-nowrap">
            <span>{product?.brand_name}</span>
          </div>
        )}

        <div className="flex-1 flex justify-end items-center">
          {product?.sold_status !== 'sold_out' && !isGroupOrder && (
            <Favorite
              id={id}
              onClick={(targetCollected) => {
                //
              }}
            />
          )}

          <PopupShare />
        </div>
      </div>
    </>
  )
}
