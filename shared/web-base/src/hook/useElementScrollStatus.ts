import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { useEffect, useMemo, useRef, useState } from 'react';

export const useElementScrollStatus = (elem: HTMLElement) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollInfo = useRef<{
    lastY: number;
    currentY: number;
  }>();

  const debounceUpdateScrollStatus = useMemo(() => {
    return debounce((_scroll: boolean, elem: HTMLElement) => {
      setIsScrolling(_scroll);
    }, 500);
  }, []);

  const handleUpdateScrollInfo = useMemo(() => {
    return throttle((elem: HTMLElement, event: any) => {
      if (
        !scrollInfo?.current?.lastY ||
        !scrollInfo?.current?.currentY ||
        scrollInfo?.current?.currentY > scrollInfo?.current?.lastY + 10
      ) {
        setIsScrolling(true);
      }
      scrollInfo.current = {
        lastY: scrollInfo?.current?.currentY ?? 0,
        currentY: elem.scrollTop,
      };
      debounceUpdateScrollStatus(false, elem);
    }, 200);
  }, []);

  useEffect(() => {
    if (elem) {
      // @ts-ignore
      elem.addEventListener('scroll', (event) =>
        handleUpdateScrollInfo(elem, event)
      );

      return () => {
        // return a cleanup function to unregister our function since its gonna run multiple times
        elem.removeEventListener('scroll', (event) =>
          handleUpdateScrollInfo(elem, event)
        );
      };
    }
  }, [elem]);

  return {
    isScrolling,
  };
};
