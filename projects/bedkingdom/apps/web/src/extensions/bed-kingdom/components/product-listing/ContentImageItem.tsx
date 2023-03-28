import { useImageSizeBaseOnCfg } from '@modules/ui/hook/useImageSizeBaseOnCfg';
import { UiExtension } from '@web/ui-extension';
import React from 'react';

const ContentImageItem: React.FC<{
  label?: string;
  imgSrc: string;
  width: number;
}> = (props) => {
  const { width, height } = useImageSizeBaseOnCfg(
    ['product', 'default_image_w_h'],
    undefined,
    props?.width,
    undefined
  );

  return (
    <UiExtension
      uiId="IMAGE"
      alt={props.label}
      src={props.imgSrc}
      height={height}
      width={width}
    />
  );
};

export default ContentImageItem;
