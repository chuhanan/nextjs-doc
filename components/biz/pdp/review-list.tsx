'use client'
import { FC, useState } from 'react'
import Link from 'next/link'
import { WeeeIcon } from '~/components/common/icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import coinImg from '~/assets/images/coin1.svg'
import ReviewCard from '~/components/common/review-card'
import { useTranslations } from 'next-intl'
import Img from '~/components/common/img'
type IProps = {
  product: any
  id: number
  post: ObjectType
}
const ReviewList: FC<IProps> = ({ product, post, id }) => {
  const t = useTranslations('ReviewList')

  //landing 状态和正常装填下列表的位置有所不同, 提取成方法公用
  let name = (product?.name?.replace(product?.unit_info || '', '') || '').trim()
  if ((post?.list?.length || 0) === 0 && !post?.show_entrance) return null

  return (
    <div className="mx-5 pb-5 [&_.swiper-container]:-mr-5 border-b border-solid border-surface-2-bg-idle">
      <div>
        <div className="text-surface-1-fg-default-idle flex justify-between pt-5 pb-3">
          <section className="flex-1 flex items-center">
            <h2 className="flex items-center enki-heading-lg">
              {t('account_reviews')}
              {post?.total > 0 && <span className="text-surface-1-fg-minor-idle enki-body-base ml-1">({post?.total})</span>}
            </h2>
          </section>
          {post?.show_entrance ? (
            <div></div>
          ) : (
            post?.total > 5 && (
              <Link
                href={`/review/more/${id}`}
                className="text-surface-1-fg-default-idle enki-button-label-xs border border-solid border-surface-1-fg-hairline-idle px-4 py-2 rounded-full enki-utility-sm"
              >
                <span>{t('more')}</span>
              </Link>
            )
          )}
        </div>
        {!!post.tip && (
          <div className="flex items-center">
            <Img className="w-5 h-5 mr-2 ml-0.5" src={coinImg} alt="coins" />
            <div
              className="flex-1 text-sm leading-4 text-surface-1-fg-default-idle enki-utility-base-subdued"
              dangerouslySetInnerHTML={{ __html: post.tip }}
            ></div>
          </div>
        )}
        {post?.list?.length > 0 && (
          <Swiper
            freeMode={true}
            spaceBetween={12}
            slidesPerView="auto"
            className="[&_.swiper-slide]:w-auto [&_.swiper-wrapper]:flex [&_.swiper-wrapper]:items-center !-mx-5 !px-5"
          >
            {post.list.slice(0, 5).map((item: { id: any; url: any }, i: number) => {
              return (
                <SwiperSlide key={`filter-item-${i}`} className="mr-3">
                  <div>
                    <ReviewCard initialLoad={i < 2} moreLink={`/social/review/${item?.id}`} data={item} needsRefresh={true} />
                  </div>
                </SwiperSlide>
              )
            })}
            {post.list.length > 5 && (
              <SwiperSlide
                key={`filter-item-right-arrow`}
                onClick={() => {
                  // commonClick({
                  //   mod_nm: PdpMod.review,
                  //   mod_pos: 3,
                  //   co: {
                  //     target_nm: 'explore_more',
                  //     target_pos: 5
                  //   }
                  // });
                }}
              >
                <Link prefetch={false} href={`/review/more/${id}`}>
                  <WeeeIcon className="p-2 text-2xl rounded-full text-primary-standalone-idle bg-surface-2-bg-idle" type="iconrightarrow" />
                </Link>
              </SwiperSlide>
            )}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default ReviewList
