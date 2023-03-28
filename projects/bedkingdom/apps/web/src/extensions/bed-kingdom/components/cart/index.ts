import {
  ExtensionConfig,
  ExtensionCustomizeType,
  ExtensionType,
} from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BED_CART_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'CHECKOUT_CART',
    title: 'Two columns',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./CheckoutCart')),
    customizeType: ExtensionCustomizeType.HOOK,
    structure: [
      {
        title: 'column one',
        hookId: 'columnOne',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.HEAD_COMPONENT,
      },
      {
        title: 'column two',
        hookId: 'columnTwo',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.COMPONENT,
      },
    ],
  },
  {
    uiId: 'CHECKOUT_CART_ITEMS',
    component: dynamic(() => import('./CheckoutCartItems')),
  },
  {
    uiId: 'CHECKOUT_CART_ITEMS_QTY',
    component: dynamic(() => import('./CheckoutCartItemQty')),
  },
  {
    uiId: 'CHECKOUT_CART_BUTTON',
    component: dynamic(() => import('./CheckoutCartButton')),
  },
  {
    uiId: 'CHECKOUT_CART_SUMMARY',
    component: dynamic(() => import('./CheckoutCartSummary')),
  },
  {
    uiId: 'CHECKOUT_CART_COUPON',
    component: dynamic(() => import('./CheckoutCartCoupon')),
  },
  {
    uiId: 'CHECKOUT_CART_GIFT',
    component: dynamic(() => import('./CheckoutCartGift')),
  },
];
