import { ESTypes } from '../constants/constants';
import { getDevicePixelRatio } from './getDevicePixelRatio';

export const prototypeToString: (param: any) => string = param => {
  return Object.prototype.toString.call(param);
};

export const getSize = (size: number, devicePixelRatio?: number, max?: number): number => {
  if (prototypeToString(size) !== ESTypes.number || size < 0) return 0;
  const maxSize = max ?? 1024;
  const MINDEVICEPIXELRATIO = 1;
  // 设备DPI（SSR模式下，由于无法动态获取window宽度，需要手动传入合适的devicePixelRatio）
  const _devicePixelRatio =
    !devicePixelRatio || devicePixelRatio < MINDEVICEPIXELRATIO ? getDevicePixelRatio() : devicePixelRatio;

  let _size = Math.floor(size * _devicePixelRatio);
  _size = _size > maxSize ? maxSize : _size;
  return _size;
};
