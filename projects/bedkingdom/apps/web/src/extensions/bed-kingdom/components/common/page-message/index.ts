import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKING_ALERT_EXTENSION_CONFIG: ExtensionConfig[] = [
  {
    uiId: 'ALERT_SHOW',
    component: dynamic(() => import('./AlertShow')),
  },
];
