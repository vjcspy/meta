import Image from 'next/image';
import React from 'react';

const DefaultImage: React.FC<{
  src: any;
  alt?: any;
  width: number;
  height: number;
}> = (props) => {
  return (
    <Image
      src={props.src}
      alt={props?.alt ?? ''}
      width={props.width}
      height={props.height}
      quality="100"
      layout={
        typeof props?.width === 'undefined' ||
        typeof props?.height === 'undefined'
          ? 'fill'
          : undefined
      }
      // placeholder={
      //   typeof props?.src === 'string' && props.src.indexOf('base64') > -1
      //     ? undefined
      //     : 'blur'
      // }
      // onLoadingComplete={(result) =>
      //   reCalculateSizeBaseOnOrigin(result.naturalWidth / result.naturalHeight)
      // }
    />
  );
};

export default DefaultImage;
