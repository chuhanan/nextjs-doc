'use client'
import { twMerge } from 'tailwind-merge'
import { Swiper, SwiperSlide } from 'swiper/react'
import Img from '~/components/common/img'
import { ViewportLoad } from '~/components/common/lazyload-viewport'

interface IProps {
  className?: string
  imageUrls: any
}

export default function Picture(props: IProps) {
  const { className, imageUrls } = props
  return (
    <Swiper
      className={twMerge(
        '[&_.swiper-pagination-bullet]:!bg-surface-1-fg-minor-idle [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet-active]:!bg-surface-1-fg-default-idle',
        className,
      )}
      initialSlide={0}
      loopedSlides={imageUrls.length ?? 1}
      // onSwiper={current => (imageRef.current = current)}
      // onSlidePrevTransitionEnd={onSwiperChange}
      // onSlideNextTransitionEnd={onSwiperChange}
      pagination={imageUrls.length > 1}
      slidesPerView="auto"
    >
      {imageUrls?.map((item, index) => {
        return (
          <SwiperSlide key={`filter-item-${index}`}>
            <ViewportLoad initialLoad={index < 1} className="w-screen h-[100vw] max-w-[750px] max-h-[750px] bg-surface-1-bg-hover text-center">
              <Img alt="Weee! - Groceries Delivered" className={twMerge('block w-screen h-[100vw] max-w-[750px] max-h-[750px]')} src={item.url} />
            </ViewportLoad>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
