import { NextRequest, NextResponse } from 'next/server'

export const getValueFromReqHeaders = (req: NextRequest, key: string) => {
  return req.headers.get(key)
}

export const setValueToReqHeaders = (res: NextResponse, key: string, value: string) => {
  return res.headers.set(key, value)
}

export const getAppDeviceId = (req: NextRequest) => {
  const ua = getValueFromReqHeaders(req, 'user-agent')
  if (!ua) return null
  let appDeviceId = ((ua.match(/WeeeApp .*\) ([\da-zA-Z\-]{16,50})/i) || [])[1] || '').trim() || ''
  return appDeviceId || null
}

export const getWeeeSessionTokenFromHeaders = (req: NextRequest) => {
  const weeeSessionToken = getValueFromReqHeaders(req, 'weee-session-token')
  return weeeSessionToken || null
}

export const isSayweeeApp = (req: NextRequest) => {
  const ua = getValueFromReqHeaders(req, 'user-agent')
  return ua ? /weeeapp/i.test(ua) : false
}

export const isWeixinBrowser = (req) => {
  const ua = getValueFromReqHeaders(req, 'user-agent')
  if (!ua) return false
  return /micromessenger/i.test(ua) || /windows phone/i.test(ua)
}
