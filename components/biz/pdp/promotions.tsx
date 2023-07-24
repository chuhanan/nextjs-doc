import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

export default function PdpPromotions(props) {
  const t = useTranslations('Common')
  const { promotion } = props
  if (promotion?.length) {
    return (
      <div className="mt-2 mx-4 py-4 text-xs font-semibold border-surface-2-bg-idle border-solid border-b">
        {promotion?.map((item, index) => (
          <div
            className={twMerge(!!item?.limit_time && 'flex justify-between items-center')}
            style={{
              flexFlow: 'row nowrap',
            }}
            key={index}
          >
            <div className="w-full flex items-center">
              <div className="flex-1">
                {!!item?.promote_tip && (
                  <div className="flex items-center text-surface-1-fg-minor-idle">
                    <span className="mr-2 flex-none">{item?.limit_time ? `${t('exclusive_offer')}:` : t('bogo_promotion_label')}</span>
                    <span
                      style={{
                        color: item?.promote_tip_color,
                        border: `1px solid ${item?.promote_tip_color}`,
                      }}
                      className="px-2.5 leading-5 rounded-md bg-pricing-surface-2-bg-idle text-pricing-surface-2-fg-default-idle"
                      dangerouslySetInnerHTML={{ __html: item?.promote_tip }}
                    />
                  </div>
                )}
                {(item?.promote_title || item?.rule_desc) && (
                  <div className="mt-1">
                    <div className="mt-1 text-xs font-semibold" dangerouslySetInnerHTML={{ __html: item?.promote_title }} />
                    <div className="text-xs text-surface-1-fg-minor-idle break-words" dangerouslySetInnerHTML={{ __html: item?.rule_desc }} />
                  </div>
                )}
              </div>
              {!!item?.use_url && (
                <div
                  className="flex-none inline-flex items-center text-xs font-semibold text-primary-standalone-idle"
                  onClick={() => {
                    window.location.href = item?.use_url
                  }}
                >
                  <span className="text-surface-1-fg-default-idle enki-button-label-xs border border-solid border-surface-1-fg-hairline-idle px-5 py-2 rounded-full">
                    {item?.use_url_text}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
  return null
}
