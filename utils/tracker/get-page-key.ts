import { PageNameV2, route2PVEventV2 } from '~/constants/page-key'

import { getCookie } from '~/utils/cookie-client'
import { match } from 'path-to-regexp'
/**
 * 目前需要新老2套的PV映射关系, 这个是处理新的
 * @param pathUrl url
 * @returns matched route mapping
 */
export function getPageEventNameV2(pathUrl: string) {
  return getPageEventNameByMapConfig(pathUrl, route2PVEventV2)
}

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

export function getPathNoLangOnClient(url?: string) {
  if (!window) return ''
  const pathname = url || window.location.pathname
  const pathNoLang = pathname.replace(/^(\/)?(zht|zh|en|es|ko|ja|vi)?/, '')
  if (pathNoLang.indexOf('/') !== 0) {
    return '/' + pathNoLang
  }
  return pathNoLang
}

export function getMyListPageKey(type) {
  switch (type) {
    case 'bought':
      return PageNameV2.mweb_me_my_bought
    case 'reorder':
      return PageNameV2.mweb_me_my_reorder
    case 'watchlist':
      return PageNameV2.mweb_me_my_watch_list
    case 'recently':
      return PageNameV2.mweb_me_my_recently
  }
}

export function getCmsPageKey(url: string, returnArray: boolean = false) {
  const _url = new URL(url || location.href).pathname
  const _pathArr = _url.split('/')
  if (returnArray) {
    return _pathArr
  }
  return `mweb_cms_${_pathArr[_pathArr.length - 2]}` // cms_brand
}

/**
 * 获取url上动态路由的参数
 * 比如/zh/account/notification/community， prefix=/account/notification，返回的是community
 * @param url
 * @param prefix
 */
const getDynamicParamFromUrl = (url: string, prefix: string) => {
  if (!url) return ''
  url = getPathNoLangOnClient(url)
  return url.replace(prefix, '').split('/')?.[1] || ''
}

const isFollowInfoPage = (url: string) => {
  try {
    return /\/social\/user\/[\d]+\/follow-info/.test(url)
  } catch (error) {
    return false
  }
}
const isProfilePage = (url: string) => {
  try {
    return /\/social\/user\/[\d]+\/profile/.test(url)
  } catch (error) {
    return false
  }
}

export function getPageKey(url: string, params?: Record<string, string>) {
  // 如果在搜索页面没有关键词和搜索结果, 需要处理成别的page_key
  let _url: URL

  try {
    _url = new URL(url)
  } catch (e) {
    return ''
  }
  const queryObject = _url.searchParams
  //处理cms组件的page_key /zh/cms/page/brand/feLLOXys
  if (url.includes('/cms/page/')) {
    return getCmsPageKey(url)
  }
  //处理notification的二级页面的page_key /zh/account/notification/community
  if (url.includes('/account/notification/')) {
    return `mweb_me_message_center_${getDynamicParamFromUrl(_url.pathname, '/account/notification')}`
  }

  if (url.includes('/mkpl/search') && !_url.search?.includes('seller_id=')) {
    return PageNameV2.mweb_mkpl_global_search_result
  }

  if (url.includes('/search') && !_url.search?.includes('keyword=')) {
    return PageNameV2.mweb_search_landing
  }

  if (url.includes('/account/my-list')) {
    const type = queryObject.get('type') ?? 'watchlist'
    return getMyListPageKey(type)
  }

  if (url.includes('/account/profile')) {
    const pathname = _url.pathname
    const userId = pathname.split('/').pop()
    const isMyself = userId === getCookie('user_id')

    switch (params?.click_type || 'posts') {
      case 'posts':
        if (isMyself) {
          return PageNameV2.mweb_me_profile_post
        }
        return PageNameV2.mweb_comm_profile_post
      case 'reviews':
        if (isMyself) {
          return PageNameV2.mweb_me_profile_review
        }
        return PageNameV2.mweb_comm_profile_review
      case 'liked':
        if (isMyself) {
          return PageNameV2.mweb_me_profile_like
        }
        return PageNameV2.mweb_comm_profile_like
      case 'commented':
        if (isMyself) {
          return PageNameV2.mweb_me_profile_comment
        }
        return PageNameV2.mweb_comm_profile_comment
    }
  }

  if (url.includes('/account/perks')) {
    // const tab = (queryObject?.tab ?? 1) as string;
    const tab = queryObject.get('tab') || '1'

    switch (parseInt(tab)) {
      case 1:
        return PageNameV2.mweb_me_points
      case 2:
        return PageNameV2.mweb_me_vip
    }
  }

  if (isProfilePage(_url.pathname)) {
    const pathname = _url.pathname
    const userId = /\/user\/(\d+)\/profile/.exec(pathname)?.[1]
    const isMyself = userId === getCookie('user_id')
    const tab = queryObject.get('tab') || 'posts'

    switch (tab) {
      case 'posts':
        if (isMyself) {
          return PageNameV2.mweb_me_profile_post
        }
        return PageNameV2.mweb_comm_profile_post
      case 'reviews':
        if (isMyself) {
          return PageNameV2.mweb_me_profile_review
        }
        return PageNameV2.mweb_comm_profile_review
      case 'liked':
        if (isMyself) {
          return PageNameV2.mweb_me_profile_like
        }
        return PageNameV2.mweb_comm_profile_like
      case 'commented':
        if (isMyself) {
          return PageNameV2.mweb_me_profile_comment
        }
        return PageNameV2.mweb_comm_profile_comment
    }
  }

  if (isFollowInfoPage(_url.pathname)) {
    const pathname = _url.pathname

    const userId = /\/user\/(\d+)\/follow-info/.exec(pathname)?.[1]
    const isMyself = userId === getCookie('user_id')
    const tab = queryObject.get('tab') || 'follower'

    switch (tab) {
      case 'follower':
        if (isMyself) {
          return PageNameV2.mweb_me_profile_follower
        } else {
          return PageNameV2.mweb_comm_profile_follower
        }
      case 'following':
        if (isMyself) {
          return PageNameV2.mweb_me_profile_following
        } else {
          return PageNameV2.mweb_comm_profile_following
        }
      default:
        if (isMyself) {
          return PageNameV2.mweb_me_profile_follower
        } else {
          return PageNameV2.mweb_comm_profile_follower
        }
    }
  }
  return getPageEventNameV2(getPathNoLangOnClient(_url.pathname))
}
