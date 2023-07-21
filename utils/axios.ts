export const callApi = async (url, options) => {
  const { headers: oHeaders, method, ...rest } = options || {}
  const isGetMeghtod = method.toUpperCase() === 'GET'
  let finalUrl = `${process.env.API_HOST}${url}`
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
      // 'User-Agent': headers().get('user-agent'),
      // Platform: headers().get('platform') || 'h5',
      // 'b-cookie': cookies().get('b-cookie').value || '',
      // Authorization: cookies().get('auth_token').value || '',
      // 'weee-session-token': cookies().get('weee-session-token').value || '',
      // 'Content-Type': 'application/json',
      ...oHeaders,
    },
    ...rest,
  }
  if (isGetMeghtod) {
    delete finalOptions.body
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
