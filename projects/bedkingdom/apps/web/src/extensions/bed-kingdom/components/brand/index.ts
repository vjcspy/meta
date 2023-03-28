import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BED_BRAND_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'BEDKINGDOM_BRAND_LIST',
    component: dynamic(() => import('./BrandListContainer')),
  },
];
