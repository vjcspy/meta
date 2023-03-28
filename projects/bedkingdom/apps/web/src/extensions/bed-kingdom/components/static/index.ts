import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const KINGDOMBED_STATIC_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'KINGDOMBED_SERVICES',
    component: dynamic(() => import('./Services')),
  },
  {
    uiId: 'KINGDOMBED_SERVICES_PLACEHOLDER',
    component: dynamic(() => import('./Services.placeholder')),
  },
  {
    uiId: '404',
    component: dynamic(() => import('./NotFound')),
  },
];
