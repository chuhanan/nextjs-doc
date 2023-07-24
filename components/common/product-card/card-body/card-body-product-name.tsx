// import ColdPack from '@/components/common/ColdPack';
// import pantryIcon from '@/components/pantry/PantryBtn/images/pantry_enki.png';
import { twMerge } from 'tailwind-merge'
// import useTranslation from 'next-translate/useTranslation';
// import { showTagOnTopOfTheProductName } from '@/utils/common/product-card';

const CardBodyProductName = (props: Partial<any>) => {
  const { data, className, cardType = 'vertical', fullProductName = false } = props
  // const { lang } = useTranslation('product-card');

  const show3Lines = () => {
    // if (cardType === 'vertical' && ['en', 'es', 'vi'].includes(lang) && !showTagOnTopOfTheProductName(data)) {
    //   return true;
    // }
    return false
  }

  return (
    <div className={className}>
      <div
        role="product-title"
        className={twMerge(
          'enki-card-label-base-subdued text-surface-1-fg-default-idle break-words',
          show3Lines() && !fullProductName && 'line-clamp-3',
          fullProductName ? '' : 'line-clamp-2',
        )}
      >
        {/* {data?.is_pantry && (
          <img
            className="image-render align-bottom mb-0.5 mr-1 w-auto break-words h-4 inline-block"
            alt="Weee! - Groceries Delivered"
            src={pantryIcon}
          />
        )} */}
        {!data?.is_mkpl && !data?.is_pantry && !!data?.is_colding_package && <div className="inline-block mr-1 mb-0.5">{/* <ColdPack /> */}</div>}
        {data?.name}
      </div>
    </div>
  )
}

export default CardBodyProductName
