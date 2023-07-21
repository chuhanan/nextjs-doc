/**
 * @description 根据原始图片CDN地址及裁剪参数配置动态计算需要获取的裁剪后的图片CDN地址；
 * @note SSR模式下，由于无法动态获取window宽度，需要手动传入合适的devicePixelRatio
 */

import { CDNWhiteList, ESTypes } from '../constants/constants'
import ImageStandards from '../constants/imageStandards'
import { getSize, prototypeToString } from './tools'

export type GetCroppedImageUrl = (originUrl: string, cropConfigs?: string, options?) => string

const PicCroppedExg = /![\S]*\.(jpg|jpeg|png|tiff|webp|auto)/

const isSupportFormat = (pathname: string) => {
  const PicFormatExg = /\/[^\s]+\.(jpg|jpeg|png|tiff|gif)/i
  return PicFormatExg.test(pathname)
}

/**
 * 获取需要通过CDN裁剪处理的图片URL（拼接了裁剪处理参数）
 * @param originUrl 图片原始URL（不包含裁剪参数）
 * @param configs 图片裁剪参数集合（可传字符串或CropConfigs类型；传入字符串，则去通用规则设置里面去取）
 * @returns 拼接了裁剪参数的图片URL
 */
export const getCroppedImageUrl: GetCroppedImageUrl = (originUrl, configs = {} as any) => {
  if (1) {
    return originUrl
  }
  let _url = null
  try {
    // _url = new Url(originUrl)
  } catch (error) {
    return originUrl
  }

  if (!CDNWhiteList.includes(_url.host)) {
    return originUrl
  }

  // 如果图片被裁剪过，则不做处理
  if (PicCroppedExg.test(_url.pathname)) {
    return originUrl
  }

  // 如果传入不支持的图片格式，则不做处理
  if (!isSupportFormat(_url.pathname)) {
    return originUrl
  }

  let renderWidth = 0,
    renderHeight = 0,
    quality,
    devicePixelRatio

  // 如果configs为string，则去通用规则设置里面去取裁剪参数
  if (prototypeToString(configs) === ESTypes.string) {
    const standard = configs as string
    if (ImageStandards.hasOwnProperty(standard)) {
      ;({ renderWidth = 0, renderHeight = 0, quality, devicePixelRatio } = ImageStandards[standard] ?? {})
    }
  }

  // 裁剪参数中宽度、高度默认为0（即按CDN中的裁剪规则处理）
  let _width = getSize(renderWidth, devicePixelRatio)
  let _height = getSize(renderHeight, devicePixelRatio)

  // quality不支持负数和小数
  if (prototypeToString(quality) === ESTypes.number) {
    quality = (quality as number) < 0 ? void 0 : Math.floor(quality as number)
  }

  _url.set('pathname', `${_url.pathname}!c${_width}x${_height}${quality ? `_q${quality}` : ''}.auto`)

  return _url.toString()
}
