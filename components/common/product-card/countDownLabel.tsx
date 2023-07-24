import useCountdown from '@/hooks/useCountDown';
import useTranslation from 'next-translate/useTranslation';

const CountDownLabel: React.FC<{
  start?: number | string;
  end?: number | string;
  status: 'begoing' | 'ongoing';
}> = props => {
  const { t } = useTranslation('home');
  const { timeString } = useCountdown(() => props.end as number, {
    start: () => props.start as number,
    onEnd: () => {
      window.location.reload();
    }
  });
  if (timeString) {
    if (props.status === 'ongoing') {
      return (
        <div className="absolute top-0 left-0 h-5 leading-5 rounded-full flex items-center border-2 border-white bg-pricing-surface-1-bg-idle px-2 py-0 enki-badge-label-base text-pricing-surface-1-fg-default-idle">
          {timeString}
        </div>
      );
    }
    if (props.status === 'begoing') {
      return (
        <div className="rounded-lg flex items-center px-2 py-0 mt-1.5 enki-utility-xs text-highlight-standalone-idle">
          {t('begins_in', { timeString: timeString })}
        </div>
      );
    }
  }
  return null;
};

export default CountDownLabel;
