import { cookies, headers } from 'next/headers'
import ClientChild from './_child'
import { callApi } from '~/utils/axios'
import { getCookie } from '~/utils/cookies'
import { PrefertchApiList } from '~/types/common'
import Layout from '~/components/layout/simple'
import Logo from '~/assets/images/weee-logo-black.svg'
import { Back } from '~/components/common/back'
import MiniCart from '~/components/common/mini-cart'
import Picture from '~/components/biz/pdp/picture'
import Img from '~/components/common/img'
import BodyTag from '~/components/biz/pdp/body-tag'
import VipFreeTrialBanner from '~/components/biz/pdp/vip-free-trial-banner'
import BodyVendorInfo from '~/components/biz/pdp/body-vendor-info'
import ActivityList from '~/components/biz/pdp/activity-list'
import ProductSectionsServer from '~/components/biz/pdp/product-sections-server'
import ReviewListServer from '~/components/biz/pdp/review-list-server'

interface IProductPageProps {
  params: {
    lang: string
    slug: string
    id: string
  }
  searchParams: Record<string, any>
}

export default async function MobileProductPage({ params, searchParams }: IProductPageProps) {
  const locale = params.lang === 'zht' ? 'zh-Hant' : params.lang
  const requestHeader = {
    'User-Agent': headers().get('user-agent'),
    Platform: headers().get('platform') || 'h5',
    'b-cookie': getCookie('b_cookie') || '',
    Authorization: `Bearer ${getCookie('auth_token')}`,
    lang: locale,
    'weee-session-token': getCookie('weee_session_token') || '',
    'Content-Type': 'application/json',
  }
  const salesOrgId = 1
  const [productDetail, seoInfo, postInfo] = await Promise.all([
    callApi('/ec/item/items/detail', {
      headers: requestHeader,
      method: 'GET',
      body: {
        product_id: params.id,
        sales_org_id: salesOrgId,
      },
    }),
    callApi('/ec/growth/seo/meta', {
      headers: requestHeader,
      method: 'GET',
      body: {
        segment1: 'product',
        segment2: 'view',
        product_id: params.id,
      },
    }),
    callApi('/ec/sns/review', {
      headers: requestHeader,
      method: 'GET',
      body: {
        product_id: params.id,
        limit: 6,
        page: 1,
      },
    }),
  ])
  // console.log(productDetail, 'productDetail')
  // console.log(seoInfo, 'seoInfo')
  // console.log(postInfo, 'postInfo')

  const header = (
    <div className="w-full h-full bg-surface-1-bg-idle flex items-center justify-between">
      <div className="flex h-full pl-3 items-center [&_img]:h-8" role="left">
        <Back />
      </div>
      <div className="flex flex-1 h-full whitespace-nowrap items-center" role="middle">
        <div className="w-full text-left flex items-center [&_img]:w-[72] [&_img]:h-4">
          <Img src={Logo} />
        </div>
      </div>
      <div className="flex flex-1 h-full justify-end items-center pr-4" role="right">
        <MiniCart />
      </div>
    </div>
  )

  return (
    <Layout header={header} prefetchApiList={[PrefertchApiList.CART]}>
      <Picture product={productDetail?.product} />
      <BodyTag product={productDetail?.product} />
      <VipFreeTrialBanner
        vipData={{
          vip_free_trial_banner: productDetail?.product?.vip_free_trial_banner,
          vip_free_trial_banner_link: productDetail?.product?.vip_free_trial_banner_link,
        }}
      />
      <BodyVendorInfo product={productDetail?.product} />
      <ActivityList activityData={productDetail?.activity_list} />
      {/* vip_free_trial_banner bannerCode() */}
      <ReviewListServer id={+params.id} post={postInfo} />
      <ProductSectionsServer product={productDetail?.product} />

      {productDetail?.product?.description_html && (
        <div className="px-4 py-3">
          <div dangerouslySetInnerHTML={{ __html: productDetail?.product?.description_html }}></div>
        </div>
      )}
      <div>mobile</div>
      <ClientChild />
    </Layout>
  )
}
