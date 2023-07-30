'use client'
import { FC, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '~/components/common/product-card/VerticalItemLine'
import { WeeeIcon } from '~/components/common/icon'
import useLazyData from '~/hooks/useLazyData'
import LazyView from '~/components/common/lazy-view'
import { useTranslations } from 'next-intl'
import { callApi } from '~/utils/axios'
import { getCookie } from '~/utils/cookie-client'
import { ViewportLoad } from '~/components/common/lazyload-viewport'

type IProps = {
  product: any
}
const SkeletonModule = ({ viewRef }: any) => {
  return (
    <section ref={viewRef} className="max-w-[100vw] h-64 overflow-hidden mt-2 px-4 py-3 bg-white">
      {/* <Skeleton.Button style={{ height: 24 }} /> */}
      <div className="whitespace-nowrap">
        {new Array(3).fill(0).map((_item, index) => {
          return <div className="inline-block mt-4 mr-2.5 w-[136px]" key={`module-skeleton-${index}`} />
        })}
      </div>
    </section>
  )
}

const ProductSection: FC<{
  moduleName: string
  productData: any[]
  title: string
  addCartParams: any
  productCardParam?: {
    showFavorite?: boolean
    showWeekly?: boolean
    [key: string]: any
  }
  impressionType?: string
  impressionOption?: any
  productId?: number
  clickTrack: (id: number) => void
  loaded?: boolean
  link?: string
  customAddCartApi?: any
  showLoadingWhenJump?: boolean
}> = ({
  moduleName,
  productData,
  title,
  productCardParam,
  impressionType,
  impressionOption,
  addCartParams,
  productId,
  clickTrack,
  link,
  customAddCartApi,
  loaded = true,
  showLoadingWhenJump = false,
}) => {
  const { ref: viewRef, show } = useLazyData({
    threshold: 0.01,
    rootMargin: '10px 0px 0px 0px',
  })
  const isGroupOrder = customAddCartApi === 'mkplGroupOrder'
  if (!loaded || !show) {
    return <SkeletonModule viewRef={viewRef} />
  }
  if (!productData.length && loaded) return null
  return (
    <>
      {productData?.length > 0 && (
        <div>
          <div className="mx-5 enki-heading-base text-surface-1-fg-default-idle border-b border-solid border-surface-2-bg-idle py-5">
            <div className="flex justify-between">
              <p>
                <span>{title}</span>
              </p>
              {!!link && !isGroupOrder && (
                <a href={link}>
                  <WeeeIcon type="iconArrowRight" className="text-surface-2-fg-default-idle text-2xl leading-none font-semibold" />
                </a>
              )}
            </div>
            <Swiper freeMode={true} spaceBetween={24} slidesPerView="auto" className="!-mx-5 mt-1.5 !px-5 [&_.swiper-slide]:w-36">
              {productData?.map((item, index) => {
                const global_vendor = item?.is_mkpl ? item?.vender_id : null
                return (
                  <SwiperSlide key={`filter-item-${index}`}>
                    <div onClick={() => clickTrack(item?.id)}>
                      <ViewportLoad initialLoad={index < 2}>
                        <ProductCard
                          showLoadingWhenJump={showLoadingWhenJump}
                          data={item}
                          customAddCartApi={customAddCartApi}
                          showSoldBy={isGroupOrder ? false : true}
                          addCartParams={{
                            ...addCartParams,
                            source: isGroupOrder ? 'app_product-recommend' : addCartParams?.source,
                            customReferType: isGroupOrder ? 'seller_group_order' : addCartParams?.referType,
                          }}
                          positionInfoT2={{
                            modSecPos: {
                              mod_nm: moduleName,
                              mod_pos:
                                {
                                  related: 5,
                                  buytogether: 6,
                                  exploremore: 8,
                                }[moduleName] || 7,
                            },
                            prodPos: index,
                            context: {
                              page_target: productId,
                              global_vendor,
                            },
                          }}
                          {...productCardParam}
                        />
                      </ViewportLoad>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      )}
    </>
  )
}

const ProductSections: FC<IProps> = ({ product }) => {
  const t = useTranslations('ProductCard')
  const [loaded, setLoaded] = useState<boolean>(false)
  const [moduleLoaded, setModulesLoaded] = useState<boolean>(false)
  const [vendorProducts, setVendorProducts] = useState<any[]>([])
  const [productModules, setProductModules] = useState<ObjectType[]>([])
  const moduleParamsMap = {
    related: {
      clickTrack: (id) => {
        // doSetReferrerType('similar');
      },
    },
    buytogether: {
      clickTrack: (id) => {
        // doSetReferrerType('related');
      },
    },
    exploremore: {
      clickTrack: (id) => {},
    },
  }

  const getModulesProduct = async () => {
    const requestHeader = {
      'b-cookie': getCookie('b_cookie') || '',
      Authorization: `Bearer ${getCookie('auth_token')}`,
      lang: getCookie('site_lang'),
      'weee-session-token': getCookie('weee_session_token') || '',
      'Content-Type': 'application/json',
    }
    const res = await callApi(`/ec/item/v2/items/${product?.id}/modules`, {
      method: 'GET',
      body: {
        limit: 10,
      },
      headers: requestHeader,
    })
    if (res) {
      console.log(res, 'r=============')
      setProductModules(res?.modules || [])
    }
    setModulesLoaded(true)
  }

  const getVendorSameProduct = async () => {
    const requestHeader = {
      'b-cookie': getCookie('b_cookie') || '',
      Authorization: `Bearer ${getCookie('auth_token')}`,
      lang: getCookie('site_lang'),
      'weee-session-token': getCookie('weee_session_token') || '',
    }
    const res = await callApi(`/ec/item/v1/recommend/vender`, {
      method: 'GET',
      body: {
        vender_id: product?.seller_id,
        filter_product_id: product?.id,
        limit: 10,
      },
      headers: requestHeader,
    })
    if (res.result) {
      setVendorProducts(res.object?.products || [])
    }
    setModulesLoaded(true)
  }

  useEffect(() => {
    if (product?.is_mkpl) {
      getVendorSameProduct()
    } else {
      getModulesProduct()
    }
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <>
        <SkeletonModule />
        <SkeletonModule />
      </>
    )
  }
  return (
    <>
      {!!productModules?.length &&
        productModules.map((module) => {
          const moduleParams = moduleParamsMap[module.module_key]
          return (
            <ProductSection
              key={module.module_key}
              moduleName={module.module_key}
              title={module.title}
              impressionType={module.module_key}
              productData={module.product_list || []}
              clickTrack={(id) => {
                moduleParams?.clickTrack?.(id)
              }}
              addCartParams={{
                source: `product-${module.module_key}`,
                referType: 'normal',
                // deliveryDate: getDeliveryDateFromCookie()
              }}
              productCardParam={{
                showFavorite: false,
                isInPDP: true,
                isRelated: true,
              }}
              productId={product?.id}
            />
          )
        })}
      {/* same vender */}
      <ProductSection
        moduleName="vendor"
        title={t('pdp_same_brand')}
        link={`/mkpl/vendor/${product?.vender_info_view?.vender_id}`}
        impressionType="same-vendor"
        productData={vendorProducts}
        clickTrack={(id) => {
          // doSetReferrerType('similar');
        }}
        addCartParams={{
          source: '',
          referType: '',
          referValue: `${product?.vender_info_view?.vender_id}`,
          // deliveryDate: getCookie('DELIVERY_DATE'),
        }}
        productId={product?.id}
      />
    </>
  )
}

export default ProductSections
