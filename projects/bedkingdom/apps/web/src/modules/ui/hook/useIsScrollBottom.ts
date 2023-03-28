import throttle from 'lodash/throttle';
import { useCallback, useEffect, useState } from 'react';

export const useIsScrollBottom = (element: any) => {
  const [isBottom, setIsBottom] = useState(false);
  const listener = useCallback(
    throttle(() => {
      if (typeof element === 'undefined') {
        return;
      }
      const offset =
        element?.getBoundingClientRect()?.top -
        element?.offsetParent?.getBoundingClientRect()?.top;
      const top = window.scrollY + window.innerHeight - offset;
      if (element && element?.scrollHeight && top >= element?.scrollHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    }, 100),
    [element]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.addEventListener('scroll', listener, { passive: false });

    // return a callback, which is called on unmount
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [listener]);

  return {
    isBottom,
  };
};
