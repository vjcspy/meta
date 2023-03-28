import { selectSearchString } from '@vjcspy/r/build/modules/catalog/store/products/products.selectors';
import { createUiHOC } from '@web/ui-extension';
import { useSelector } from '@main/packages-web-redux';

export const withStringSearchData = createUiHOC(() => {
  const searchString = useSelector(selectSearchString);
  return {
    state: { searchString },
  };
}, 'withStringSearchData');
