import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const WEB_LOADING_INDICATOR_CPT: ExtensionConfig[] = [
  {
    uiId: 'LOADING_INDICATOR',
    component: dynamic(() => import('./indicator')),
    priority: 100,
  },
  {
    uiId: 'INFINITE_SCROLL_LOADING',
    component: dynamic(() => import('./InfiniteScrollLoading')),
    priority: 100,
  },
];
