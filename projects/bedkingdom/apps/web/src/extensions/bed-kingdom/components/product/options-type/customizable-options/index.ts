import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_PRODUCT_CUSTOMIZABLE_OPTIONS_EXT_CFG: ExtensionConfig[] =
  [
    {
      uiId: 'PRODUCT_CUSTOMIZABLE_SELECT_OPTION',
      component: dynamic(() => import('./Select')),
    },
    {
      uiId: 'PRODUCT_CUSTOMIZABLE_MULTIPLE_SELECT_OPTION',
      component: dynamic(() => import('./SelectMulti')),
    },
  ];
