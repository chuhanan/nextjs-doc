export const buildFullUrl = (url: string) => {
  return process.env.WEB_HOST + url
}

export const buildUrlWithOrigin = (path: string) => {
  const host = process.env.WEB_HOST || process.env.NEXT_PUBLIC_WEB_HOST || ''
  if (path.indexOf(host) === -1) {
    if (path[0] === '/') {
      return `${host}${path || ''}`
    } else {
      return `${host}/${path || ''}`
    }
  } else {
    return path
  }
}

export function convertObjectToUrlParams<T extends { [key: string]: string | number }>(obj: T): string {
  if (!obj || Object.keys(obj).length < 1) {
    return ''
  }

  const searchStr = Object.keys(obj)
    .map((item) => (obj[item] ? `${item}=${obj[item]}` : ''))
    .filter((param) => param !== '')
    .join('&')

  if (!searchStr) return ''

  return `?${searchStr}`
}
