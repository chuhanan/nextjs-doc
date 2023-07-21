export type ImageStandardsType = {
  [name: string]: any
}

// 商品列表icon
export const PRODUCT_CARD_ICON = 'PRODUCT_CARD'
// PDP商品主图
export const PDP_MAIN = 'PDP_MAIN'
// 商品分类icon
export const PRODUCT_CATEGORY_ICON = 'PRODUCT_CATEGORY_ICON'
// 商品晒单icon
export const PRODUCT_POST_ICON = 'PRODUCT_POST_ICON'
// 热门特辑icon
export const PRODUCT_HOT_ALBUM = 'PRODUCT_HOT_ALBUM'
// 热门特辑背景
export const PRODUCT_HOT_ALBUM_BG = 'PRODUCT_HOT_ALBUM_BG'
// 首页main banner
export const HOME_MAIN_BANNER = 'HOME_MAIN_BANNER'
// 首页ad slot
export const HOME_AD_SLOT = 'HOME_AD_SLOT'
// PDP banner
export const PDP_BANNER = 'PDP_BANNER'
// RTG banner
export const RTG_BANNER = 'RTG_BANNER'
// 个人头像
export const USER_AVATAR = 'USER_AVATAR'
// 消息活动icon
export const MESSAGE_ICON = 'MESSAGE_ICON'
// 视频卡片icon
export const VIDEO_CARD_ICON = 'VIDEO_CARD_ICON'
// 关注视频大图
export const VIDEO_COVER = 'VIDEO_COVER'
// 活动icon
export const EVENT_ICON = 'EVENT_ICON'
// 活动背景
export const EVENT_BG = 'EVENT_BG'
// 活动卡片(列表)
export const EVENT_CARD = 'EVENT_CARD'
// 餐厅背景图
export const RTG_BG = 'RTG_BG'
// 餐厅logo
export const RTG_LOGO = 'RTG_LOGO'
// 菜品图(列表)
export const RECIPE_ICON = 'RECIPE_ICON'
// 菜品图(pdp)
export const RECIPE_PDP = 'RECIPE_PDP'
// 晒单图
export const ORDER_POST = 'ORDER_POST'
// 分享弹框图标
export const SHARE_POPUP_ICON = 'SHARE_POPUP_ICON'
// 餐馆菜系icon
export const RTG_CUISINE_ICON = 'RTG_CUISINE_ICON'
// 餐馆菜引导页指示箭头
export const RTG_COCHE_MASK_ARROW = 'RTG_COCHE_MASK_ARROW'
// 购物车商品图
export const RTG_CART_ICON = 'RTG_CART_ICON'

/** 通用图片规格设置 */
export const ImageStandards: ImageStandardsType = {
  [PRODUCT_CARD_ICON]: {
    renderWidth: 170,
    renderHeight: 170,
  },
  [PDP_MAIN]: {
    renderWidth: 375,
    renderHeight: 375,
  },
  [PRODUCT_CATEGORY_ICON]: {
    renderWidth: 56,
    renderHeight: 56,
  },
  [PRODUCT_POST_ICON]: {
    renderWidth: 136,
    renderHeight: 136,
  },
  [PRODUCT_HOT_ALBUM]: {
    renderWidth: 136,
    renderHeight: 136,
  },
  [PRODUCT_HOT_ALBUM_BG]: {
    renderWidth: 375,
    renderHeight: 200,
  },

  [HOME_MAIN_BANNER]: {
    renderWidth: 313,
    renderHeight: 213,
  },
  [HOME_AD_SLOT]: {
    renderWidth: 375,
    renderHeight: 68,
  },
  [PDP_BANNER]: {
    renderWidth: 375,
    renderHeight: 68,
  },
  [RTG_BANNER]: {
    renderWidth: 330,
    renderHeight: 134,
  },

  [USER_AVATAR]: {
    renderWidth: 72,
    renderHeight: 72,
  },
  [MESSAGE_ICON]: {
    renderWidth: 76,
    renderHeight: 76,
  },

  [VIDEO_CARD_ICON]: {
    renderWidth: 375,
    renderHeight: 500,
    devicePixelRatio: 2,
  },
  [VIDEO_COVER]: {
    renderWidth: 375,
    renderHeight: 500,
    devicePixelRatio: 2,
  },
  [EVENT_ICON]: {
    renderWidth: 200,
    renderHeight: 200,
  },
  [EVENT_BG]: {
    renderWidth: 375,
    renderHeight: 200,
  },
  [EVENT_CARD]: {
    renderWidth: 375,
    renderHeight: 200,
  },

  [RTG_BG]: {
    renderWidth: 375,
    renderHeight: 154,
  },
  [RTG_LOGO]: {
    renderWidth: 48,
    renderHeight: 48,
  },
  [RECIPE_ICON]: {
    renderWidth: 80,
    renderHeight: 80,
  },
  [RECIPE_PDP]: {
    renderWidth: 375,
    renderHeight: 375,
  },
  [ORDER_POST]: {
    renderWidth: 108,
    renderHeight: 108,
  },
  [SHARE_POPUP_ICON]: {
    renderWidth: 64,
    renderHeight: 64,
  },
  [RTG_CUISINE_ICON]: {
    renderWidth: 50,
    renderHeight: 50,
  },
  [RTG_COCHE_MASK_ARROW]: {
    renderWidth: 50,
    renderHeight: 50,
  },
  [RTG_CART_ICON]: {
    renderWidth: 80,
    renderHeight: 80,
  },
}

export default ImageStandards
