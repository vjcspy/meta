import isString from 'lodash/isString';
import { useCallback, useState } from 'react';

import { useDropdown } from '../useDropdown';

export const useSearchBar = (handleChange?: (value: string) => void) => {
  const { elementRef, expanded, setExpanded } = useDropdown();
  const [valid, setValid] = useState(false);
  const [value, setValue] = useState();

  // expand or collapse on input change
  const onChange = useCallback(
    (value: any | string) => {
      value = isString(value) ? value : value?.target?.value;
      setValue(value);
      const hasValue = !!value;
      const isValid = hasValue && value.length > 2;
      setValid(isValid);
      setExpanded(hasValue);

      if (hasValue && isValid && !!handleChange) {
        handleChange(value);
      }
    },
    [setExpanded, setValid]
  );

  // expand on focus
  const handleFocus = useCallback(() => {
    setExpanded(true);
  }, [setExpanded]);

  return {
    containerRef: elementRef,
    expanded,
    onChange,
    value,
    handleFocus,
    valid,
  };
};
