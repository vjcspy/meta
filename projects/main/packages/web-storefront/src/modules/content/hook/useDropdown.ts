import { isSSR } from '@web/base/dist/util/isSSR';
import { useCallback, useRef, useState } from 'react';

import { useEventListener } from './useEventListener';

/**
 * A React Hook for adding dropdown-related logic.
 *
 * @kind function
 *
 * @return {Dropdown} An object containing functions and values to add dropdown logic
 */
export const useDropdown = () => {
  const elementRef: any = useRef(null);
  const [expanded, setExpanded] = useState(false);

  // collapse on mousedown outside of the element and trigger.
  // @ts-ignore
  const maybeCollapse = useCallback(({ target }) => {
    const isOutsideElement =
      !elementRef.current || !elementRef.current.contains(target);

    if (isOutsideElement) {
      setExpanded(false);
    }
  }, []);

  // add listener to document, as an effect
  useEventListener(!isSSR() ? document : undefined, 'mousedown', maybeCollapse);

  return {
    elementRef,
    expanded,
    setExpanded,
  };
};
