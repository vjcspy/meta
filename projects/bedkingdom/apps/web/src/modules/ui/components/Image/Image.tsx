import { useImage } from '@main/packages-web-storefront/src/modules/content/hook/useImage';
import React from 'react';

const Image: React.FC<{
  width: number;
  height?: number;
  ratio?: number;
  src: any;
  alt?: string;
  placeholder?: any;
  onError?: (...agrs: any[]) => void;
  onLoad?: (...agrs: any[]) => void;
  overflow?: boolean;
}> = (props) => {
  const {
    onError,
    onLoad,
    width,
    height,
    ratio,
    src,
    alt = '',
    // overflow = false,
  } = props;
  const { handleImageLoad, handleError, resourceWidth, resourceHeight } =
    useImage({
      onError,
      onLoad,
      width,
      height,
      ratio,
    });

  return (
    <img
      alt={alt}
      height={resourceHeight}
      src={src}
      width={resourceWidth}
      onError={handleError}
      onLoad={handleImageLoad}
    />
  );
};

export default Image;
