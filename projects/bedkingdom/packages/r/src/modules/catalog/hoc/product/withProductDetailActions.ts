import { useProductDetailActions } from '@modules/catalog/hook/product/useProductDetailActions';
import { createUiHOC } from '@web/ui-extension';

export const withProductDetailActions = createUiHOC(
  () => useProductDetailActions(),
  'withProductDetailActions'
);
