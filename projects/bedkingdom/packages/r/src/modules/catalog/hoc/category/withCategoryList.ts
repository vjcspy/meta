import { useCategoryList } from '@modules/catalog/hook/category/useCategoryList';
import { createUiHOC } from '@web/ui-extension';

export const withCategoryList = createUiHOC(
  (props) => useCategoryList(props),
  'withCategoryList'
);
