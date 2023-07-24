import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const ProductCardLightingLine = props => {
  const { t } = useTranslation('common');
  const { data } = props;
  if (data?.status === 'begoing') {
    return null;
  }
  return (
    <div className="mt-1 px-2" role="claimed">
      <div className="h-2 w-full rounded mb-[6px] bg-surface-2-bg-idle" role="proBg">
        <div className="h-2 rounded bg-pricing-surface-1-bg-idle" style={{ width: `${data?.progress || 0}%` }} />
      </div>
      <div className="text-pricing-standalone-idle enki-utility-xs">
        {t('claimed', { progress: data?.progress || 0 })}
      </div>
    </div>
  );
};

export default React.memo(ProductCardLightingLine);
