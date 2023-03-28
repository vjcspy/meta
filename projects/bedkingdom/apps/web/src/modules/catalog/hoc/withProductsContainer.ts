import { useProductsContainer } from '@modules/catalog/hook/products/useProductsContainer';
import { useProductsQuery } from '@vjcspy/r/build/modules/catalog/hook/products/useProductsQuery';
import { createUiHOC } from '@web/ui-extension';

export const withProductsContainer = createUiHOC(() => {
  return useProductsContainer(useProductsQuery);
}, 'withWebProductsContainer');
