import { transparentPlaceholder } from '@modules/ui/components/Image/transparentPlaceholder';
import React from 'react';

const PlaceholderImage: React.FC<{
  width?: number;
  height?: number;
}> = (props) => {
  return (
    <img
      alt="placeholder"
      width={props.width}
      height={props.height}
      src={transparentPlaceholder}
    />
  );
};

export default PlaceholderImage;
