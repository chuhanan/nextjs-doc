import React, { useMemo } from 'react'
import WeeklySold from '../weeklySold'
import RemainCount from '../remainCount'
import ProductTag from '../product-tag'
import ShipsFrom from './card-body-mkpl-ships'
import { twMerge } from 'tailwind-merge'
// import { getRemainingCount } from '@/utils/common/product-card';

const CardBodyBottomInfo: React.FC<Partial<any>> = (props) => {
  const {
    showAllTags = false,
    showActivity = true,
    showSoldBy = true,
    showLeft = true,
    showWeekly = true,
    data,
    className,
    cardType = 'vertical',
  } = props

  const remainCount = 10 //getRemainingCount(data);
  const weekSoldCount = data?.last_week_sold_count_ui !== '0' ? data?.last_week_sold_count_ui : '' // 格式化显示的周销量
  // tag优先级hot deal > points back > promo > bogo
  const productTag = data?.product_tag_list?.length > 0

  const displayItems = useMemo(() => {
    let display2Items: any = []
    if (showAllTags) {
      display2Items = [
        productTag && <ProductTag {...props} />,
        !!remainCount && <RemainCount key="remainCount" {...props} />,
        cardType === 'vertical' && weekSoldCount && <WeeklySold key="WeeklySold" {...props} />,
      ]
    } else {
      display2Items = [
        showActivity && productTag && <ProductTag {...props} />,
        showLeft && !!remainCount && <RemainCount key="remainCount" {...props} />,
        showWeekly && weekSoldCount && cardType === 'vertical' && <WeeklySold key="WeeklySold" {...props} />,
      ]
        .filter((item) => !!item)
        .slice(0, 2)
    }
    //ships from 在横向卡片中展示在其他地方这里过滤
    //如果是 mkpl 商品(非自营商品), 且有 ships from 信息, 则展示 ships from, 且外部传入 showSoldBy 为 true
    if (cardType === 'vertical' && data?.vender_info_view?.delivery_desc && showSoldBy) {
      display2Items = [display2Items[0], <ShipsFrom key="ShipsFrom" {...props} className="max-w-full" />]
    }
    return display2Items
  }, [showWeekly, showActivity, showLeft, data, showAllTags, cardType, productTag, props, showSoldBy, weekSoldCount])

  if (displayItems.length) {
    return <div className={twMerge('mt-1.5 flex flex-col justify-start items-start', className)}>{displayItems}</div>
  }
  return null
}

export default CardBodyBottomInfo
