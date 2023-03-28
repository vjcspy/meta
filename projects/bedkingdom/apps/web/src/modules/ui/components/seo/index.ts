import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const SEO_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'DEFAULT_SEO',
    component: dynamic(() => import('./DefaultSeo')),
    priority: 100,
  },
];
