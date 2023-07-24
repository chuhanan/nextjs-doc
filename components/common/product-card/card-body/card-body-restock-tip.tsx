import React from 'react';
import { StatusEnum } from '@/types/cart';
import { ProductCardProps } from '../../types';

export default function CardBodyRestockTip(props: Partial<ProductCardProps>) {
  const { data } = props;

  return data?.sold_status === StatusEnum?.sold_out && data?.restock_tip ? (
    <div className="mt-1 text-[#c14501] leading-3 font-medium text-[11px]">{data?.restock_tip}</div>
  ) : null;
}
