const CardBodyTopTag: React.FC<Partial<any>> = (props) => {
  const { data } = props
  // const { t } = useTranslation('common');
  //展示判断和产品名称相关
  // const show = showTagOnTopOfTheProductName(data);
  // if (!show) return null;
  return (
    <div className="mb-0.5">
      {data?.is_hotdish === 'Y' && <div className="text-primary-surface-1-bg-idle text-[12px]">Hot dish</div>}
      {/* {data?.category === 'bundle' && <div>{t('card_bundle_tag')}</div>} */}
      {data?.is_mkpl && data?.brand_name && <div className="text-[#999] text-[11px] line-clamp-1">{data?.brand_name}</div>}
      {!!data?.sponsored_text && <div className="text-[#999] text-[11px] line-clamp-1">{data.sponsored_text}</div>}
    </div>
  )
}

export default CardBodyTopTag
