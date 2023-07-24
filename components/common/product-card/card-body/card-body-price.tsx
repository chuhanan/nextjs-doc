// import { wrapCurrency } from '@/utils/tool';
// import classNames from 'classnames';
// import { ProductCardProps } from '../../types';

import { twMerge } from 'tailwind-merge'

const CardBodyPrice: React.FC<
  Partial<
    any & {
      showSpecialPrice?: boolean
    }
  >
> = (props) => {
  const { data, priceCls, showBasePrice = true, className, showSpecialPrice } = props

  const renderBasePrice = () => {
    if (!!showBasePrice && !!data?.base_price) {
      let comparePrice = data?.price
      //秒杀价取值调整
      if (showSpecialPrice) {
        comparePrice = data?.special_price
      }
      if (data?.base_price > comparePrice) {
        return <div className={twMerge('enki-numeral-sm text-surface-1-fg-minor-idle line-through')}>${data?.base_price}</div>
      }
    }
    return null
  }

  return (
    <div className={twMerge('flex items-baseline flex-row flex-wrap', className, priceCls)}>
      <div
        className={twMerge('enki-numeral-base text-pricing-standalone-idle mr-1', props.cardSize === 'sm' && 'leading-5 text-[17px]')}
        role="price"
      >
        {`$${showSpecialPrice ? data?.special_price : data?.price}`}
      </div>

      {renderBasePrice()}
    </div>
  )
}

export default CardBodyPrice
