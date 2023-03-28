import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOMN_BANNER_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'BEDKINGDOM_HOME_BANNER_CONTAINER',
    component: dynamic(() => import('./Banner.container')),
  },
  {
    uiId: 'BEDKINGDOM_HOME_BANNER_PLACEHOLDER',
    component: dynamic(() => import('./Banner.placeholder')),
  },
  {
    uiId: 'BEDKINGDOM_HOME_BANNER',
    component: dynamic(() => import('./Banner')),
  },
];
