import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import Negotiator from 'negotiator'
import { i18n } from '~/constants'

export const getLangFromCookie = (req: NextRequest) => {
  return req.cookies.get('lang')?.value
}

export const getLangFromReqHeaders = (req: NextRequest) => {
  return req.headers.get('lang')
}

export const getLangFromUrl = (req: NextRequest) => {
  const regex = /^(\/)?(zht|zh|en|es|ko|ja|vi)?/
  const match = req?.url.match(regex)
  return match ? match[0] : null
}

export const getLangFromAcceptLanguage = (req: NextRequest) => {
  const negotiator = new Negotiator(req)
  const acceptLanguage = negotiator.language(i18n.locales)
  return acceptLanguage
}
