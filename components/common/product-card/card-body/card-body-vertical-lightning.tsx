import React, { FC, useMemo } from 'react';
import { ProductCardProps } from '../../types';
import CardBodyTopTag from './card-body-top-tag';
import CardBodyProductName from './card-body-product-name';
import CardBodyPrice from './card-body-price';
import Lightning from '../lightning';

const CardBodyVertical: FC<Partial<ProductCardProps>> = props => {
  return (
    <div role="mid-box">
      <CardBodyTopTag {...props} />

      <CardBodyProductName {...props} className="my-1.5 mx-2.5" />

      <CardBodyPrice {...props} showSpecialPrice className="mx-2.5 mt-0" />

      <Lightning {...props} />
    </div>
  );
};
export default CardBodyVertical;
