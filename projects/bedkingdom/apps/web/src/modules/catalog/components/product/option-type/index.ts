import { PRODUCT_TYPE_OPTION_CONFIGURABLE_OPTIONS_CPT } from '@modules/catalog/components/product/option-type/configurable-options';
import { PRODUCT_TYPE_OPTION_CUSTOMIZABLE_OPTIONS_CPT } from '@modules/catalog/components/product/option-type/customizable-options';
import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const PRODUCT_OPTIONS_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'PRODUCT_OPTIONS_CONFIGURABLE',
    component: dynamic(() => import('./ConfigurableOptions')),
  },
  {
    uiId: 'PRODUCT_OPTIONS_CUSTOMIZABLE',
    component: dynamic(() => import('./CustomizableOptions')),
  },
  ...PRODUCT_TYPE_OPTION_CONFIGURABLE_OPTIONS_CPT,
  ...PRODUCT_TYPE_OPTION_CUSTOMIZABLE_OPTIONS_CPT,
];
