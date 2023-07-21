import { useCallback, useEffect, useState } from 'react';
import { ImgLoadStatus } from '../constants/constants';

export const useLoadImage = ({ src, onLoad, onError }) => {
  const [imgLoadStatus, setImgLoadStatus] = useState<ImgLoadStatus>();

  const handleImgLoad = useCallback(
    event => {
      setImgLoadStatus(ImgLoadStatus.loaded);
      onLoad?.(event);
    },
    [onLoad]
  );

  const handleImgLoadError = useCallback(
    event => {
      setImgLoadStatus(ImgLoadStatus.loadError);
      onError?.(event);
    },
    [onError]
  );

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.addEventListener('load', handleImgLoad);
    img.addEventListener('error', handleImgLoadError);
    img.src = src;
    setImgLoadStatus(ImgLoadStatus.loading);

    return () => {
      img.removeEventListener('load', handleImgLoad);
      img.removeEventListener('error', handleImgLoadError);
    };
  }, [handleImgLoad, handleImgLoadError, src]);
  return {
    loadStatus: imgLoadStatus
  };
};
