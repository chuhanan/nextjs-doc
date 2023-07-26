export const callApi = async (url, options) => {
  const { headers: oHeaders, method, log, ...rest } = options || {}
  const isGetMeghtod = method.toUpperCase() === 'GET'
  let finalUrl = `${process.env.NEXT_PUBLIC_API_HOST || process.env.API_HOST}${url}`
  if (isGetMeghtod && options.body) {
    const params = Object.keys(options.body)
      .map((key) => {
        return `${key}=${options.body[key]}`
      })
      .join('&')
    finalUrl += `?${params}`
  }
  const finalOptions = {
    method: method || 'GET',
    headers: {
      ...oHeaders,
    },
    ...rest,
  }
  if (isGetMeghtod) {
    delete finalOptions.body
  }
  if (log) {
    console.log(finalUrl, 'finalUrl')
    console.log(finalOptions, 'finalOptions')
  }
  return fetch(finalUrl, finalOptions)
    .then((res) => {
      return res.json().then((data) => {
        return data.object
      })
    })
    .catch((e) => {
      console.log(`callApi error url: ${url}`, e)
      return e
    })
}
