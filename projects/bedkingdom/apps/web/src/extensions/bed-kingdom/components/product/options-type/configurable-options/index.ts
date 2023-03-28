import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_PRODUCT_TYPE_OPTION_CONFIGURABLE_OPTIONS_CPT: ExtensionConfig[] =
  [
    {
      uiId: 'PRODUCT_TYPE_OPTIONS_CONFIGURABLE_OPTION_TITLE_LIST',
      component: dynamic(() => import('./TitleList')),
      priority: 90,
    },
  ];
