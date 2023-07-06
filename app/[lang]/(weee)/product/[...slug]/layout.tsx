import { isDevice } from '~/utils/device'
import { headers } from 'next/headers'

export default function ProductLayout({ mobile, pc }) {
  const headerList = headers()
  const isMobile = isDevice(headerList.get('user-agent'), 'h5')
  console.log(isMobile, 'isMobile')
  return (
    <div>
      <div>{isMobile ? mobile : pc}</div>
    </div>
  )
}
