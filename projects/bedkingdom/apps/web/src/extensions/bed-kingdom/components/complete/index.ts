import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const ORDER_COMPLETE_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'ORDER_COMPLETE',
    component: dynamic(() => import('./OrderComplete')),
  },
];
