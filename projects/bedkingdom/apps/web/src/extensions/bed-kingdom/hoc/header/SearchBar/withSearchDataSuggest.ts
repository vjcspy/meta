import { useGetDataSuggest } from '@extensions/bed-kingdom/hook/search-bar/useGetDataSuggest';
import { createUiHOC } from '@web/ui-extension';

export default createUiHOC(() => {
  return useGetDataSuggest();
}, 'withSearchDataSuggest');
