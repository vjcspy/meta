import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_CHECKOUT_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'BEDKINGDOM_CHECKOUT_ONE_PAGE',
    component: dynamic(() => import('./CheckoutOnePage')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_CONTENT',
    component: dynamic(() => import('./CheckoutContent')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_SUGGEST_PRODUCTS',
    component: dynamic(() => import('./CheckoutSuggestProducts')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_ADDRESS',
    component: dynamic(() => import('./CheckoutAddress')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_SHIPPING_BILLING',
    component: dynamic(() => import('./CheckoutShippingBilling')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_SUMMARY',
    component: dynamic(() => import('./CheckoutSummary')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_GUARD',
    component: dynamic(() => import('./CheckGuard')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_PRODUCT_ITEM',
    component: dynamic(() => import('./CheckoutProductItem')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_HEADER',
    component: dynamic(() => import('./CheckoutHeader')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_SECURE',
    component: dynamic(() => import('./CheckoutSecure')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_COUPON',
    component: dynamic(() => import('./coupon-gift/CheckoutCoupon')),
  },
  {
    uiId: 'BEDKINGDOM_CHECKOUT_GIFT',
    component: dynamic(() => import('./coupon-gift/CheckoutGift')),
  },
];
