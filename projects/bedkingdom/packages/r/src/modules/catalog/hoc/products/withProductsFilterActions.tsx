import { useFilterActions } from '@modules/catalog/hook/products/useFilterActions';
import { createUiHOC } from '@web/ui-extension';

export const withProductsFilterActions = createUiHOC(() => {
  return useFilterActions();
}, 'withProductsFilterActions');
