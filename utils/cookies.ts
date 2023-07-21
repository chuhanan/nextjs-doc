/**
 * @description: 设置cookie
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const setCookie = (name: string, value: string, response?: NextResponse, options?) => {
  if (response) {
    return response.cookies.set(name, value, options)
  } else {
    return cookies().set(name, value, options)
  }
}

export const getCookie = (name: string, request?: NextRequest) => {
  if (request) {
    return request.cookies.get(name)?.value || ''
  } else {
    return cookies().get(name)?.value || ''
  }
}

export const getShareData = (name: string, request: NextRequest, response: NextResponse) => {
  return request.headers.get(name) || response.cookies.get(name)?.value || ''
}
