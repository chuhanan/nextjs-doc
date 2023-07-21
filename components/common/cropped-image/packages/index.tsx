import {
  Children,
  cloneElement,
  CSSProperties,
  FC,
  memo,
  PropsWithChildren,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Lazyload } from '../packages/lazy-load'
import { ESTypes, FORMAT_MAP, ImgLoadStatus, TYPE_UNDEFINED } from './constants/constants'
import ImageStandards from './constants/imageStandards'
import { useHasMounted } from './hooks/useHasMounted'
import { getCroppedImageUrl } from './utils/getCroppedImageUrl'
import styles from './index.module.css'
import { useLoadImage } from './hooks/useLoadImage'
import { prototypeToString } from './utils/tools'
import { twMerge } from 'tailwind-merge'

interface Props {
  type?: 'img' | 'bg'
  width?: number
  height?: number
  className?: string
  wrapperClassName?: string
  style?: CSSProperties
  url: string
  configs?: string
  alt?: string
  lazyLoad?: any | boolean
  placeholder?: ReactElement | boolean
  errorPlaceholder?: ReactElement | boolean
  placeholderClassName?: string
  placeholderStyle?: CSSProperties
  options?: any | string
  onLoad?: (event: SyntheticEvent) => void
  onError?: (event: SyntheticEvent) => void
  needsRefresh?: boolean
}

type LazyLoadWrapperProps = Pick<Props, 'lazyLoad' | 'placeholder' | 'errorPlaceholder' | 'placeholderClassName' | 'placeholderStyle'> & {
  style?: CSSProperties
  className?: string
  imgLoadStatus: ImgLoadStatus
}

type ImageCompProps = Pick<Props, 'width' | 'height' | 'className' | 'alt' | 'style' | 'onLoad' | 'onError'> & {
  url: string
  urlSet: string | string[]
}

const DefaultLazyLoadConfigs = {
  once: true,
  offset: 100,
}

const LazyLoadWrapper: FC<PropsWithChildren<LazyLoadWrapperProps>> = (props) => {
  const { children, style, className, imgLoadStatus, placeholderStyle, placeholderClassName } = props
  let { lazyLoad, placeholder = null, errorPlaceholder = placeholder } = props

  const isAlive = useMemo(() => {
    return imgLoadStatus === ImgLoadStatus.loaded
  }, [imgLoadStatus])

  const childElement = Children.toArray(children)[0] as ReactElement

  const renderChildren = useCallback(() => {
    return (
      <>
        {cloneElement(childElement, {
          className: twMerge(childElement.props.className, !!placeholder && !isAlive && styles.imgIsLoading),
        })}
        {!!placeholder && !isAlive && <>{imgLoadStatus === ImgLoadStatus.loadError ? errorPlaceholder : placeholder}</>}
      </>
    )
  }, [imgLoadStatus, isAlive, errorPlaceholder, placeholder, childElement])

  if (!lazyLoad) {
    return (
      <div style={style} className={className}>
        {renderChildren()}
      </div>
    )
  }

  if (lazyLoad === true) lazyLoad = DefaultLazyLoadConfigs
  return (
    <Lazyload {...lazyLoad} style={style} className={className}>
      {renderChildren()}
    </Lazyload>
  )
}

const ImageComp: FC<ImageCompProps> = ({ url, urlSet, width, height, className, alt, style, onLoad, onError }) => {
  const handleImgLoad = useCallback(
    (event: SyntheticEvent) => {
      onLoad?.(event)
    },
    [onLoad],
  )

  const handleImgLoadError = useCallback(
    (event: SyntheticEvent) => {
      onError?.(event)
    },
    [onError],
  )

  return (
    <img
      src={url}
      srcSet={urlSet as string}
      width={width}
      height={height}
      className={twMerge(styles.croppedImage, className)}
      style={{ visibility: url ? 'visible' : 'hidden', ...style }}
      alt={alt}
      onLoad={handleImgLoad}
      onError={handleImgLoadError}
    />
  )
}

const BgImageComp: FC<ImageCompProps> = ({ url, urlSet, width, height, className, style, onLoad, onError }) => {
  const _url = useMemo(() => {
    if (typeof window === TYPE_UNDEFINED) return undefined
    const _index = window.devicePixelRatio - 1 ?? 1
    return urlSet?.[_index]
  }, [urlSet])

  useLoadImage({ src: _url, onLoad, onError })

  return (
    <>
      <style jsx>{`
        div {
          background-image: url(${url});
        }
        @media only screen and (-webkit-min-device-pixel-ratio: 1), only screen and (min-resolution: 1dppx) {
          div {
            background-image: url(${urlSet[0]});
          }
        }

        @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-resolution: 2dppx) {
          div {
            background-image: url(${urlSet[1]});
          }
        }

        @media only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (min-resolution: 3dppx) {
          div {
            background-image: url(${urlSet[2]});
          }
        }
        div {
          background-image: image-set(url(${urlSet[0]}) 1x, url(${urlSet[1]}) 2x, url(${urlSet[2]}) 3x);
        }
      `}</style>
      <div style={{ ...style, width, height }} className={twMerge(styles.croppedImageBg, className)}></div>
    </>
  )
}

const CroppedImage: FC<Props> = (props) => {
  const {
    type = 'bg',
    url,
    className,
    wrapperClassName,
    configs,
    style,
    width,
    height,
    alt,
    lazyLoad = DefaultLazyLoadConfigs,
    placeholder,
    errorPlaceholder,
    placeholderClassName,
    placeholderStyle,
    options,
    onLoad,
    onError,
    needsRefresh = false,
  } = props

  const { hasMounted } = useHasMounted()
  const imgUrlRef = useRef<string>()
  const imgUrlSetRef = useRef<string[]>()
  const [imgLoadStatus, setImgLoadStatus] = useState<ImgLoadStatus>()

  const config = useMemo(() => {
    if (typeof configs === 'string') {
      return ImageStandards[configs] ?? {}
    } else {
      return configs ?? {}
    }
  }, [configs])

  const _options = useMemo(() => {
    return prototypeToString(options) === ESTypes.string ? { reqHeaderAccept: options as string } : (options as any)
  }, [options])

  const imgUrl = useMemo(() => {
    if (!needsRefresh && imgUrlRef.current) return imgUrlRef.current
    const _imgUrl = getCroppedImageUrl(url, { ...config, devicePixelRatio: 2 }, options)
    if ((config.format && config.format !== FORMAT_MAP.AUTO) || _options?.reqHeaderAccept) {
      imgUrlRef.current = _imgUrl
      return _imgUrl
    }
    if (hasMounted) {
      imgUrlRef.current = _imgUrl
      return _imgUrl
    }
    return ''
  }, [config, hasMounted, options, url, needsRefresh])

  const imgUrlSet = useMemo(() => {
    if (!needsRefresh && imgUrlSetRef.current) return imgUrlSetRef.current
    const url_1x = getCroppedImageUrl(url, { ...config, devicePixelRatio: 1 }, options)
    const url_2x = getCroppedImageUrl(url, { ...config, devicePixelRatio: 2 }, options)
    const url_3x = getCroppedImageUrl(url, { ...config, devicePixelRatio: 2 }, options)
    const _urlSet = [url_1x, url_2x, url_3x]
    if ((config.format && config.format !== FORMAT_MAP.AUTO) || _options?.reqHeaderAccept) {
      imgUrlSetRef.current = _urlSet
      return _urlSet
    }
    if (hasMounted) {
      imgUrlSetRef.current = _urlSet
      return _urlSet
    }
    return ['', '', '']
  }, [config, hasMounted, url, options, needsRefresh])

  const handleImgLoad = useCallback(
    (event: SyntheticEvent) => {
      setImgLoadStatus(ImgLoadStatus.loaded)
      onLoad?.(event)
    },
    [onLoad],
  )

  const handleImgLoadError = useCallback(
    (event: SyntheticEvent) => {
      setImgLoadStatus(ImgLoadStatus.loadError)
      onError?.(event)
    },
    [onError],
  )

  const render = useCallback(() => {
    if (!imgUrl) return null
    const [url_1x, url_2x, url_3x] = imgUrlSet
    if (type === 'img') {
      return (
        <LazyLoadWrapper
          lazyLoad={lazyLoad}
          imgLoadStatus={imgLoadStatus}
          placeholder={placeholder}
          errorPlaceholder={errorPlaceholder}
          placeholderClassName={placeholderClassName}
          placeholderStyle={placeholderStyle}
          style={{ height: '100%' }}
          className={wrapperClassName}
        >
          <ImageComp
            url={imgUrl}
            urlSet={imgUrl === '' ? '' : `${url_1x} 1x, ${url_2x} 2x, ${url_3x} 3x`}
            width={width}
            height={height}
            className={twMerge(className)}
            style={{ visibility: imgUrl ? 'visible' : 'hidden', ...style }}
            alt={alt}
            onLoad={handleImgLoad}
            onError={handleImgLoadError}
          />
        </LazyLoadWrapper>
      )
    }
    return (
      <>
        <LazyLoadWrapper lazyLoad={lazyLoad} imgLoadStatus={imgLoadStatus} style={{ height: '100%' }} className={wrapperClassName}>
          <BgImageComp
            url={imgUrl}
            urlSet={imgUrlSet}
            style={{ ...style, width, height }}
            className={twMerge(className)}
            onLoad={handleImgLoad}
            onError={handleImgLoadError}
          />
        </LazyLoadWrapper>
      </>
    )
  }, [imgUrlSet, type, imgUrl, lazyLoad, className, style, wrapperClassName, width, height, alt, imgLoadStatus])
  return render()
}

export default memo(CroppedImage)
