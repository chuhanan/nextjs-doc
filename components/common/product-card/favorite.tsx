import React, { useState, useMemo, ReactElement, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

// import { setFavorite } from '@/api/customer';
// import useAccount from '@/store/account';
// import useThrottle from '@/hooks/throttle';

import { WeeeIcon } from '~/components/common/icon'
// import useNeedLogin from '@/hooks/useNeedLogin';
// import { appCollectStatusNotify } from '@/utils/weeeapp-notify';

export interface HeartProps {
  className?: string
  id?: number
  /** targetCollected 点击收藏按钮之后收藏返回true，点击之后取消收藏返回false*/
  onClick?: (targetCollected: boolean) => void
  isLogin?: boolean
  color?: string
  isFavorite?: boolean
  onSuccess?: (id: number | string, isFavorite?: boolean, supportPurchaseStatusNotify?: boolean, next?: () => void) => void
  render?: (node?: boolean, toggleCollect?: (e?: React.MouseEvent<HTMLElement>) => void, dom?: React.ReactNode) => React.ReactNode
  showToastInPDP?: () => void
  supportPurchaseStatusNotify?: boolean
}

function Favorite({ className, id, onSuccess, onClick, isFavorite, render, supportPurchaseStatusNotify }: HeartProps) {
  // const [collected, setCollected] = useState<boolean>(isFavorite || false)
  // const { checkIsLogin } = useNeedLogin();
  const collected = isFavorite

  const toggleCollect = () => {
    onClick?.(!collected)
    if (onSuccess) {
      // return onSuccess?.(id, !isFavorite, supportPurchaseStatusNotify, () => {
      //   setCollected(collected => !collected);
      // });
    }
  }
  // const handleClick = useThrottle(e => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   if (!checkIsLogin()) return;
  //   toggleCollect();
  // }, 500);
  const defaultNode = (
    <div className={className} style={{ display: 'flex' }}>
      <WeeeIcon
        type={collected ? 'iconfavorite_h' : 'iconfavorite'}
        style={{ fontSize: 18 }}
        className={twMerge('text-black font-normal', collected && 'text-pricing-surface-1-bg-idle')}
      />
    </div>
  )
  // useEffect(() => {
  //   setCollected(isFavorite);
  // }, [isFavorite]);
  if (render) {
    return render(collected, toggleCollect, defaultNode) as ReactElement<any>
  }
  return defaultNode
}

const FavoriteWrapper = ({ id, onClick, render, showToastInPDP, ...rest }: HeartProps) => {
  // const { favoriteIds = [], syncFavoriteIds, isLogin } = useAccount();
  // const isFavorite = useMemo(() => {
  //   return favoriteIds?.includes(+id);
  // }, [id, favoriteIds?.join('_')]);
  const onSuccess = (id, collected, supportPurchaseStatusNotify = false, next) => {
    // let newIds = [...favoriteIds];
    // if (collected) {
    //   newIds = newIds.concat(id);
    //   showToastInPDP && showToastInPDP();
    // } else {
    //   newIds = favoriteIds.filter(item => item !== +id);
    // }
    // supportPurchaseStatusNotify && appCollectStatusNotify([id], collected ? 'add' : 'remove');
    // setFavorite({
    //   type: 'product_favorite_a',
    //   target_id: id
    // })
    //   .then(res => {
    //     if (res?.result) {
    //       // trackByFavoriteAdd(res.object);
    //       next();
    //       syncFavoriteIds(newIds);
    //     } else {
    //       supportPurchaseStatusNotify && appCollectStatusNotify(favoriteIds, 'reset');
    //       syncFavoriteIds(favoriteIds);
    //     }
    //   })
    //   .catch(e => {
    //     supportPurchaseStatusNotify && appCollectStatusNotify(favoriteIds, 'reset');
    //     syncFavoriteIds(favoriteIds);
    //   });
  }

  return (
    <Favorite
      id={id}
      onClick={onClick}
      isFavorite={false}
      {...rest}
      onSuccess={onSuccess}
      render={(id, toggle, defaultNode) => {
        const node = render ? render(id, toggle, defaultNode) : defaultNode
        return node
      }}
    />
  )
}

export default FavoriteWrapper
