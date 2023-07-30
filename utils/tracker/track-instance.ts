import { match } from 'path-to-regexp'

// import Constants from '@/constants/const';
import { PageNameV2, route2PVEventV2 } from '~/constants/page-key'
// import { isIOS, isMobileBrowser, isSayWeeeApp, isWeeeAndroid } from '@/utils/tool';
import { pushEvent, sendEvent, trackPageView } from '@weee-fe/weee-biz-web'

function getPageEventNameByMapConfig(pathUrl: string, mapConfig: any) {
  let [urlStr = '/'] = pathUrl.split('?')

  const allRoutes = Object.keys(mapConfig)
  const matched = allRoutes.find((route) => {
    try {
      const fn = match(route, { decode: decodeURIComponent })
      const res = fn(urlStr)

      return !!res
    } catch (err) {
      return false
    }
  })

  return matched ? mapConfig[matched] : ''
}
/**
 *
 * @param pathname pathname
 * @returns 适配后的pathname
 */
export function changePathNameToFixDialogPv(pathname: string) {
  switch (pathname) {
    case PageNameV2.mweb_checkout_product_list:
      return PageNameV2.mweb_checkout_product_list
    default:
      return pathname
  }
}

/**
 * 目前需要新老2套的PV映射关系, 这个是处理新的
 * @param pathUrl url
 * @returns matched route mapping
 */
export function getPageEventNameV2(pathUrl: string) {
  return getPageEventNameByMapConfig(pathUrl, route2PVEventV2)
}

export default class Tracker {
  eventItems = []
  eventQueue = {}
  dataVersion = 2
  static pageContext: {
    view_id?: string
    referer_view_id?: string
    page_key?: string
    referer_page_key?: string
    referer_page_url?: string
    page_url?: string
    page_ctx_app?: Record<string, any>
    referer_page_ctx_app?: Record<string, any>
  } = {}
  static appReferrerData: {
    view_id?: string
    page_key?: string
    page_url?: string
    time?: number
  }

  getPlatform() {
    // if (isSayWeeeApp()) {
    //   if (isIOS()) {
    //     return 'iOS';
    //   }
    //   if (isWeeeAndroid()) {
    //     return 'Android';
    //   }
    // }
    // if (isMobileBrowser()) {
    //   return 'MWeb';
    // }
    return 'DWeb'
  }

  getReferrerPageKey() {
    if (Tracker.appReferrerData.page_key) {
      return Tracker.appReferrerData.page_key
    }
    return sessionStorage.getItem('referrer_page_key') || ''
  }

  getReferrerViewId() {
    if (Tracker.appReferrerData.view_id) {
      return Tracker.appReferrerData.view_id
    }
    return sessionStorage.getItem('view_id') || ''
  }

  getReferrerPageUrl() {
    if (Tracker.appReferrerData.page_url) {
      return Tracker.appReferrerData.page_url
    }
    return sessionStorage.getItem('referrer_page_url') || ''
  }

  addPv(pageKey?: string, referer?: string, params?: Record<string, any>) {
    //弹窗中的pv不进入路由栈存储, WEB-20780
    // trackPageView(pageKey, params);
    return this
  }

  addCustomerPv(pageKey?: string, referer?: string, params?: Record<string, any>) {
    if (pageKey || params) {
      trackPageView(pageKey, params)
      return this
    }
    return this
  }

  addEventPageView(type, params?, pageKey?) {
    const data = {
      type,
      params,
    }
    if (pageKey) {
      params.page_key = pageKey
    }
    sendEvent(data)
    return this
  }

  addEvent(type: string, params) {
    sendEvent({
      type,
      params,
    })
    return this
  }

  /**
   * 同 addEventQueueInDialog
   * @param type string
   * @param params object
   * @param dialogParams 传入对象且必须有page_key
   * @returns
   */
  addEventInDialog(type: string, params: Record<string, any>, dialogParams: Record<string, any>) {
    if (!dialogParams.page_key) {
      throw new Error('dialogParams must have page_key')
    }
    pushEvent({
      type,
      params,
      ...(dialogParams || {}),
    })
    return this
  }

  addEventInQueue(type: string, params) {
    pushEvent({
      type,
      params,
    })
    return this
  }

  /**
   * 在弹窗中有特殊的 page_key 需要传入, 而且不需要进入路由栈
   * 在 addPv 之后需要处理弹窗中的一些其他事件 比如说 impression
   * 目前只需要覆盖page_key
   *
   * @param type string
   * @param params object
   * @returns Tracker
   */
  addEventQueueInDialog(type: string, dialogParams, params) {
    pushEvent({
      type,
      params,
      ...(dialogParams || {}),
    })
    return this
  }

  clear() {
    this.eventItems = []
  }

  setDataVersion(version) {
    this.dataVersion = version
  }
  send() {}
  /*
    1. 调用新的bi接口。
    2. 设置队列，同一时间（秒）露出的商品作为一组队列
    3. 10秒或切换路由时发送一次数据，将队列全部发送，发送成功相应的队列数据出栈，发送失败清除发送标记（时间戳）
    4. 发送状态判断，如果下次发送时发现有标记为还在发送的数据，忽略本次发送
  */
  sendQueue() {
    sendEvent()
    return this
  }

  addAndSend(type: string, params: any) {
    this.addEvent(type, params).send()
  }
}
