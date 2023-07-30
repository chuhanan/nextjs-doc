//解决移动端滚动穿透问题
export const fixedBody = () => {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  document.body.style.cssText = 'position:fixed;width:100%;top:-' + scrollTop + 'px;'
}

export const looseBody = () => {
  const body = document.body
  body.style.position = ''
  const top = body.style.top
  if (!top) return
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
  body.style.cssText = ''
}
