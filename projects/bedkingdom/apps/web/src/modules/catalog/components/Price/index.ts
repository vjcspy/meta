import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export * from './Price';
export const PRICE_CPT: ExtensionConfig[] = [
  {
    uiId: 'PRICE',
    component: dynamic(() => import('./Price')),
    hoc: [],
    priorityFn: () => 100,
  },
  {
    uiId: 'CURRENCY',
    component: dynamic(() => import('./Currency')),
    priorityFn: () => 100,
  },
];
