'use client'
import { useRouter } from 'next/navigation'
import Img from '~/components/common/img'
import { twMerge } from 'tailwind-merge'
import HOME_ICON from '~/assets/images/weee-logo-black.svg'
import BACK_IMAGE from '~/assets/images/icon-return.png'

export const defaultBack = (router, appBackUrl?, h5BackUrl?) => {
  let referer = document?.referrer || ''
  let currentPage = window.location.pathname || ''
  appBackUrl = appBackUrl ?? '/native_app'
  h5BackUrl = h5BackUrl ?? `/${router.locale}`
  let idx = history.state?.idx || 0

  // if (isSayWeeeApp()) {
  //   if (sessionStorage.getItem('first_page_url_in_app') === currentPage) {
  //     return (window.location.href = appBackUrl);
  //   }
  //   history.back();
  //   return;
  // }

  if (referer && !referer.includes(currentPage)) {
    if (referer.includes('sayweee.')) {
      return router.back()
    }
  }

  if (idx > 0) {
    return router.back()
  }

  if (referer) {
    if (referer.includes('sayweee.') && !referer.includes(currentPage)) {
      return router.back()
    }
  }

  router.push(h5BackUrl)
}

export const Back = (props) => {
  const { onClick = defaultBack, showBackHomeIcon } = props
  let router = useRouter()
  // const { buttonClick } = useClickActionT2();
  const handleBack = () => {
    onClick(router)
  }
  const handleBackHome = () => {
    // buttonClick({
    //   mod_nm: null,
    //   mod_pos: null,
    //   sec_nm: null,
    //   sec_pos: null,
    //   co: {
    //     target_nm: 'weee_logo',
    //     target_pos: 0,
    //     target_type: 'normal_button',
    //     click_type: 'view'
    //   }
    // });
    // if (isSayWeeeApp()) {
    //   return (window.location.href = '/');
    // }
    router.push('/')
  }

  return (
    <>
      <Img className={twMerge('w-6 h-6 cursor-pointer object-contain')} src={BACK_IMAGE} onClick={handleBack} />
      {showBackHomeIcon && <Img className="h-4" src={HOME_ICON} onClick={handleBackHome} />}
    </>
  )
}
