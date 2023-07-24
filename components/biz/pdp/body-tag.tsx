import { useTranslations } from 'next-intl'
import FreshnessGuarantee from '~/components/common/freshness-guarantee'
import VIPrice from '~/components/common/vip-price'
import { wrapCurrency } from '~/utils/price'

export default function BodyTag(props) {
  const { product, remainCount } = props
  const t = useTranslations('Common')
  const titleTags = product?.label_list?.filter((item) => item.label_position === 'title')
  const priceTags = product?.label_list?.filter((item) => item.label_position === 'price')
  const invalidPriceTags = product?.label_list?.filter((item) => item.label_position === 'price_invalid')

  return (
    <div className="bg-surface-1-bg-idle pt-0 pb-5 min-h-20 min-h-[100px] mx-5 border-surface-2-bg-idle border-solid border-b">
      <div className="flex justify-between items-start">
        <div className="flex-[1]">
          <h1 className="m-0 text-surface-1-fg-default-idle enki-display-lg !leading-[31px]">
            {titleTags?.map((item, index) => {
              return (
                <span
                  className="enki-utility-sm-subdued text-center align-[4px] text-pricing-surface-1-fg-default-idle mr-1 px-1.5 h-5 rounded-full inline-flex items-center"
                  style={{ backgroundColor: item?.label_color, color: item?.label_font_color }}
                  key={`title-tag-${index}`}
                >
                  {item?.label_name}
                </span>
              )
            })}
            {product?.name}
          </h1>
          <p className="text-surface-1-fg-minor-idle mt-1 enki-utility-sm-subdued">{product?.sub_name}</p>
        </div>
      </div>
      {!!product?.last_week_sold_count_ui && product?.last_week_sold_count_ui !== '0' && (
        <div className="mt-1 text-surface-1-fg-minor-idle enki-utility-sm">
          <span className="inline-block">{t('weekly_sold', { soldCount: product?.last_week_sold_count_ui })}</span>
        </div>
      )}
      {product?.policy_show && product?.policy_pop_config_key && product?.policy_title && (
        <FreshnessGuarantee title={product?.policy_title} configKey={product?.policy_pop_config_key} />
      )}
      <div className="flex justify-between items-start mt-2">
        <div>
          <h1 className="flex justify-start items-center text-pricing-standalone-idle enki-numeral-lg m-0">
            {product?.price && <>${`${wrapCurrency(product.price)}`}</>}
            {priceTags?.map((item, index) => {
              return (
                <div
                  className="ml-1.5 py-1 px-2.5 rounded-full text-surface-1-bg-idle enki-badge-label-sm inline-block"
                  key={`price-tag-${index}`}
                  style={{ backgroundColor: item.label_color }}
                >
                  {item.label_name}
                </div>
              )
            })}

            {!!invalidPriceTags?.length &&
              invalidPriceTags?.map((item, index) => {
                return (
                  <div
                    key={`price-tag-${index}`}
                    className="ml-1.5 py-1 px-2.5 rounded-full enki-badge-label-sm inline-block text-surface-2-fg-default-idle line-through"
                    style={{ backgroundColor: item.label_color }}
                  >
                    {item.label_name}
                  </div>
                )
              })}

            {/* {!!product?.special_price_today && !!Object.keys(product?.special_price_today) && (
                <LoyaltyIconWithModal className="p-0 ml-1" messageType={'lightning'} showLevelIcon={false} />
              )} */}
          </h1>
          {!!(product?.feature & 2) && !!product?.base_price && (
            <p className="enki-numeral-sm text-surface-1-fg-minor-idle line-through mt-2">${`${wrapCurrency(product.base_price)}`}</p>
          )}
          {!!(product?.feature & 4) && <VIPrice price={wrapCurrency(product?.member_price)} size="small" />}
          {!!product?.price_tip && <i className="text-surface-1-fg-minor-idle text-base font-semibold">{product?.price_tip}</i>}
        </div>
        <div className="text-base">{product?.unit_info_content ? `(${product?.unit_info_content})` : ''}</div>
      </div>

      {product?.min_order_quantity > 1 && (
        <div className="mt-1 text-sm text-surface-1-fg-minor-idle">
          {t('product_view_min_quantity', {
            num: product?.min_order_quantity,
            price: wrapCurrency(Number(product?.price) * product?.min_order_quantity),
          })}
        </div>
      )}
      {!!remainCount && <div className="text-sm font-semibold mt-0.5 text-pricing-standalone-idle">{t('order_soon', { quantity: remainCount })}</div>}
      {/* {!!product?.is_alcohol && <AlcoholFAQ />} */}
      {/* {product?.item_type === CartType.alcohol && !product?.vip_free_trial_banner && <AlcoholFAQ />} */}

      {/* {product?.is_colding_package && <ColdPack inPdp showSkeleton />} */}
    </div>
  )
}
