import { useProductCategoryBaseOnUrl } from '@modules/catalog/hook/product/useProductCategoryBaseOnUrl';
import { createUiHOC } from '@web/ui-extension';

export const withProductCategoryBaseOnUrl = createUiHOC(() => {
  return useProductCategoryBaseOnUrl();
}, 'withProductCategoryBaseOnUrl');
