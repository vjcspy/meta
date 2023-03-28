import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const TRUST_PILOT_CFG: ExtensionConfig[] = [
  {
    uiId: 'BEDKINGDOM_TRUST_PILOT',
    component: dynamic(() => import('./TrustPilot')),
  },
  {
    uiId: 'BEDKINGDOM_TRUST_PILOT_ITEM',
    component: dynamic(() => import('./TrustPilotItem')),
  },
  {
    uiId: 'BEDKINGDOM_TRUST_PILOT_START_SINGLE',
    component: dynamic(() => import('./TrustPilotStartSingle')),
  },
  {
    uiId: 'BEDKINGDOM_TRUST_PILOT_START_AND_REVIEW',
    component: dynamic(() => import('./TrustPilotStartAndReview')),
  },
  {
    uiId: 'BEDKINGDOM_TRUST_PILOT_START_ON_LIST_ITEM',
    component: dynamic(() => import('./TrustPilotStartOnListItem')),
  },
];
