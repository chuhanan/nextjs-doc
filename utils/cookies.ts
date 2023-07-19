/**
 * @description: 设置cookie
 */

import { NextRequest, NextResponse } from 'next/server'

export const setCookie = async (response: NextResponse, name: string, value: string, options?) => {
  response.cookies.set(name, value, options)
}

export const getCookie = (request: NextRequest, name: string) => {
  return request.cookies.get(name)?.value || ''
}

export const getShareData = (name: string, request: NextRequest, response: NextResponse) => {
  return request.headers.get(name) || response.cookies.get(name)?.value || ''
}
