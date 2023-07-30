'use client'

import { getCroppedImageUrl } from '~/components/common/cropped-image/packages/utils/getCroppedImageUrl'
import ImageLazy from '~/components/common/lazy-image'

export default function VipFreeTrialBanner(props: {
  vipData: {
    vip_free_trial_banner: string
    vip_free_trial_banner_link: string
  }
}) {
  const { vipData } = props
  if (vipData?.vip_free_trial_banner) {
    return (
      <div
        className="-mt-2 [&_img]:w-full"
        onClick={() => {
          vipData?.vip_free_trial_banner_link && (window.location.href = vipData.vip_free_trial_banner_link)
        }}
      >
        <ImageLazy
          placeholder={<div className="h-10"></div>}
          src={getCroppedImageUrl(vipData?.vip_free_trial_banner, {
            renderWidth: 375,
            devicePixelRatio: 2,
          })}
          alt="Weee! - Groceries Delivered"
        ></ImageLazy>
      </div>
    )
  }
  return null
}
