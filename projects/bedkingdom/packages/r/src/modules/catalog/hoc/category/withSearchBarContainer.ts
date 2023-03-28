import { useSearchBarContainer } from '@modules/catalog/hook/category/useSearchBarContainer';
import { createUiHOC } from '@web/ui-extension';

export const withSearchBarContainer = createUiHOC(() => {
  return useSearchBarContainer();
}, 'withSearchBarContainer');
