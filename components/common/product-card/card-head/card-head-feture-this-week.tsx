import classNames from 'classnames';
import React, { FC, useMemo, useRef, useState } from 'react';

import CardHeadImage from './card-head-image';
import { ProductCardProps } from '../../types';

const CardHeadFetureThisWeek: FC<Partial<
  ProductCardProps & {
    imageNode?: React.ReactNode | (() => React.ReactNode);
    labelNode?: React.ReactNode | (() => React.ReactNode);
  }
>> = props => {
  return (
    <div className={classNames('pt-0 relative w-[146px] h-[146px] flex-none')} role="image-container">
      <CardHeadImage {...props} />

      {props.children}
    </div>
  );
};
export default CardHeadFetureThisWeek;
