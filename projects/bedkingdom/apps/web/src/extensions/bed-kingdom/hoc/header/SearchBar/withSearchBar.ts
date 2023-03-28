import { useSearchBarContainer } from '@extensions/bed-kingdom/hook/search-bar/useSearchBarContainer';
import { useSearchBar } from '@modules/ui/hook/header/search-bar/useSearchBar';
import { createUiHOC } from '@web/ui-extension';

export default createUiHOC(() => {
  const {
    products,
    handleSubmit,
    handleChange,
    message,
    countProduct,
    loading,
  } = useSearchBarContainer();

  const {
    containerRef,
    expanded,
    setExpanded,
    handleFocus,
    onChange,
    valid,
    valueInput,
    setValueInput,
    expandedSuggest,
    setExpandedSuggest,
  } = useSearchBar(handleChange);

  return {
    isOpen: true,
    message,
    products,
    handleSubmit,
    containerRef,
    expanded,
    setExpanded,
    handleFocus,
    onChange,
    valid,
    valueInput,
    countProduct,
    expandedSuggest,
    setExpandedSuggest,
    setValueInput,
    loading,
  };
}, 'withSearchBar');
