import { useHomePageCategoryData } from '@extensions/bed-kingdom/hook/home-category/useHomePageCategoryData';
import { createUiHOC } from '@web/ui-extension';

export default createUiHOC((props) => {
  return useHomePageCategoryData(props);
}, 'withHomePageCategoryData');
