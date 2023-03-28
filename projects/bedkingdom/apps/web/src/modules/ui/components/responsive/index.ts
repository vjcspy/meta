import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const RESPONSIVE_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'ONLY_MOBILE',
    component: dynamic(() => import('./OnlyMobile')),
  },
  {
    uiId: 'ONLY_DESKTOP',
    component: dynamic(() => import('./OnlyDesktop')),
  },
];
