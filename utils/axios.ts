export const callApi = async (url, options) => {
  console.log(options.headers, 'options')
  return fetch(`${process.env.API_HOST}${url}`, options)
    .then((res) => {
      return res.json().then((data) => {
        console.log('res', data)
        return data.object
      })
    })
    .catch((e) => {
      console.log(`callApi error url: ${url}`, e)
      return e
    })
}
