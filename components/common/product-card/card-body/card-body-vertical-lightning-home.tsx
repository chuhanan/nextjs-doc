import React, { FC, useMemo } from 'react';
import { ProductCardProps } from '../../types';
import CardBodyTopTag from './card-body-top-tag';
import CardBodyProductName from './card-body-product-name';
import CardBodyPrice from './card-body-price';
import CountDownLabel from '../countDownLabel';
import Lightning from '../lightning';

const CardBodyVerticalLightningHome: FC<Partial<ProductCardProps>> = props => {
  return (
    <div role="mid-box">
      <CardBodyTopTag {...props} />

      <CardBodyProductName {...props} className="my-1.5 mx-2.5" />

      <CardBodyPrice {...props} showSpecialPrice className="mx-2.5 mt-0" />

      {props?.data?.status === 'begoing' ? (
        <CountDownLabel status="begoing" start={props?.countDownTimeStamp} end={props?.data?.start_time} />
      ) : (
        <Lightning {...props} />
      )}
    </div>
  );
};
export default CardBodyVerticalLightningHome;
