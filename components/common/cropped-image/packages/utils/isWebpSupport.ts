import { TYPE_UNDEFINED } from '../constants/constants';
import { globalVar } from '../constants/globalVar';

import { testWebp } from './testWebpLoad';
/** 在加载该模块时对webp图片支持情况进行检测 */
(() => {
  if (typeof window === TYPE_UNDEFINED) return;
  if ('Modernizr' in window) return;
  testWebp();
})();

type IsWebpSupport = (reqHeaderAccept?: string) => boolean;

/** CSR场景下是否支持webp */
const isWebpSupportForCSR = () => {
  if (typeof window === TYPE_UNDEFINED) return false;
  if ('Modernizr' in window) return !!window.Modernizr.webp;
  if ('FeatureDetector' in globalVar) return !!globalVar.FeatureDetector?.webp;
  return false;
};

/** SSR场景下是否支持webp [reqHeaderAccept为req.header.accept] */
const isWebpSupportForSSR = (reqHeaderAccept?: string) => {
  const MIME_WEBP = 'image/webp';
  if (!reqHeaderAccept) return false;
  return reqHeaderAccept.indexOf(MIME_WEBP) > -1;
};

export const isWebpSupport: IsWebpSupport = reqHeaderAccept => {
  if (reqHeaderAccept) return isWebpSupportForSSR(reqHeaderAccept);
  if (typeof window !== TYPE_UNDEFINED) {
    return isWebpSupportForCSR();
  }
  return false;
};

export default isWebpSupport;
