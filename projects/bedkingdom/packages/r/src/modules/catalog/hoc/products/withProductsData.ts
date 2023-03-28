import { useProductsState } from '@modules/catalog/hook/products/useProductsState';
import { createUiHOC } from '@web/ui-extension';

export const withProductsState = createUiHOC(() => {
  return useProductsState();
}, 'withProductsState');
