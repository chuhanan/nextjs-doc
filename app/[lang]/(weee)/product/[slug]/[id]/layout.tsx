import { isDevice } from '~/utils/device'
import { headers } from 'next/headers'

export default function ProductLayout({ mobile, pc, params: { lang } }) {
  const headerList = headers()
  const isMobile = isDevice(headerList.get('user-agent'), 'h5')
  return <div>{isMobile ? mobile : pc}</div>
}
