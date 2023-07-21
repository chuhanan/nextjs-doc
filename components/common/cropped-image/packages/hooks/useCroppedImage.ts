import { useCallback, useRef } from 'react'
import { ESTypes, FORMAT_MAP } from '../constants/constants'
import ImageStandards from '../constants/imageStandards'
import { getCroppedImageUrl, GetCroppedImageUrl } from '../utils/getCroppedImageUrl'
import { prototypeToString } from '../utils/tools'
import { useHasMounted } from './useHasMounted'

type UseCroppedImageParams = {
  placeholder?: string
}
type UseCroppedImage = (params?: UseCroppedImageParams) => {
  getCroppedImageUrl: GetCroppedImageUrl
}

const generateKey = (data) => {
  try {
    return JSON.stringify(data)
  } catch (error) {
    return null
  }
}

export const useCroppedImage: UseCroppedImage = (params) => {
  const { placeholder } = params ?? {}
  const imgUrlMapRef = useRef<Record<string, string>>({})
  const { hasMounted } = useHasMounted()

  const getConfig = useCallback((configs) => {
    if (typeof configs === 'string') {
      return ImageStandards[configs] ?? {}
    } else {
      return configs ?? {}
    }
  }, [])

  const getImageUrl: GetCroppedImageUrl = useCallback(
    (originUrl, configs, options) => {
      const config = getConfig(configs)
      const cacheKey = generateKey({ originUrl, config, options })
      const _options = prototypeToString(options) === ESTypes.string ? { reqHeaderAccept: options as string } : options
      if (cacheKey && imgUrlMapRef.current[cacheKey]) return imgUrlMapRef.current[cacheKey]
      const _imgUrl = getCroppedImageUrl(originUrl, config, options)
      if ((config.format && config.format !== FORMAT_MAP.AUTO) || _options?.reqHeaderAccept) {
        imgUrlMapRef.current[cacheKey] = _imgUrl
        return _imgUrl
      }
      if (hasMounted) {
        imgUrlMapRef.current[cacheKey] = _imgUrl
        return _imgUrl
      }
      return placeholder ?? ''
    },
    [hasMounted],
  )

  return {
    getCroppedImageUrl: getImageUrl,
  }
}
