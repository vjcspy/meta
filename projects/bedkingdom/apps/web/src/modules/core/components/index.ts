import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const TEST_CPT_CFG: ExtensionConfig[] = [
  {
    uiId: 'TEST_TAILWIND',
    component: dynamic(() => import('./test/Tailwind')),
  },
  {
    uiId: 'TEST_PRODUCT_SSR',
    component: dynamic(() => import('./test/TestProductSSR')),
  },
];
