import { getPageKey } from '~/utils/tracker/get-page-key'

const interceptors = [
  {
    page_key: 'mweb_product',
    interceptor: ({ params, pageContext }, next) => {
      let _url = new URL(pageContext.page_url || window.location.href)
      next({
        ...params,
        page_target: _url.pathname.split('/').pop(),
      })
    },
  },
  {
    page_key: 'mweb_mkpl_seller',
    interceptor: ({ params, pageContext }, next) => {
      let _url = new URL(pageContext.page_url || window.location.href)
      next({
        ...params,
        page_target: _url.pathname.split('/').pop(),
      })
    },
  },
  {
    page_key: 'mweb_collection',
    interceptor: ({ params }, next) => {
      setTimeout(() => {
        next({
          ...params,
          ...(window.trackParams || {}),
        })
      }, 30)
    },
  },
  {
    page_key: 'mweb_search_result',
    interceptor: ({ params, pageContext }, next) => {
      let _url = new URLSearchParams((pageContext.page_url || window.location.href).split('?').pop())
      next({
        ...params,
        page_target: _url.get('keyword'),
      })
    },
  },
  {
    //这个页面不发送pv
    page_key: 'mweb_event_landing',
    interceptor: ({ params, pageContext }, next) => {
      let _url = new URL(pageContext.page_url || window.location.href)
      if (_url.pathname.split('/').pop() === 'center') {
        return
      }
      next(params)
    },
  },
  {
    // /support开头的不发pv
    page_key: 'mweb_support_app',
    interceptor: () => {
      return
    },
  },
  {
    page_key: 'mweb_checkout',
    interceptor: ({ params, pageContext }, next) => {
      let _url = new URLSearchParams((pageContext.page_url || window.location.href).split('?').pop())
      next({
        ...params,
        is_rtg: _url.get('cart_domain') === 'restaurant',
      })
    },
  },
]

export const initWeeeTracker = () => {
  const preBaseUrl = process.env.NEXT_PUBLIC_API_HOST
  let tracker = new window.WeeeTracker({
    baseUrl: `${preBaseUrl}/data/tracking/v2/events/track`,
    maxCacheLen: 6,
    maxWaitingTime: 3000,
    getPageKey: getPageKey,
  })
  window._weeeTracker = tracker
  window._weeeTracker.customPv = ({ params, pageContext }, next) => {
    let index = interceptors.findIndex((item) => item.page_key === pageContext?.page_key)
    if (index < 0) {
      next(params)
    } else {
      interceptors[index].interceptor({ params, pageContext }, next)
    }
  }
  window.dispatchEvent(new Event('weeeTrackerLoaded'))
}
