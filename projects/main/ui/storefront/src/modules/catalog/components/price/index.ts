import type { ExtensionConfig } from '@web/ui-extension';

import Currency from './Currency';
import Price from './Price';

export * from './Price';
export const PRICE_CPT: ExtensionConfig[] = [
  {
    uiId: 'PRICE',
    uiTags: ['PRICE'],
    component: Price,
    priorityFn: () => 100,
  },
  {
    uiId: 'CURRENCY',
    uiTags: ['CURRENCY'],
    component: Currency,
    hoc: ['withPriceFormat'],
    priorityFn: () => 100,
  },
];
