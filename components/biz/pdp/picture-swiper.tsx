'use client'
import { twMerge } from 'tailwind-merge'
import { Swiper, SwiperSlide } from 'swiper/react'

interface IProps {
  className?: string
  product: any
}

export default function Picture(props: IProps) {
  const { className, product } = props
  if (!product) {
    return null
  }
  return (
    <Swiper
      className={twMerge(
        '[&_.swiper-pagination-bullet]:!bg-surface-1-fg-minor-idle [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet-active]:!bg-surface-1-fg-default-idle',
        className,
      )}
      initialSlide={0}
      key={`swiper-${product?.id}`}
      loopedSlides={product?.media_urls?.length ?? 1}
      // onSwiper={current => (imageRef.current = current)}
      // onSlidePrevTransitionEnd={onSwiperChange}
      // onSlideNextTransitionEnd={onSwiperChange}
      pagination={product?.media_urls?.length > 1}
      slidesPerView="auto"
    >
      {product?.media_urls?.map((item, index) => {
        ;<SwiperSlide key={`filter-item-${index}`}>
          <img alt="Weee! - Groceries Delivered" className={twMerge('block w-screen h-[100vw] max-w-[750px] max-h-[750px]')} src={item.url} />
        </SwiperSlide>
      })}
    </Swiper>
  )
}
