import { WeeeIcon } from '~/components/common/icon'
// import useCountdown from '@/hooks/count-down';
import { twMerge } from 'tailwind-merge'

type Props = {
  product: any
}

export default function LightningDeal({ product }: Props) {
  const special = product?.special_price_today ?? {}
  const status: number = +special?.status || 0
  // const { t } = useTranslation('common');

  // const Countdown = () => {
  //   if (status === 2) return <></>;
  //   const targetTime = status === 0 ? special?.start_time : special?.end_time;
  //   const { time } = useCountdown({
  //     current: special?.current_timestamp,
  //     time: targetTime
  //   });
  //   return (
  //     <>
  //       {time.split('').map((item, index) => (
  //         <span
  //           key={index}
  //           className={twMerge(
  //             'font-semibold',
  //             item !== ':' ? 'bg-surface-1-bg-idle rounded-[2px] mx-[1px] px-[1px]' : '!text-surface-1-bg-idle'
  //           )}>
  //           {item}
  //         </span>
  //       ))}
  //     </>
  //   );
  // };

  const lightningDealsContent = (showSold = true) => {
    return (
      <div className="flex items-center">
        <WeeeIcon className="mr-2" style={{ fontSize: 20 }} type="iconweee-rewards-logo1" />
        <span>
          {/* {t('lightning_deals')}
          {showSold && <span className="block enki-utility-sm">{t('lightning_deals_sold', { progress: special?.progress })}</span>} */}
        </span>
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        'flex justify-between items-center text-surface-1-bg-idle',
        status === 0 && 'bg-decorative_5-surface-1-bg-idle',
        status === 1 && 'bg-surface-2-fg-hairline-idle',
        status === 2 && 'bg-pricing-standalone-idle',
      )}
    >
      {
        [
          <div
            className="w-full h-12 flex items-center justify-between text-surface-1-bg-idle px-4 bg-decorative_5-surface-1-bg-idle"
            key={`status-${status}`}
          >
            {lightningDealsContent(false)}
            <span className="[&_span]:text-decorative_5-surface-1-bg-idle">
              {/* {t('begin_in')} */}开始:
              {/* <Countdown /> */}
            </span>
          </div>,
          <div
            className="w-full h-12 flex items-center justify-between text-surface-1-bg-idle px-4 bg-pricing-standalone-idle"
            key={`status-${status}`}
          >
            {lightningDealsContent()}
            <span className="[&_span]:text-pricing-standalone-idle">
              {/* {t('end_in')} */}结束
              {/* <Countdown /> */}
            </span>
          </div>,
          <div
            className="w-full h-12 flex items-center  text-surface-1-bg-idle px-4 bg-surface-2-fg-hairline-idle justify-start"
            key={`status-${status}`}
          >
            {lightningDealsContent()}
          </div>,
        ][status]
      }
    </div>
  )
}
