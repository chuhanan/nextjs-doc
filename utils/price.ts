/**
 * 格式化
 * @param number 要格式化的数字
 * @param n 保留的小位数
 * @param x 几个数字一次间隔
 */
export const wrapCurrency = (num, n = 2, x = 3) => {
  const nu = new Number(num ?? 0)
  const re = '\\d(?=(\\d{' + x + '})+' + (n > 0 ? '\\.' : '$') + ')'
  return nu.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,')
}
