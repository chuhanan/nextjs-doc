import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { getCookie, setCookie } from '~/utils/cookies'
import { getValueFromReqHeaders, isWeixinBrowser } from '~/utils/req-headers'
import { minimatch } from 'minimatch'
import { LANGUAGE_REGULAR } from '~/constants'
import { buildFullUrl } from '~/utils/url'

const SHORT_TOKEN_REDIRECT_MAP = {
  '/product/*/{0..9}*': () => {
    return {
      replacePattern: '/product',
      replacedUrl: '/product1',
    }
  },
}

const CHECK_LOGIN_PATHS = [
  '/account/profile/{0..9}*',
  '/review/{0..9}*',
  '/review/video/{0..9}*',
  '/mkpl/group-order/landing',
  '/mkpl/group-order/list-host',
  '/mkpl/group-order/list-guest',
]

function redirectToPhp(req: NextRequest, res: NextResponse) {
  // let redirectKey =
  //   Object.keys(SHORT_TOKEN_REDIRECT_MAP).find(key => {
  //     return minimatch(req.path, `${LANGUAGE_REGULAR}${key}`) || minimatch(req.path, key);
  //   }) || '';
  // if (redirectKey) {
  //   let { replacePattern, replacedUrl } = SHORT_TOKEN_REDIRECT_MAP[redirectKey](req);
  //   res.redirect(302, buildFullUrl(req, req.originalUrl.replace(replacePattern, replacedUrl)));
  //   return true;
  // }
  return false
}

function generateToken() {
  return fetch(`/ec/customer/login/token/generate`, {
    method: 'GET',
  }).then((res) => {
    return res
      .json()
      .then((data) => {
        const { token } = data
        return token
      })
      .catch((err) => {
        console.log('generateToken', err)
      })
  })
}

function refreshToken(oldToken: string, request: NextRequest) {
  return fetch('/ec/customer/login/token/refresh', {
    method: 'POST',
    headers: {
      ...request.headers,
    },
  }).then((res) => {
    return res
      .json()
      .then((data) => {
        const { token } = data
        return token ? token : oldToken
      })
      .catch((err) => {
        console.log('refreshToken', err)
      })
  })
}

export default async function authTokenMiddware(request: NextRequest, response: NextResponse) {
  let authToken =
    getValueFromReqHeaders(request, 'weee-token') ||
    getValueFromReqHeaders(request, 'preorder_token') ||
    getValueFromReqHeaders(request, 'weee_token') ||
    getCookie('auth_token')

  if (authToken && `${authToken}`.includes('.') === false && redirectToPhp(request, response)) {
    return
  }

  let parseToken = jwt.decode(authToken) || {}

  if (parseToken && !parseToken.is_login && isWeixinBrowser(request)) {
    //是否需要微信自动登录
    let isAutoInWechat =
      CHECK_LOGIN_PATHS.some((key) => {
        return minimatch(request.url, `${LANGUAGE_REGULAR}${key}`) || minimatch(request.url, key)
      }) || false

    let isWechatLogin = getCookie('is_wechat_login')
    if (isAutoInWechat && !isWechatLogin) {
      setCookie('is_wechat_login', '1')
      NextResponse.redirect(buildFullUrl(`/account/login/wechat?redirect_url=${encodeURIComponent(request.url)}`), 302)
      // res.redirect(
      //   302,
      //   buildFullUrl(req, `/account/login/wechat?redirect_url=${encodeURIComponent(req.originalUrl)}`)
      // );
      return
    }
  }

  if (!authToken) {
    try {
      let generateResult = await generateToken()

      authToken = generateResult
      parseToken = jwt.decode(authToken) || {}
    } catch (error) {
      console.log(error)
    }
  }

  let expireTime = parseToken.exp || 0
  const time = new Date().getTime() / 1000
  const isExpired = expireTime < time
  const isRefesh = expireTime - time < 15 * 24 * 60 * 60
  setCookie('IS_LOGIN', parseToken.is_login ? '1' : '0')
  //token过期，重新生成匿名token
  if (isExpired) {
    try {
      let generateResult = await generateToken()

      authToken = generateResult
      parseToken = jwt.decode(authToken) || {}
    } catch (error) {
      console.log(error)
    }
  }
  console.log(authToken, '====authToken')
  //token在15天以内过期，刷新token
  if (!isExpired && isRefesh) {
    try {
      let refreshResult = await refreshToken(authToken as string, request)

      authToken = refreshResult
      parseToken = jwt.decode(authToken) || {}
    } catch (e) {
      console.log(e)
    }
  }
}
