import { useCategoryFromMgt } from '@modules/catalog/hook/category/useCategoryFromMgt';
import { createUiHOC } from '@web/ui-extension';

export const withCategoryFromMgt = createUiHOC(
  (props) => useCategoryFromMgt(props),
  'withCategoryFromMgt'
);
