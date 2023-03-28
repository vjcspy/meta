import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_ACCOUNT_ADDRESS_CONFIGS: ExtensionConfig[] = [
  {
    uiId: 'FORM_DETAIL_ADDRESS',
    component: dynamic(() => import('./FromDetailAddress')),
  },
];
