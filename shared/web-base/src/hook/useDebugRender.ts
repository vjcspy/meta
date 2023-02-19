import { useEffect } from 'react';

import { logRender } from '../lib/logger/console-template/logRender';
import { logUnmount } from '../lib/logger/console-template/logUnmount';
export const useDebugRender = (componentName: string) => {
  console.debug(logRender(componentName));
  useEffect(() => {
    const { unmountMessage, unmountCb } = logUnmount(componentName);

    return () => {
      console.debug(unmountMessage);
      unmountCb();
    };
  }, []);
};
