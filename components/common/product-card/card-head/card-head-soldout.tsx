import { twMerge } from 'tailwind-merge'

const CardHeadSoldOut: React.FC<Partial<any>> = (props) => {
  const { data, className, cardType } = props

  return (
    data?.sold_status === 'sold_out' && (
      <div
        className={twMerge(
          'top-0 left-0 absolute bottom-0 right-0 rounded text-center enki-utility-lg-subdued z-[1] leading-5 bg-[#333] bg-opacity-50 flex flex-col justify-center items-center text-white',
          className,
        )}
        role="soldout"
      >
        <div>sold out</div>
        {
          /* 横向的卡片展示在加购按钮上面 tooltip */
          cardType === 'vertical' && <div className="mt-1">{data?.restock_tip}</div>
        }
      </div>
    )
  )
}

export default CardHeadSoldOut
