import { useCallback, useEffect, useState } from 'react'
import { ImgLoadStatus } from '../constants/constants'

export const useLoadImage = ({ src, onLoad, onError }) => {
  const [imgLoadStatus, setImgLoadStatus] = useState<ImgLoadStatus>()

  const handleImgLoad = (event) => {
    setImgLoadStatus(ImgLoadStatus.loaded)
    onLoad?.(event)
  }

  const handleImgLoadError = (event) => {
    setImgLoadStatus(ImgLoadStatus.loadError)
    onError?.(event)
  }

  useEffect(() => {
    if (!src) return
    const img = new Image()
    img.addEventListener('load', handleImgLoad)
    img.addEventListener('error', handleImgLoadError)
    img.src = src
    setImgLoadStatus(ImgLoadStatus.loading)

    return () => {
      img.removeEventListener('load', handleImgLoad)
      img.removeEventListener('error', handleImgLoadError)
    }
  }, [])
  return {
    loadStatus: imgLoadStatus,
  }
}
