import { createUiHOC } from '@web/ui-extension';

import { useCategoryData } from '../../hook/products/useCategoryData';

export const withCategoryData = createUiHOC(() => {
  return useCategoryData();
}, 'withCategoryData');
