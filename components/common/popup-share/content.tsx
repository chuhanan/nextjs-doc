'use client'
import Popup from '~/components/common/popup'

export default function PopupShare(props: { visible: boolean; hide: () => void }) {
  return (
    <Popup
      closable={true}
      wrapperClassName="rounded-t-3 w-full text-[#111]"
      headerClassName="h-[60px] p-0"
      title="Share"
      animationType="slide-up"
      position={'bottom'}
      show={props?.visible}
      onClose={props?.hide}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">Share</div>
        <div className="text-2xl font-bold">Share</div>
        <div className="text-2xl font-bold">Share</div>
        <button type="button" className="mx-auto">
          ok
        </button>
      </div>
    </Popup>
  )
}
