import { useEffect } from 'react';

import { formatRender } from '../lib/logger/console-template/format-render';
import { formatUnmount } from '../lib/logger/console-template/format-unmount';
export const useDebugRender = (componentName: string) => {
  /*
   * console.debug run 2 times
   * */
  console.info(formatRender(componentName));
  useEffect(() => {
    const { unmountMessage, unmountCb } = formatUnmount(componentName);

    return () => {
      console.info(unmountMessage);
      unmountCb();
    };
  }, []);
};
