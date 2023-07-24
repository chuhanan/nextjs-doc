import React from 'react';
import ProductContainer from './Container';
import type { ProductCardProps } from './types';
import classNames from 'classnames';
import CardHeadVertical from './meta/card-head/card-head-vertical-mkpl';
import CardBody from './meta/card-body/card-body-vertical-mkpl';
import ProductAddCart from './meta/add-cart';

const ProductVerticalMkpl: React.FC<Partial<ProductCardProps>> = props => {
  const { className, data, ...rest } = props;
  return (
    <ProductContainer data={data} {...rest}>
      <div className={classNames('p-0')}>
        <CardHeadVertical data={data} {...rest} className="rounded-[15px]">
          {React.cloneElement(<ProductAddCart {...props} />, props)}
        </CardHeadVertical>
        <CardBody data={data} {...rest} />
      </div>
    </ProductContainer>
  );
};

export default ProductVerticalMkpl;
