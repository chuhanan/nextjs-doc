export const isDevice = (ua: string | null, type: 'h5' | 'pc') => {
  if (type === 'h5') {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  }
  if (type === 'pc') {
    return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  }
  console.warn('isDevice: type is not defined')
  return false
}
