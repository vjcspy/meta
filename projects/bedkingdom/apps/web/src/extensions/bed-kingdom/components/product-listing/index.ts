import { BEDKINGDOM_PRODUCT_ITEM_VERTICAL_CFG } from '@extensions/bed-kingdom/components/product-listing/list-item-vertical';
import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_PRODUCT_CFG: ExtensionConfig[] = [
  {
    uiId: 'BEDKINGDOM_PRODUCT_LISTING_ITEM',
    component: dynamic(() => import('./ProductListingItem')),
  },
  {
    uiId: 'PRODUCT_LISTING_ITEM',
    component: dynamic(() => import('./ProductListingItem')),
  },
  {
    uiId: 'PRODUCT_LISTING',
    component: dynamic(() => import('./ProductListing')),
  },
  {
    uiId: 'BEDKINGDOM_PRODUCT_LISTING_ITEM_SIMPLE',
    component: dynamic(() => import('./ProductListingItemSimple')),
  },
  {
    uiId: 'BEDKINGDOM_PRODUCT_LISTING_ITEM_CONFIGURABLE',
    component: dynamic(() => import('./ProductListingItemConfigurable')),
  },
  {
    uiId: 'BEDKINGDOM_CONTENT_PRODUCT_ITEM_LABEL',
    component: dynamic(() => import('./ContentProductItemLabel')),
  },
  {
    uiId: 'BEDKINGDOM_CONTENT_PRODUCT_ITEM_INFO',
    component: dynamic(() => import('./ContentProductItemInfo')),
  },
  {
    uiId: 'BEDKINGDOM_SLIDER_IMAGE',
    component: dynamic(() => import('./ContentImageItem')),
  },
  {
    uiId: 'PRODUCT_LISTING_LIST',
    component: dynamic(() => import('./ProductListingList')),
  },
  {
    uiId: 'PRODUCT_LISTING_GRID',
    component: dynamic(() => import('./ProductListingGrid')),
  },
  ...BEDKINGDOM_PRODUCT_ITEM_VERTICAL_CFG,
];
