import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_MOBILE_SEARCH_HEADER_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'MOBILE_HEADER_SEARCH_BAR',
    uiTags: ['MOBILE_HEADER_SEARCH_BAR'],
    component: dynamic(() => import('./MobileSearchBar')),
    priorityFn: () => 100,
  },
  {
    uiId: 'MOBILE_HEADER_SEARCH_BAR_SEARCH_FIELD',
    uiTags: ['MOBILE_HEADER_SEARCH_BAR_SEARCH_FIELD'],
    component: dynamic(() => import('./MobileSearchField')),
    priorityFn: () => 100,
  },
  {
    uiId: 'HEADER_SEARCH_BAR_SUGGEST_TEXT',
    component: dynamic(() => import('./SuggestSearchText')),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCT_ITEM_RESULT_SEARCH',
    uiTags: ['PRODUCT_ITEM_RESULT_SEARCH'],
    component: dynamic(() => import('./ProductItemResultSearch')),
    priorityFn: () => 100,
  },
];
