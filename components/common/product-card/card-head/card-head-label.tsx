// import Favorite from '../favorite';
import { twMerge } from 'tailwind-merge'
// import useClickActionT2 from '@/tracks/useClickActionT2';

const CardHeadLabel: React.FC<
  Partial<
    any & {
      labelNode?: React.ReactNode | (() => React.ReactNode)
    }
  >
> = (props) => {
  const { data, showLabel = true, showFavorite = true, preSell, trackDataInDialog, positionInfoT2, supportPurchaseStatusNotify } = props
  // const { t } = useTranslation('common');
  // const { saveClick } = useClickActionT2();

  const renderLabelList = () => {
    let labelList = data?.label_list?.length > 0 ? [data.label_list[0]] : []
    if (!!labelList?.length && labelList?.[0]?.label_key === 'off') {
      labelList = data?.label_list?.filter((item) => {
        return item.label_key === 'off'
      })
    }
    //预售
    if (preSell) {
      labelList = [
        {
          label_color: '#820b6a',
          label_name: 'pre sell',
          label_position: 'title',
        },
      ]
    }
    return (
      <div>
        {labelList?.map((label, i) => (
          <span
            className={twMerge(
              'flex justify-center items-center border-[2px] border-solid border-white h-[22px] px-1.5 rounded-full box-border text-pricing-surface-1-fg-default-idle enki-system-xs',
              label.label_position === 'price_invalid' && 'text-[#333] line-through mt-0.5',
            )}
            key={`label-${i}`}
            style={{ background: label?.label_color }}
          >
            {label?.label_name}
          </span>
        ))}
      </div>
    )
  }

  const renderHeadNode = () => {
    const _labelNode = typeof props.labelNode === 'function' ? props.labelNode() : props.labelNode
    if (_labelNode) {
      return _labelNode
    }
    return (
      <div className="box-border absolute left-0 top-2 justify-between items-center w-full px-2 py-0 z-[1] flex">
        {showLabel && renderLabelList()}

        {/* {showFavorite &&
          data?.category !== 'bundle' &&
          data?.is_hotdish !== 'Y' &&
          data?.sold_status &&
          data?.sold_status !== StatusEnum.sold_out && (
            <Favorite
              id={data?.product_id || data?.id}
              supportPurchaseStatusNotify={supportPurchaseStatusNotify}
              onClick={targetCollect => {
                saveClick(
                  Object.assign(trackDataInDialog || {}, {
                    ...(positionInfoT2?.modSecPos || {}),
                    co: {
                      target_pos: positionInfoT2?.prodPos,
                      target_nm: data?.id || data?.product_id,
                      is_mkpl: data?.is_mkpl
                    },
                    ctx: positionInfoT2?.context
                  }),
                  targetCollect
                );
              }}
            />
          )} */}
      </div>
    )
  }

  return renderHeadNode()
}

export default CardHeadLabel
