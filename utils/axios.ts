export const callApi = (url, options) => {
  return fetch(`${process.env.API_HOST}${url}`, options).then((res) => {
    return res.json().then((data) => {
      return data.object
    })
  })
}
