// import classNames from 'classnames'
// import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

// import useProductCardInview from '@/tracks/hooks/useProductCardImpresion'
import { buildUrlWithOrigin, convertObjectToUrlParams } from '~/utils/url'
// import type { ProductCardProps } from './types'
// import { showLoading } from '../Indicator/pageIndicator'
// import useClickActionT2 from '@/tracks/useClickActionT2'

const ProductContainer: React.FC<Partial<any>> = (props) => {
  const {
    data = {},
    isLink = true,
    link,
    skeleton,
    skeletonFactor = false,
    className,
    addCartParams,
    children,
    transformLink,
    isInUpsell = false,
    miniTitle = false,
    cardSize,
    linkParams,
    showLoadingWhenJump,
  } = props
  // const { lang } = useTranslation('common')

  // const { ref, clickOption, impressionOption } = useProductCardInview(props)
  // const { productClick } = useClickActionT2()

  const productLink = useMemo(() => {
    let reload = false

    if (link) {
      return {
        to: link,
        reload: reload,
      }
    }
    if (isInUpsell) {
      return {
        to: 'upsell',
        reload: reload,
      }
    }
    //hotdish
    if (data?.is_hotdish === 'Y') {
      const params = {
        ws: addCartParams?.source || '',
        // [`${CONSTS.PUSH_TO_NATIVE_OBJECT.KEY}`]: reload ? CONSTS.PUSH_TO_NATIVE_OBJECT.VALUE : '',
        ...linkParams,
      }
      const baseUrl = `/restaurants/${data?.vender_id}`
      return {
        to: buildUrlWithOrigin(baseUrl + convertObjectToUrlParams(params)),
        reload: true,
      }
    }
    //bundle
    if (data?.category === 'bundle') {
      return {
        to: buildUrlWithOrigin(`/bundle_buy/product?product_id=${data?.id}`),
        reload: true,
      }
    }
    if (transformLink) {
      const _transformLink = transformLink(data)
      //处理transformLink返回的是对象的情况
      if (typeof _transformLink === 'object') {
        return {
          to: _transformLink.to,
          reload: _transformLink.reload,
        }
      }
      return {
        to: _transformLink,
        reload: reload,
      }
    }
    return {
      to: buildUrlWithOrigin(`/product/${data?.slug ? data?.slug : `weee/${data?.id}`}` + convertObjectToUrlParams(linkParams)),
      reload: reload,
    }
  }, [data, addCartParams?.source, JSON.stringify(linkParams), isInUpsell, link, linkParams, transformLink])

  const cls = twMerge(
    'w-full flex flex-col justify-between relative bg-white overflow-hidden rounded-[10px]',
    isLink && 'cursor-pointer',
    !!className && className,
    miniTitle && 'h-full',
    cardSize === 'sm' && 'w-[150px]',
  )

  if (skeleton && skeletonFactor) {
    return <>{skeleton}</>
  }

  if (productLink.reload) {
    return (
      <a className={cls} href={productLink.to}>
        {children}
      </a>
    )
  }

  if (productLink.to === 'upsell') {
    return <div className={cls}>{children}</div>
  }

  return (
    <Link prefetch={false} href={productLink.to} className={cls}>
      {children}
    </Link>
  )
}

export default ProductContainer
