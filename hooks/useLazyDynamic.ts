import { useState } from 'react'

type Props = {
  visible?: boolean
  loaded?: boolean
  onVisibleChange?: (visible: boolean) => void
}

const useLazy = (props?: Props) => {
  const { visible: vis = false, onVisibleChange } = props || {}
  const [visible, setVisible] = useState<boolean>(vis)
  const [loaded, setLoaded] = useState<boolean>(props?.loaded || false)
  const isRobot = () => false

  const show = (e?) => {
    if (isRobot()) {
      setVisible(false)
      return
    }
    e?.stopPropagation()
    e?.preventDefault()
    setLoaded(true)
    setVisible(true)
    onVisibleChange?.(true)
  }
  const hide = (e?) => {
    e?.stopPropagation()
    setVisible(false)
    onVisibleChange?.(false)
  }

  return {
    show,
    hide,
    visible,
    loaded,
  }
}

export default useLazy
