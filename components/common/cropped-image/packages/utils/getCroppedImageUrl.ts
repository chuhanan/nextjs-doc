/**
 * @description 根据原始图片CDN地址及裁剪参数配置动态计算需要获取的裁剪后的图片CDN地址；
 * @note SSR模式下，由于无法动态获取window宽度，需要手动传入合适的devicePixelRatio
 */

import { CDNWhiteList, ESTypes } from '../constants/constants'
import ImageStandards from '../constants/imageStandards'
import { getSize, prototypeToString } from './tools'

export type GetCroppedImageUrl = (originUrl: string, cropConfigs?: any, options?) => string

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
  return originUrl
}
