import { isSSR } from '@web/base/dist/util/isSSR';
import { useCallback, useRef, useState } from 'react';

import { useEventListener } from './useEventListener';

export const useDropdown = () => {
  const elementRef: any = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [expandedSuggest, setExpandedSuggest] = useState(false);

  // collapse on mousedown outside of the element and trigger.
  // @ts-ignore
  const maybeCollapse = useCallback(({ target }) => {
    const isOutsideElement =
      !elementRef.current || !elementRef.current.contains(target);

    // check absolute div
    if (typeof document !== 'undefined') {
      const aDiv = document.getElementsByClassName(
        'b-searchautocomplete__wrapper'
      );

      if (aDiv.length > 0) {
        for (let i = 0; i < aDiv.length; i++) {
          if (aDiv[i].contains(target)) {
            return;
          }
        }
      }
    }

    if (isOutsideElement) {
      setExpanded(false);
      setExpandedSuggest(false);
    }
  }, []);

  // add listener to document, as an effect
  useEventListener(!isSSR() ? document : undefined, 'mousedown', maybeCollapse);

  return {
    elementRef,
    expanded,
    setExpanded,
    expandedSuggest,
    setExpandedSuggest,
  };
};
