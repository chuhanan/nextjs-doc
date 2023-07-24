const TYPE_STRING = '[object String]';
const TYPE_OBJECT = '[object Object]';
const TYPE_NUMBER = '[object Number]';
const TYPE_BOOLEAN = '[object Boolean]';
const TYPE_FUNCTION = '[object Function]';

export const ESTypes = {
  string: TYPE_STRING,
  object: TYPE_OBJECT,
  number: TYPE_NUMBER,
  boolean: TYPE_BOOLEAN,
  function: TYPE_FUNCTION
};

export const TYPE_UNDEFINED = 'undefined';

export const EXACT_FORMAT_MAP = {
  JPEG: 'jpeg',
  WEBP: 'webp',
  PNG: 'png',
  TIFF: 'tiff'
};

export const FORMAT_MAP = {
  ...EXACT_FORMAT_MAP,
  AUTO: 'auto',
  ORIGINAL: 'original'
};

/** CDN白名单 */
export const CDNWhiteList = [
  'static.weeecdn.com',
  'img06.weeecdn.com',
  'video.sayweeecdn.com',
  'cdn.sayweee.net',
  'cdn02.sayweee.net',
  'cdn01.sayweee.net',
  'images-static.sayweeecdn.com',
  'img01.sayweeecdn.com',
  'images01.sayweeecdn.com',
  'img.test.weeecdn.com',
  'img06.test.weeecdn.com',
  'static.weeecdn.com',
];

export enum ImgLoadStatus {
  loading = 'loading',
  loaded = 'loaded',
  loadError = 'loadError'
}
