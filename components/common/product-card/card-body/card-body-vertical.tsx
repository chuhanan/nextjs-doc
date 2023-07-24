import React, { FC, useMemo } from 'react';
import { ProductCardProps } from '../../types';
import CardBodyTopTag from './card-body-top-tag';
import CardBodyProductName from './card-body-product-name';
import CardBodyPrice from './card-body-price';
import CardBodyBottomInfo from './card-body-bottom-info';

const CardBodyVertical: FC<Partial<ProductCardProps>> = props => {
  return (
    <div role="mid-box" className="mx-2.5 my-1.5">
      <CardBodyTopTag {...props} />
      <CardBodyProductName {...props} className="pb-1.5" />

      <CardBodyPrice {...props} className="mt-0" />

      <CardBodyBottomInfo {...props} />
    </div>
  );
};
export default CardBodyVertical;
