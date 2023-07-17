import { minimatch } from 'minimatch'
import { NextRequest } from 'next/server'
import { LANGUAGE_REGULAR } from '~/constants'
import { getCookie, setCookie } from '~/utils/cookies'
import { getValueFromReqHeaders } from '~/utils/req-headers'

const finalDefaultZipcode = '94538'
//默认创建porder走sales_org_id的页面
const SET_DEFAULT_ZIPCODE_URLS = ['/product/*/{0..9}*']

const toShippingNumber = (isShippingOrder) => (isShippingOrder ? '1' : '0')

function getSimpleInfo(req) {
  return fetch('/ec/so/porder/simple', {
    method: 'GET',
    headers: {
      ...req.headers,
    },
  }).then((res) => {
    return res.json().then((data) => {
      return data
    })
  })
}

function createPorder(req, params) {
  return fetch('/ec/so/porder', {
    method: 'POST',
    headers: {
      ...req.headers,
    },
    body: JSON.stringify(params),
  }).then((res) => {
    return res.json().then((data) => {
      return data
    })
  })
}

function updateZipcode(req, params) {
  return fetch('/ec/so/porder/zipcode', {
    method: 'POST',
    headers: {
      ...req.headers,
    },
    body: JSON.stringify(params),
  }).then((res) => {
    return res.json().then((data) => {
      return data
    })
  })
}

function getDefaultZipcode(req: NextRequest, params) {
  const allSearchParams = new URL(req.url).searchParams
  return fetch(`/ec/so/porder/zipcode?${allSearchParams.toString()}`, {
    method: 'GET',
    headers: {
      ...req.headers,
    },
  }).then((res) => {
    return res.json().then((data) => {
      return data
    })
  })
}

function isOverride(req) {
  return SET_DEFAULT_ZIPCODE_URLS.some((route) => {
    return minimatch(req.url, `${LANGUAGE_REGULAR}${route}`) || minimatch(req.url, route)
  })
}

export default async function zipcodeMiddware(request, response) {
  const globalState = JSON.parse(getValueFromReqHeaders(request, 'global-state') || '""')
  let porderInfo = null
  let defaultZipcodeInfo = null

  if (globalState) {
    porderInfo = globalState
  } else {
    porderInfo = await getSimpleInfo(request)
  }
  const isOverridePage = isOverride(request)
  const searchParams = new URL(request.url).searchParams
  const urlZipcode = searchParams.get('zipcode').replace(/\D/g, '') || ''

  if (urlZipcode) {
    if (!porderInfo.zipcode) {
      porderInfo = await createPorder(request, {
        zipcode: urlZipcode,
        zipcode_type: 'region',
      })
    } else {
      if (`${porderInfo.zipcode}` !== `${urlZipcode}`) {
        const res = await updateZipcode(request, { zipcode: urlZipcode })
        if (res === 'Success') {
          let orderInfo = await getSimpleInfo(request)
          if (orderInfo && orderInfo.zipcode) {
            porderInfo = orderInfo
          }
        }
      }
    }
  } else {
    if (!porderInfo.zipcode) {
      const resultZipCodeInfo = await getDefaultZipcode(request, {
        sales_org_id: searchParams.get('sales_org_id'),
        region_id: searchParams.get('region_id'),
      })
      if (resultZipCodeInfo && resultZipCodeInfo.result) {
        defaultZipcodeInfo = resultZipCodeInfo.object
      }
      porderInfo = await createPorder(request, {
        zipcode: defaultZipcodeInfo.zipcode || finalDefaultZipcode,
        zipcode_type: defaultZipcodeInfo.zipcode_type,
      })
    } else {
      if (isOverridePage) {
        const resultZipCodeInfo = await getDefaultZipcode(request, {
          sales_org_id: searchParams.get('sales_org_id'),
          region_id: searchParams.get('region_id'),
        })
        if (resultZipCodeInfo && resultZipCodeInfo.result) {
          defaultZipcodeInfo = resultZipCodeInfo.object
        }
        if (defaultZipcodeInfo.zipcode_type === 'region' && `${porderInfo.zipcode}` !== `${defaultZipcodeInfo.zipcode}`) {
          let result = await updateZipcode(request, { zipcode: defaultZipcodeInfo.zipcode })
          if (result === 'Success') {
            let orderInfo = await getSimpleInfo(request)
            if (orderInfo && orderInfo.zipcode) {
              porderInfo = orderInfo
            }
          }
        }
      }
    }
  }

  // 获取默认zipcode创建porder失败，再使用94538创建porder信息
  if (!(porderInfo || {}).zipcode) {
    porderInfo = await createPorder(request, {
      zipcode: finalDefaultZipcode,
      zipcode_type: 'default',
    })
  }

  const zipcode = porderInfo.zipcode || porderInfo.addr_zipcode
  //是否是生鲜直邮
  const isMof = String(porderInfo.is_mof ? 1 : 0)
  //切换zipcode之前是否支持直邮
  let preShippingOrder = getCookie('is_shipping_order_mobile') || '0'
  let preIsMof = getCookie('is_mof') || '0'

  const isShippingOrder = toShippingNumber(porderInfo.is_shipping_order)
  //是否从非直邮切换到直邮区域
  const isChangeShipArea = +(
    !!porderInfo.zipcode &&
    (preShippingOrder !== isShippingOrder || (preIsMof === '1' && isMof !== '1')) &&
    isShippingOrder === '1'
  )
  //是否从直邮区域切换到非直邮区域
  const isChangeDeliveryArea = +(!!porderInfo.zipcode && preShippingOrder !== isShippingOrder && isShippingOrder === '0')
  const isChangeMof = +(!!porderInfo.zipcode && isShippingOrder === '1' && preIsMof !== isMof && isMof === '1')

  setCookie('NEW_ZIP_CITY', porderInfo.addr_city || '')
  setCookie('NEW_ZIP_CODE', zipcode || '')
  setCookie('DELIVERY_DATE', porderInfo.delivery_pickup_date || '')
  setCookie('is_change_ship_area', `${isChangeShipArea}` || '')
  setCookie('is_change_delivery_area', `${isChangeDeliveryArea}` || '')
  setCookie('is_support_hotdish', porderInfo.is_support_hotdish || '0')
  setCookie('NEW_SALES_ORG_ID', porderInfo.sales_org_id || '')
  setCookie('is_shipping_order_mobile', isShippingOrder || '')
  setCookie('shipping_free_fee', porderInfo.shipping_free_fee || '')
  setCookie('shipping_fee', porderInfo.shipping_fee || '0')
  setCookie('pantry_free_fee', porderInfo.pantry_free_fee || '0')
  setCookie('pantry_fee', porderInfo.pantry_shipping_fee || '0')
  setCookie('order_token', porderInfo.token)
  setCookie('pre_order_id', porderInfo.id)

  setCookie('is_mof', isMof)
  setCookie('is_change_mof', `${+isChangeMof}`)
  setCookie('deal_id', porderInfo.deal_id)
  setCookie('is_support_change_date', porderInfo.is_support_change_date ? '1' : '0')
  setCookie(
    'select_address',
    `${porderInfo.address || ''}|${porderInfo.addr_firstname || ''}|${porderInfo.addr_lastname || ''}|${porderInfo.email || ''}|${
      porderInfo.phone || ''
    }|${porderInfo.comment || ''}`,
  )
}
