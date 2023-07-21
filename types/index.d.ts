declare interface AResponse<T = any> {
  message_id: string
  result: boolean
  message: string
  object: T
}

declare interface BResponse {
  messageId: string
  success: boolean
  body: any
  enError?: string
}

declare interface ObjectType {
  [key: string]: any
}
declare interface Window {
  __functionIndexMap: {
    [key as any]: any
  }
  fbAsyncInit: any
  googleAuth: any
  FB: any
  Clipboard: any
  wx: any
  dataLayer: any
  gtag: any
  pixelAddToCart: any
  pixelProductImpression: any
  pixelProductDetailImpression: any
  pixelCheckout: any
  __checkoutData: any
  pixelPurchase: any
  pixelRegistration: any
  pixelLogin: any
  bus: any
  ENV: any
  gapi: any
  safari: any
  applicationCache: any
  openDatabase: any
  webkitRequestFileSystem: any
  WeixinJSBridge: any
  _smReadyFuncs: any
  _smConf: any
  ResizeObserver: any
  FontFace: any
  WeeeTracker: any
  _weeeTracker: any
  _oldWeeeTracker: any
  weeeDataLayer: any[]
  trackParams: any
  __weeeLayers: any
}
declare interface Document {
  attachEvent: any
}
declare interface Navigator {
  __functionIndexMap: {
    [key as any]: any
  }
  msSaveBlob: any
  opr: any
  brave: any
  webkitTemporaryStorage: any
}
declare interface CSSStyleDeclaration {
  __functionIndexMap: {
    [key as any]: any
  }
  MozAppearance: any
}
declare interface Performance {
  __functionIndexMap: {
    [key as any]: any
  }
  memory: any
}
