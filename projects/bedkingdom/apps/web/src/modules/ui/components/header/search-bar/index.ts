import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

const HEADER_SEARCH_BAR_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'HEADER_SEARCH_BAR',
    component: dynamic(() => import('./SearchBar')),
    priorityFn: () => 100,
  },
  {
    uiId: 'HEADER_SEARCH_BAR_SEARCH_FIELD',
    component: dynamic(() => import('./SearchField')),
    priorityFn: () => 100,
  },
  {
    uiId: 'HEADER_SEARCH_BAR_AUTO_COMPLETE',
    component: dynamic(() => import('./AutoComplete')),
    priorityFn: () => 100,
  },
];

export default HEADER_SEARCH_BAR_EXT_CFG;
