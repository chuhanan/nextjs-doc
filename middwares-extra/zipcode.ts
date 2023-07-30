import { minimatch } from 'minimatch'
import { NextRequest, NextResponse } from 'next/server'
import { LANGUAGE_REGULAR } from '~/constants'
import { callApi } from '~/utils/axios'
import { getCookie, getShareData, setCookie } from '~/utils/cookies'
import { getValueFromReqHeaders } from '~/utils/req-headers'

const finalDefaultZipcode = '94538'
//默认创建porder走sales_org_id的页面
const SET_DEFAULT_ZIPCODE_URLS = ['/product/*/{0..9}*']

const toShippingNumber = (isShippingOrder) => (isShippingOrder ? '1' : '0')

async function getSimpleInfo(req: NextRequest, res: NextResponse) {
  return callApi('/ec/so/porder/simple', {
    method: 'GET',
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      'User-Agent': req.headers.get('User-Agent'),
      lang: 'zh',
      Platform: 'h5',
      'app-version': null,
      'b-cookie': `${getShareData('b_cookie', req, res)}`,
      'weee-session-token': +getShareData('weee_session_token', req, res),
      Authorization: `Bearer ${getShareData('auth_token', req, res)}`,
    },
  })
    .then((data) => {
      return data
    })
    .catch((e) => {
      console.log('getSimpleInfo error', e)
      return {}
    })
}

async function createPorder(params, req, res) {
  return callApi('/ec/so/porder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'User-Agent': req.headers.get('User-Agent'),
      lang: 'zh',
      Platform: 'h5',
      'app-version': null,
      'b-cookie': `${getShareData('b_cookie', req, res)}`,
      'weee-session-token': +getShareData('weee_session_token', req, res),
      Authorization: `Bearer ${getShareData('auth_token', req, res)}`,
    },
    body: JSON.stringify(params),
  })
}

async function updateZipcode(params, req, res) {
  return callApi('/ec/so/porder/zipcode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'User-Agent': req.headers.get('User-Agent'),
      lang: 'zh',
      Platform: 'h5',
      'app-version': null,
      'b-cookie': `${getShareData('b_cookie', req, res)}`,
      'weee-session-token': +getShareData('weee_session_token', req, res),
      Authorization: `Bearer ${getShareData('auth_token', req, res)}`,
    },
    body: JSON.stringify(params),
  })
}

async function getDefaultZipcode(params, req: NextRequest, res: NextResponse) {
  const allSearchParams = new URL(req.url).searchParams
  return callApi(`/ec/so/porder/zipcode?${allSearchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'User-Agent': req.headers.get('User-Agent'),
      lang: 'zh',
      Platform: 'h5',
      'app-version': null,
      'b-cookie': `${getShareData('b_cookie', req, res)}`,
      'weee-session-token': +getShareData('weee_session_token', req, res),
      Authorization: `Bearer ${getShareData('auth_token', req, res)}`,
    },
  })
}

function isOverride(req) {
  return SET_DEFAULT_ZIPCODE_URLS.some((route) => {
    return minimatch(req.url, `${LANGUAGE_REGULAR}${route}`) || minimatch(req.url, route)
  })
}

export default async function zipcodeMiddware(request, response: NextResponse) {
  const globalStateStr = getValueFromReqHeaders(request, 'global-state')
  const globalState = {} //JSON.parse(globalStateStr ? globalStateStr : '{}')
  let porderInfo: any = {}
  let defaultZipcodeInfo: any = {}

  if (Object.keys(globalState).length > 0) {
    porderInfo = globalState
  } else {
    porderInfo = await getSimpleInfo(request, response)
  }
  const isOverridePage = isOverride(request)
  const searchParams = new URL(request.url).searchParams
  const _searchZipcode = searchParams.get('zipcode') || ''

  const urlZipcode = _searchZipcode ? _searchZipcode.replace(/\D/g, '') : ''

  if (urlZipcode) {
    if (!porderInfo.zipcode) {
      porderInfo = await createPorder(
        {
          zipcode: urlZipcode,
          zipcode_type: 'region',
        },
        request,
        response,
      )
    } else {
      if (`${porderInfo.zipcode}` !== `${urlZipcode}`) {
        const res = await updateZipcode({ zipcode: urlZipcode }, request, response)
        if (res === 'Success') {
          let orderInfo = await getSimpleInfo(request, response)
          if (orderInfo && orderInfo.zipcode) {
            porderInfo = orderInfo
          }
        }
      }
    }
  } else {
    if (!porderInfo?.zipcode) {
      const resultZipCodeInfo = await getDefaultZipcode(
        {
          sales_org_id: searchParams.get('sales_org_id'),
          region_id: searchParams.get('region_id'),
        },
        request,
        response,
      )
      if (resultZipCodeInfo) {
        defaultZipcodeInfo = resultZipCodeInfo
      }
      porderInfo = await createPorder(
        {
          zipcode: defaultZipcodeInfo?.zipcode || finalDefaultZipcode,
          zipcode_type: defaultZipcodeInfo?.zipcode_type,
        },
        request,
        response,
      )
    } else {
      if (isOverridePage) {
        const resultZipCodeInfo = await getDefaultZipcode(
          {
            sales_org_id: searchParams.get('sales_org_id'),
            region_id: searchParams.get('region_id'),
          },
          request,
          response,
        )
        if (resultZipCodeInfo && resultZipCodeInfo.result) {
          defaultZipcodeInfo = resultZipCodeInfo.object
        }
        if (defaultZipcodeInfo.zipcode_type === 'region' && `${porderInfo.zipcode}` !== `${defaultZipcodeInfo.zipcode}`) {
          let result = await updateZipcode({ zipcode: defaultZipcodeInfo.zipcode }, request, response)
          if (result === 'Success') {
            let orderInfo = await getSimpleInfo(request, response)
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
    porderInfo = await createPorder(
      {
        zipcode: finalDefaultZipcode,
        zipcode_type: 'default',
      },
      request,
      response,
    )
  }
  const zipcode = porderInfo.zipcode || porderInfo.addr_zipcode
  //是否是生鲜直邮
  const isMof = String(porderInfo.is_mof ? 1 : 0)
  //切换zipcode之前是否支持直邮
  let preShippingOrder = getCookie('is_shipping_order_mobile', request) || '0'
  let preIsMof = getCookie('is_mof', request) || '0'

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

  setCookie('NEW_ZIP_CITY', porderInfo.addr_city || '', response)
  setCookie('NEW_ZIP_CODE', zipcode || '', response)
  setCookie('DELIVERY_DATE', porderInfo.delivery_pickup_date || '', response)
  setCookie('is_change_ship_area', `${isChangeShipArea}` || '', response)
  setCookie('is_change_delivery_area', `${isChangeDeliveryArea}` || '', response)
  setCookie('is_support_hotdish', porderInfo.is_support_hotdish || '0', response)
  setCookie('NEW_SALES_ORG_ID', porderInfo.sales_org_id || '', response)
  setCookie('is_shipping_order_mobile', isShippingOrder || '', response)
  setCookie('shipping_free_fee', porderInfo.shipping_free_fee || '', response)
  setCookie('shipping_fee', porderInfo.shipping_fee || '0', response)
  setCookie('pantry_free_fee', porderInfo.pantry_free_fee || '0', response)
  setCookie('pantry_fee', porderInfo.pantry_shipping_fee || '0', response)
  setCookie('order_token', porderInfo.token, response)
  setCookie('pre_order_id', porderInfo.id, response)

  setCookie('is_mof', isMof, response)
  setCookie('is_change_mof', `${+isChangeMof}`, response)
  setCookie('deal_id', porderInfo.deal_id, response)
  setCookie('is_support_change_date', porderInfo.is_support_change_date ? '1' : '0', response)
  setCookie(
    'select_address',
    `${porderInfo.address || ''}|${porderInfo.addr_firstname || ''}|${porderInfo.addr_lastname || ''}|${porderInfo.email || ''}|${
      porderInfo.phone || ''
    }|${porderInfo.comment || ''}`,
    response,
  )
}
