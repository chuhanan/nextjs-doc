import mitt from 'mitt'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
// import { postListImpression } from 'tracks/helpers';
import Tracker from '~/utils/tracker/track-instance'

// import useImpressionT2 from '@/tracks/useImpressionT2'

function useTrack() {
  const router = useRouter()
  // const { productImpression } = useImpressionT2()

  // 初始化埋点事件总线
  useEffect(() => {
    function handleRouteChange(url: any, option?: any) {
      // 不刷新页面修改参数时不触发
      const { shallow } = option || {}
      if (shallow) return
    }

    function handleRouteChangeStart() {}
    function trackBrowserLanguage() {
      // if (sessionStorage?.getItem('t2_keyboard_input') || isSayWeeeApp()) {
      //   return;
      // }
      new Tracker()
        .addEvent('t2_keyboard_input', {
          mod_nm: null,
          mod_pos: null,
          sec_nm: null,
          sec_pos: null,
          co: {
            language: navigator?.languages?.join(','),
          },
        })
        .send()
      sessionStorage?.setItem('t2_keyboard_input', '1')
    }
    handleRouteChange(window.location.href)
    trackBrowserLanguage()
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('routeChangeStart', handleRouteChangeStart)
    return function cleanup() {
      // window.onload = null;
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [])
}

export default useTrack
