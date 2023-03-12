import { createUiHOC } from '@web/ui-extension';

import { useSearchBar } from '../../hook/search-bar/useSearchBar';
import { useSearchBarContainer } from '../../hook/search-bar/useSearchBarContainer';

export const withSearchBar = createUiHOC(() => {
  const { categories, products, message, handleSubmit, handleChange } =
    useSearchBarContainer();

  const { containerRef, expanded, handleFocus, onChange, valid, value } =
    useSearchBar(handleChange);

  return {
    isOpen: true,
    categories,
    products,
    message,
    handleSubmit,
    containerRef,
    expanded,
    handleFocus,
    onChange,
    valid,
    value,
  };
}, 'withSearchBar');
