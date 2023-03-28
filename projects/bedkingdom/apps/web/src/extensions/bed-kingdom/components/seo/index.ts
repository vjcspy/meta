import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const SEO_BED_KINGDOM_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'DEFAULT_SEO',
    component: dynamic(() => import('./DefaultSeo')),
    priority: 10,
  },
];
