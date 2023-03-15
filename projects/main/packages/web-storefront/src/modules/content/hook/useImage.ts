import { useCallback, useMemo, useState } from 'react';

/**
 * Returns props to render an Image component.
 *
 * @param {function} props.onError callback for error of loading image
 * @param {function} props.onLoad callback for load of image
 * @param {number}   props.width the intrinsic width of the image & the width to request for the fallback image for browsers that don't support srcset / sizes.
 * @param {number}   props.height the intrinsic height of the image & the height to request for the fallback image for browsers that don't support srcset / sizes.
 * @param {number}   props.ratio is the image width to height ratio. Defaults to `DEFAULT_WIDTH_TO_HEIGHT_RATIO` from `util/images.js`.
 * @param {Map}      props.widths a map of breakpoints to possible widths used to create the img's sizes attribute.
 */
export const useImage = (props: {
  onError?: (...args: any[]) => void;
  onLoad?: (...args: any[]) => void;
  width: number;
  height?: number;
  ratio?: number;
}) => {
  const { onError, onLoad, width, height, ratio } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    if (typeof onLoad === 'function') {
      onLoad();
    }
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);

    if (typeof onError === 'function') {
      onError();
    }
  }, [onError]);

  // Use the unconstrained / default entry in widths.
  const resourceWidth = useMemo(() => {
    if (width) {
      return width;
    } else if (height && ratio) {
      return Math.ceil(height * ratio);
    } else {
      return undefined;
    }
  }, [width, height]);

  const resourceHeight = useMemo(() => {
    if (height) {
      return height;
    } else if (resourceWidth && ratio) {
      return Math.ceil(resourceWidth / ratio);
    } else {
      return undefined;
    }
  }, [height, ratio, resourceWidth]);

  return {
    handleError,
    handleImageLoad,
    hasError,
    isLoaded,
    resourceWidth,
    resourceHeight,
  };
};
