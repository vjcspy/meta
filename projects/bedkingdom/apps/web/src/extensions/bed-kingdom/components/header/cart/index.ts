import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_CART_HEADER_ITEM_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'CART_HEADER_ITEM',
    component: dynamic(() => import('./CartHeaderItem')),
    priorityFn: () => 100,
  },
  {
    uiId: 'CART_HEADER_ITEM_QTY',
    component: dynamic(() => import('./CartHeaderItemQty')),
    priorityFn: () => 100,
  },
];
