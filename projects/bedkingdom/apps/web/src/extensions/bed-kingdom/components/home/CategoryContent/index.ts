import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_CATEGORY_CONTENT_CFG: ExtensionConfig[] = [
  {
    uiId: 'BEDKINGDOM_HOME_CATEGORY_HORIZONTAL_CONTAINER',
    component: dynamic(() => import('./CategoryHorizontal.container')),
  },
  {
    uiId: 'BEDKINGDOM_HOME_CATEGORY_HORIZONTAL_PLACEHOLDER',
    component: dynamic(() => import('./CategoryHorizontal.placeholder')),
  },
  {
    uiId: 'BEDKINGDOM_HOME_CATEGORY_HORIZONTAL',
    component: dynamic(() => import('./CategoryHorizontal')),
  },
  {
    uiId: 'BEDKINGDOM_HOME_CATEGORY_VERTICAL',
    component: dynamic(() => import('./CategoryVertical')),
  },
];
