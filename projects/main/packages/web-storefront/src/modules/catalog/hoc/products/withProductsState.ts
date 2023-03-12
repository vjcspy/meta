import { createUiHOC } from '@web/ui-extension';

import { useProductsState } from '../../hook/products/useProductsState';

export const withProductsState = createUiHOC(() => {
  return useProductsState();
}, 'withProductsState');
