import { headers, cookies } from 'next/headers'
import { isDevice } from '~/utils/device'

interface IServerProps {
  lang: string
  slug: string[]
  searchParams: Record<string, string>
}

export default function ProductPage(props: IServerProps) {
  const headerList = headers()
  const cookieStore = cookies()
  const isMobile = isDevice(headerList.get('user-agent'), 'h5')
  console.log(props, 'props')
  console.log(cookieStore.getAll(), 'cookie')

  return (
    <div>
      <div>ProductPage pc</div>
    </div>
  )
}
