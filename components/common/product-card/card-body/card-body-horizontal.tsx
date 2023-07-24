import React, { FC, useMemo } from 'react';

import { CardType, ProductCardProps } from '../../types';
import CardBodyTopTag from './card-body-top-tag';
import CardBodyProductName from './card-body-product-name';
import CardBodyPrice from './card-body-price';
import CardBodyBottomInfo from './card-body-bottom-info';
import CardBodyMkplShip from './card-body-mkpl-ships';
import Trans from 'next-translate/Trans';
import { twMerge } from 'tailwind-merge';
import { isMobileBrowser } from '@/utils/common/device';

const CardBodyHorizontal: FC<Partial<ProductCardProps> & CardType> = props => {
  const { showExtraTag, data } = props;
  const isPc = !isMobileBrowser();
  return (
    <div role="mid-box" className="flex flex-col self-stretch justify-between ml-2 overflow-hidden">
      <div>
        <CardBodyTopTag {...props} />
        <CardBodyProductName {...props} cardType={props?.cardType} />
        <CardBodyBottomInfo {...props} className="mx-0 mt-1" cardType="horizontal" />
      </div>

      <div>
        {showExtraTag && !!+data?.discount_percentage && (
          <span className="text-[10px] inline-block px-1 h-5 leading-5 mt-0 mb-1 rounded bg-orange-200 font-semibold text-center text-orange-600">
            <Trans
              i18nKey="common:order_share_grocery_extra_tag"
              components={{
                span: <span />
              }}
              values={{
                discount: data?.discount_percentage
              }}
            />
          </span>
        )}
        <CardBodyPrice {...props} />
        <CardBodyMkplShip {...props} className={twMerge('my-0.5 max-w-[150px]', isPc && 'max-w-[100%]')} />
      </div>
    </div>
  );
};
export default CardBodyHorizontal;
