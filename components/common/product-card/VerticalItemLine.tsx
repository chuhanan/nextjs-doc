import React from 'react'
import ProductContainer from './Container'
import CardHeadVertical from './card-head/card-head-vertical'
import CardBody from './card-body/card-body-vertical-item-line'
// import ProductAddCart from './add-cart';
import { twMerge } from 'tailwind-merge'

const ProductVerticalItemLine: React.FC<Partial<any>> = (props) => {
  const { className, data, ...rest } = props
  return (
    <ProductContainer data={data} {...rest}>
      <div className={twMerge('p-0')}>
        <CardHeadVertical data={data} {...rest}>
          {/* {React.cloneElement(<ProductAddCart {...props} />, props)} */}
        </CardHeadVertical>
        <CardBody data={data} {...rest} />
      </div>
    </ProductContainer>
  )
}

export default ProductVerticalItemLine
