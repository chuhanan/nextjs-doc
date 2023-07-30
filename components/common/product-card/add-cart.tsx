'use client'
import { useTranslations } from 'next-intl'
// import AddCart from '@/components/common/AddCartNew/index-enki';
import { useEffect, useState } from 'react'
// import Constants from '@/constants/const';
// import useTranslation from 'next-translate/useTranslation';
import { twMerge } from 'tailwind-merge'

const ProductAddCart: React.FC<Partial<any & { addCartBtnClassName?: string }>> = (props) => {
  const {
    data,
    showAddBtn = true,
    addCartParams,
    preSell,
    onATC,
    produtLink,
    trackDataInDialog,
    cardType,
    positionInfoT2,
    useNewUpdateCartApi,
    addCartBtnClassName,
  } = props
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  const t = useTranslations('Common')

  useEffect(() => {
    if (showTooltip) {
      let timer = setTimeout(() => {
        setShowTooltip(false)
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [showTooltip])

  // 第一次加购商家产品，且不包邮，显示tooltip
  const handleAddBtn = (type, num) => {
    if (data?.is_mkpl && type === 'add' && num === data?.min_order_quantity && data?.vender_info_view?.free_threshold > 0) {
      const venderId = data?.vender_info_view?.vender_id
      // const venders = localStorage.getItem(Constants.GLOBAL_VENDERD_LIST);
      // const venderList = (venders && JSON.parse(venders)) || [];
      // if (!venderList.length || (venderList.length <= 300 && !venderList?.includes(venderId))) {
      //   let list = venderList;
      //   list.push(venderId);
      //   setShowTooltip(true);
      //   localStorage.setItem(Constants.GLOBAL_VENDERD_LIST, JSON.stringify(list));
      // }
    }
  }

  return (
    <div>
      {data?.category === 'bundle' || data?.is_hotdish === 'Y' ? (
        <div className={twMerge('text-center absolute bottom-2 right-2 z-[1]')}>
          <span>{t('btn_view')}</span>
        </div>
      ) : showAddBtn ? (
        <div className={twMerge('text-center absolute bottom-2 right-2 z-[1]', addCartBtnClassName)}>
          <div
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            {/* <AddCart
              {...addCartParams}
              useNewUpdateCartApi={useNewUpdateCartApi}
              positionInfoT2={positionInfoT2}
              cardType={cardType}
              preSell={preSell}
              data={data}
              link={produtLink?.to}
              onNumChange={onATC}
              isInProductCard
              showTooltip={showTooltip}
              trackDataInDialog={trackDataInDialog}
              onClick={(type, num) => handleAddBtn(type, num)}
              customAddCartApi={props?.customAddCartApi}
            /> */}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default ProductAddCart
