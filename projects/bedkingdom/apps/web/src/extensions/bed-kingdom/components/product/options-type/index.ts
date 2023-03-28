import { BEDKINGDOM_PRODUCT_TYPE_OPTION_CONFIGURABLE_OPTIONS_CPT } from '@extensions/bed-kingdom/components/product/options-type/configurable-options';
import { BEDKINGDOM_PRODUCT_CUSTOMIZABLE_OPTIONS_EXT_CFG } from '@extensions/bed-kingdom/components/product/options-type/customizable-options';
import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_PRODUCT_OPTIONS_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'BEDKINGDOM_PRODUCT_OPTIONS_CUSTOMIZABLE',
    component: dynamic(() => import('./CustomizableOptions')),
    priority: 90,
  },
  ...BEDKINGDOM_PRODUCT_CUSTOMIZABLE_OPTIONS_EXT_CFG,
  ...BEDKINGDOM_PRODUCT_TYPE_OPTION_CONFIGURABLE_OPTIONS_CPT,
];
