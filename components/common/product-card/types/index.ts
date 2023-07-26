export interface ProductCardProps {
  type: string
  changeSize: string
  showFavorite: boolean
  showActivity: boolean
  showWeekly: boolean
  showLeft: boolean
  showMemberPrice: boolean
  showBasePrice: boolean
  showAddBtn: boolean
  data: any
  isLink: boolean
  skeleton?: React.ReactNode
  skeletonFactor?: boolean
  transformLink?: (item: any) => string | { to: string; reload: boolean }
  className?: string
  addCartParams: {
    source: string
    referType?: string //这个字段不用传, 会根据data数据解析出来, 如果要自定义使用, 请传 customReferType
    referValue?: string
    customReferType?: string
    customReferValue?: string
    deliveryDate: string
    isInCart?: boolean
    positionInfoT2?: any
    ctx?: any
    isAppSupportPurchaseStatusNotify?: boolean
  }
  trackType: string
  impressionOption?: any | (() => any)
  isInUpsell?: boolean
  isRemain: boolean
  miniTitle: boolean
  isRelated?: boolean
  preSell?: boolean
  imageSize?: number
  onATC?: () => void
  fixedTitletHeight?: boolean
  showUnitInfo?: boolean
  showLabel?: boolean
  isPromo?: boolean
  bottomTip?: string | React.ReactNode
  isTrending?: boolean
  is_mkpl?: boolean
  showTopTitle?: boolean
  showTags?: boolean
  cardSize?: string
  countDownTimeStamp?: number
  produtLink?: any
  showAllTags?: boolean
  isInPDP?: boolean
  showBrandName?: boolean
  isInProductCard?: boolean
  positionInfoT2?: any
  supportPurchaseStatusNotify?: boolean
  priceCls?: string
  addCartCls?: string
  trackSaveClick?: (targetCollect: boolean) => void
  /** 元素在视窗位置发生变化回调 */
  onViewChange?: (props: {
    inView: boolean
    play: () => void
    stop: () => void
    productInfo: any
    mediaItem: any
    cardElement?: HTMLDivElement
    /** 触发来源  */
    trigger?: 'click' | 'auto'
  }) => void
  viewOptions?: any
  isRobot?: boolean
  trackDataInDialog?: Record<string, any>
  showExtraTag?: boolean
  link?: string
  linkParams?: Record<string, any>
  showSoldBy?: boolean
  fetchYouMayLike?: boolean
  /* 团购购物车加购自定义 */
  customAddCartApi?: any
  /* 使用新的加购接口(合并结算之后) */
  useNewUpdateCartApi?: boolean
  showLoadingWhenJump?: boolean
  fullProductName?: boolean
}

export interface CardType {
  cardType?: 'vertical' | 'horizontal'
}
