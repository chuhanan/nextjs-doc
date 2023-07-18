/**
 * @description: 设置cookie
 */

import { NextResponse } from 'next/server'

export const setCookie = async (response: NextResponse, name: string, value: string, options?) => {
  response.cookies.set(name, value, options)
}

export const getCookie = (response: NextResponse, name: string) => {
  return response.cookies.get(name)
}
