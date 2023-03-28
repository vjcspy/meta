import { useProductData } from '@modules/catalog/hook/product/useProductData';
import { useProductDetailQueryHook } from '@modules/catalog/hook/product/useProductDetailQueryHook';
import { createUiHOC } from '@web/ui-extension';

export const withProductContainer = createUiHOC(
  () => useProductData(useProductDetailQueryHook),
  'withProductDataContainer'
);
