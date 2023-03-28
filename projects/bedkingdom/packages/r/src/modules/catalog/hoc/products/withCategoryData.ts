import { useCategoryData } from '@modules/catalog/hook/products/useCategoryData';
import { createUiHOC } from '@web/ui-extension';

export const withCategoryData = createUiHOC(() => {
  return useCategoryData();
}, 'withCategoryData');
