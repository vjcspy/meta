import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_PRODUCT_ITEM_VERTICAL_CFG: ExtensionConfig[] = [
  {
    uiId: 'PRODUCT_LISTING_ITEM_VERTICAL',
    component: dynamic(() => import('./ProductListingItemVertical')),
  },
  {
    uiId: 'PRODUCT_LISTING_ITEM_VERTICAL_CONFIGURABLE',
    component: dynamic(
      () => import('./ProductListingItemVerticalConfigurable')
    ),
  },
  {
    uiId: 'PRODUCT_LISTING_ITEM_VERTICAL_SIMPLE',
    component: dynamic(() => import('./ProductListingItemVerticalSimple')),
  },
];
