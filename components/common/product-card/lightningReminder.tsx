import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';

import { setLightningRemind } from '@/api/mkt';
import Toast, { removeNotify, showNotify } from '@/components/common/Toast';
import { getLoginState } from '@/utils/common/user';
import { WeeeIcon } from '@/components/common/Icon';
import NotifyAdd from './notify-add';

type ReminderProp = Partial<{
  id?: number;
  isReminded?: boolean;
  className?: string;
  render;
}>;

function getSubStr(str: string) {
  if (str?.length >= 15) {
    let subStr1 = str.substr(0, 6);
    let subStr2 = str.substr(str.length - 5, 5);
    let subStr = subStr1 + '...' + subStr2;
    return subStr;
  }
  return str;
}

const Reminder = ({ id, isReminded, className }: ReminderProp) => {
  const { t, lang } = useTranslation('common');
  const [reminded, setReminded] = useState<boolean>(isReminded || false);
  const toggleCollect = (isCancel: boolean, newRemind?: boolean) => {
    const status = newRemind !== undefined ? newRemind : reminded;
    setLightningRemind({
      product_id: id,
      status: status ? 'X' : 'A'
    })
      .then(res => {
        if (res?.result) {
          setReminded(!status);

          if (isCancel) {
            return removeNotify();
          }
          if (!status) {
            showNotify(
              <NotifyAdd
                getLangMsg={() => t('has_add_notify_after_3_min')}
                getBtn={() => t('notify_cancel')}
                onCancel={() => toggleCollect(true, !reminded)}
              />,
              4000
            );
          }
        } else {
          Toast.info(res?.message);
        }
      })
      .catch(e => {
        Toast.info(e?.message);
      });
  };

  useEffect(() => {
    setReminded(isReminded);
  }, [isReminded]);

  const node = (
    <div
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        if (!getLoginState()) {
          window.location.href = `/${lang}/account/login?redirect_url=${encodeURIComponent(window.location.href)}`;
          return;
        }
        toggleCollect(false);
      }}
      className={classNames(
        'absolute bottom-2 right-2 px-[10px] py-[5px] flex items-center justify-center w-fit text-surface-1-fg-default-idle enki-button-label-xs cursor-pointer',
        { 'border border-solid border-[#0a72ba]': reminded }
      )}
      role="remind-btn">
      {reminded ? getSubStr(t('lightning_reminded')) : t('lightning_remind')}
    </div>
  );

  const defaultNode = (
    <button
      // inline={true}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        if (!getLoginState()) {
          window.location.href = `/${lang}/account/login?redirect_url=${encodeURIComponent(window.location.href)}`;
          return;
        }
        toggleCollect(false);
      }}
      data-role="remind-btn"
      className={classNames(
        'product-card-btn-shadow py-[5px] pl-[5px] pr-2.5 bg-white rounded-[21px] absolute right-0 bottom-0',
        className
      )}>
      {reminded ? (
        <span className="text-highlight-standalone-idle font-medium flex items-center justify-center leading-[14px]">
          <WeeeIcon style={{ fontSize: 12 }} className="mr-[5px] relative top-[1px]" type="iconcheck-thin" />
          {getSubStr(t('lightning_reminded'))}
        </span>
      ) : (
        <span className="text-[#111] font-medium flex items-center justify-center leading-[14px]">
          <WeeeIcon className="mr-[5px]" style={{ fontSize: 14 }} type="iconclock" />
          {t('lightning_remind')}
        </span>
      )}
    </button>
  );
  return defaultNode;
};

const LightningReminder = props => {
  const { t, lang } = useTranslation('common');
  const { data, className } = props;

  return <Reminder id={data?.id} className={className} isReminded={data?.remind_set} />;
};

export default React.memo(LightningReminder);
