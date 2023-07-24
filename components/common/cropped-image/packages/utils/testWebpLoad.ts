import { TYPE_UNDEFINED } from '../constants/constants';
import { globalVar } from '../constants/globalVar';

const testImageLoad = (uri: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(true);
    });
    image.addEventListener('error', () => {
      resolve(false);
    });
    image.src = uri;
  });
};

export const testWebp = () => {
  if (typeof window === TYPE_UNDEFINED) return;
  if (globalVar.FeatureDetector.webp) return;
  const webpTests = [
    {
      uri: 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
      name: 'webp'
    },
    {
      uri:
        'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==',
      name: 'webp.alpha'
    },
    {
      uri:
        'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
      name: 'webp.animation'
    },
    {
      uri: 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
      name: 'webp.lossless'
    }
  ];
  const webp = webpTests.shift();

  if (!('FeatureDetector' in globalVar)) {
    (globalVar as any).FeatureDetector = {};
  }

  testImageLoad(webp?.uri as string).then(res => {
    globalVar.FeatureDetector.webp = res;
  });
  return globalVar.FeatureDetector.webp;
};
