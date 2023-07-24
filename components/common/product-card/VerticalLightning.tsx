import React from 'react';
import ProductContainer from './Container';
import type { ProductCardProps } from './types';
import classNames from 'classnames';
import CardHeadVertical from './meta/card-head/card-head-vertical';
import CardBody from './meta/card-body/card-body-vertical-lightning';
import ProductAddCart from './meta/add-cart';
import LightningReminder from './meta/lightningReminder';

const ProductVerticalLightning: React.FC<Partial<ProductCardProps>> = props => {
  const { className, data, ...rest } = props;
  return (
    <ProductContainer data={data} {...rest}>
      <div className={classNames('p-0')}>
        <CardHeadVertical data={data} {...rest}>
          {data?.status === 'begoing' ? (
            <LightningReminder className="bottom-1" {...props} />
          ) : (
            <ProductAddCart {...props} />
          )}
        </CardHeadVertical>
        <CardBody data={data} {...rest} />
      </div>
    </ProductContainer>
  );
};

export default ProductVerticalLightning;
