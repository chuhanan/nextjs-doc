'use client'
import { useEffect } from 'react'
import useGlobal from '~/store/global'
import { callApi } from '~/utils/axios'
import { getCookie } from '~/utils/cookie-client'
import { PrefertchApiList } from '~/types/common'

export default function DataProvider(props: { prefetchApiList?: PrefertchApiList[] }) {
  const { prefetchApiList } = props
  const { setCartData } = useGlobal()
  useEffect(() => {
    const configPrefetch = async () => {
      const requestHeader = {
        log: true,
        'b-cookie': getCookie('b_cookie') || '',
        Authorization: `Bearer ${getCookie('auth_token')}`,
        lang: getCookie('site_lang'),
        'weee-session-token': getCookie('weee_session_token') || '',
        zipcode: getCookie('NEW_ZIP_CODE') || '',
        'weee-store': getCookie('weee-store') || '',
        'device-id': getCookie('device-id') || '',
        platform: getCookie('platform') || 'h5',
      }
      if (prefetchApiList?.length) {
        prefetchApiList.forEach(async (item) => {
          switch (item) {
            case PrefertchApiList.ACCOUNT:
              break
            case PrefertchApiList.CART:
              const res = await callApi(`/ec/so/porder/simple`, {
                method: 'GET',
                headers: requestHeader,
              })
              setCartData(res)
              break
            default:
              break
          }
        })
      }
    }

    configPrefetch()
  }, [])

  return <></>
}
