'use client'
import { forwardRef, useImperativeHandle, useState } from 'react'
import useLazy from '~/hooks/useLazyDynamic'
import dynamic from 'next/dynamic'
import { WeeeIcon } from '../icon'

const PopupShareContent = dynamic(() => import('./content'), { ssr: false })

const PopupShare = forwardRef((props: {}, ref) => {
  const { visible, show, hide, loaded } = useLazy()

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    }
  })

  return (
    <>
      {loaded && <PopupShareContent {...props} visible={visible} hide={hide} />}
      <WeeeIcon onClick={show} type="icona-share-ios1" className="text-surface-1-fg-default-idle ml-3" style={{ fontSize: 19 }} />
    </>
  )
})

export default PopupShare
