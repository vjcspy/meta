import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const CART_RESOLVED_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'CART_RESOLVE_LOADING',
    component: dynamic(() => import('./CartResolveLoading')),
    priority: 100,
  },
];
