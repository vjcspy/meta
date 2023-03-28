import { useCallback, useState } from 'react';

import { useDropdown } from './useDropdown';

export const useSearchBar = (handleChange?: (value: string) => void) => {
  const {
    elementRef,
    expanded,
    setExpanded,
    expandedSuggest,
    setExpandedSuggest,
  } = useDropdown();
  const [valid, setValid] = useState(false);
  const [valueInput, setValueInput] = useState('');
  // expand or collapse on input change
  const onChange = useCallback(
    (val: any | string) => {
      const valueCheck = typeof val === 'string' ? val : val?.target?.value;
      setValueInput(valueCheck);
      const hasValue = !!valueCheck;
      const isValid = hasValue && valueCheck.length > 2;
      setValid(isValid);
      setExpanded(hasValue);
      setExpandedSuggest(!hasValue);

      if (hasValue && isValid && !!handleChange) {
        handleChange(valueCheck);
      } else {
        if (handleChange) {
          handleChange('');
        }
      }
    },
    [setExpanded, setValid]
  );

  // expand on focus
  const handleFocus = useCallback(() => {
    // @ts-ignore
    if (!!valueInput && valueInput.length > 2) {
      setExpanded(true);
    } else {
      setExpandedSuggest(true);
    }
  }, [setExpanded, valueInput]);

  return {
    containerRef: elementRef,
    expanded,
    setExpanded,
    onChange,
    valueInput,
    setValueInput,
    handleFocus,
    valid,
    expandedSuggest,
    setExpandedSuggest,
  };
};
