import { createUiHOC } from '@web/ui-extension';

import { useProductsContainer } from '../../hook/products/useProductsContainer';

export const withWebProductsContainer = createUiHOC(() => {
  return useProductsContainer();
}, 'withWebProductsContainer');
