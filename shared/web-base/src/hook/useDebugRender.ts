import { isDevelopment } from 'chitility/dist/util/environment';
import { useEffect } from 'react';

import { formatRender } from '../lib/logger/console-template/format-render';
import { formatUnmount } from '../lib/logger/console-template/format-unmount';
import { isSSR } from '../util/isSSR';

export const useDebugRender = (componentName: string) => {
  /*
   * console.debug run 2 times
   * */
  if (isDevelopment() && !isSSR()) {
    console.info(formatRender(componentName));
  }

  useEffect(() => {
    if (isDevelopment()) {
      const { unmountMessage, unmountCb } = formatUnmount(componentName);

      return () => {
        console.info(unmountMessage);
        unmountCb();
      };
    }
  }, []);
};
