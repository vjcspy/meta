import { PRODUCT_OPTIONS_EXT_CFG } from '@modules/catalog/components/product/option-type';
import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const PRODUCT_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'PRODUCT',
    uiTags: ['PRODUCT'],
    component: dynamic(() => import('./Product')),
    priority: () => 100,
  },
  ...PRODUCT_OPTIONS_EXT_CFG,
];
