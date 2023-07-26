import { twMerge } from 'tailwind-merge'
import Img from '../img'

enum TagKey {
  TAG_KEY_KILL_DEAL = 'kill_deal',
  TAG_KEY_PROMO = 'promo',
  TAG_KEY_BOGO = 'bogo',
  TAG_KEY_REWARDS = 'rewards',
}

type Props = {
  data?: any
}
export default function PointTag(props: Props) {
  const { product_tag_list } = props?.data || {}

  return (
    <>
      {product_tag_list?.map((tag, index) => {
        return (
          <div
            key={`${tag?.tag_key}-${index}`}
            className={twMerge(
              'flex items-center mb-1 box-border px-2 h-[18px] rounded-xl enki-badge-label-sm overflow-hidden max-w-full gap-1',
              !!tag?.tag_icon_url && 'pl-[3px] pr-[10px]',
            )}
            style={{ backgroundColor: tag?.tag_color, color: tag?.tag_font_color }}
          >
            {!!tag?.tag_icon_url && <Img style={{ width: '16px', height: '16px' }} src={tag?.tag_icon_url} />}
            <span
              className="flex-1 leading-[initial] overflow-hidden text-ellipsis whitespace-nowrap"
              dangerouslySetInnerHTML={{ __html: tag?.tag_name }}
            />
          </div>
        )
      })}
    </>
  )
}
