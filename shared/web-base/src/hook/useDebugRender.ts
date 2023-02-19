import { useEffect } from 'react';

import { logRender } from '../lib/logger/console-template/logRender';
import { logUnmount } from '../lib/logger/console-template/logUnmount';
export const useDebugRender = (componentName: string) => {
  /*
   * console.debug run 2 times
   * */
  console.info(logRender(componentName));
  useEffect(() => {
    const { unmountMessage, unmountCb } = logUnmount(componentName);

    return () => {
      console.info(unmountMessage);
      unmountCb();
    };
  }, []);
};
