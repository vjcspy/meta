import { isSSR } from '@web/base/dist/util/isSSR';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useCallback, useMemo } from 'react';

export const useBodyScroll = () => {
  const body: any = useMemo(() => {
    if (!isSSR()) {
      return document.getElementById('__next');
    }
    return undefined;
  }, []);

  const disableScroll = useCallback(() => {
    if (body) disableBodyScroll(body);
  }, [body]);

  const enableScroll = useCallback(() => {
    if (body) enableBodyScroll(body);
  }, [body]);

  return {
    body,
    disableScroll,
    enableScroll,
  };
};
