import classNames from 'classnames';
import React, { FC, useMemo, useRef, useState } from 'react';

import CardHeadImage from './card-head-image';
import { ProductCardProps } from '../../types';
import CardHeadLabel from './card-head-label';
import CardHeadSoldOut from './card-head-soldout';
import CountDownLabel from '../countDownLabel';

const CardHeadVertical: FC<Partial<
  ProductCardProps & {
    imageNode?: React.ReactNode | (() => React.ReactNode);
    labelNode?: React.ReactNode | (() => React.ReactNode);
  }
>> = props => {
  return (
    <div className={classNames('pt-[100%] w-full relative rounded-[15px]')} role="image-container">
      <CardHeadImage {...props} />

      {props?.data?.status === 'begoing' ? (
        <CardHeadLabel {...props} />
      ) : (
        <CountDownLabel status="ongoing" start={props?.countDownTimeStamp} end={props?.data?.end_time} />
      )}

      <CardHeadSoldOut {...props} cardType="vertical" />

      {props.children}
    </div>
  );
};
export default CardHeadVertical;
