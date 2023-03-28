import { useUiContext } from '@modules/ui/context/ui';
import { useWindowDimensions } from '@web/base/dist/hook/useWindowDimensions';
import { isSSR } from '@web/base/dist/util/isSSR';
import get from 'lodash/get';
import { useEffect, useMemo, useState } from 'react';

export const useImageSizeBaseOnCfg = (
  uiConfigPath: string[],
  widthWindowRatio?: number,
  fixWidth?: number,
  fixHeight?: number
) => {
  const uiContextValue = useUiContext();
  const { width: windowWidth } = useWindowDimensions();
  const [size, setSize] = useState<{
    width?: number;
    height?: number;
  }>();

  const ratio = useMemo(
    () => get(uiContextValue?.uiConfig, [...uiConfigPath, 'value']),
    [uiContextValue]
  );

  useEffect(() => {
    if (isSSR()) {
      return;
    }

    let tSize: any = {};
    if (typeof widthWindowRatio !== 'undefined') {
      tSize = { width: parseInt(widthWindowRatio * windowWidth! + '') };
    } else if (typeof fixWidth !== 'undefined') {
      tSize = { ...size, width: fixWidth };
    } else if (typeof fixHeight !== 'undefined') {
      tSize = { ...size, height: fixHeight };
    }

    if (!isNaN(ratio)) {
      if (!tSize?.height && !!tSize?.width) {
        tSize = { ...tSize, height: parseInt(tSize.width / ratio + '') };
      } else if (!tSize?.width && !!tSize?.height) {
        tSize = { ...tSize, width: parseInt(tSize.height * ratio + '') };
      }
    }

    setSize(tSize);
  }, [ratio, windowWidth, fixWidth, fixHeight]);

  return { height: size?.height, width: size?.width };
};
