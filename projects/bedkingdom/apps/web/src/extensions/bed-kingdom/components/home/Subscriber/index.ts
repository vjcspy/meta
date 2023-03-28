import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const HOME_SUBSCRIBER_CONTENT_CFG: ExtensionConfig[] = [
  {
    uiId: 'BEDKINGDOM_HOME_CONTENT_SUBSCRIBER',
    component: dynamic(() => import('./SubscriberContent')),
  },
];
