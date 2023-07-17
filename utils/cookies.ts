/**
 * @description: 设置cookie
 */

import { NextResponse } from 'next/server'

export const setCookie = async (name: string, value: string, options?) => {
  NextResponse.next().cookies.set({
    name: name,
    value: value,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    path: '/',
  })
}

export const getCookie = async (name: string) => {
  const val = NextResponse.next().cookies.get(name)
  return val
}
