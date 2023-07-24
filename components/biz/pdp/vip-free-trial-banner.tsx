'use client'

import { getCroppedImageUrl } from '~/components/common/cropped-image/packages/utils/getCroppedImageUrl'

export default function VipFreeTrialBanner(props) {
  const { product } = props
  if (product?.vip_free_trial_banner) {
    return (
      <div
        className="-mt-2 [&_img]:w-full"
        onClick={() => {
          product?.vip_free_trial_banner_link && (window.location.href = product.vip_free_trial_banner_link)
        }}
      >
        <img
          src={getCroppedImageUrl(product?.vip_free_trial_banner, {
            renderWidth: 375,
            devicePixelRatio: 2,
          })}
          alt="Weee! - Groceries Delivered"
        />
      </div>
    )
  }
  return null
}
