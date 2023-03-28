import { BEDKINGDOM_PRODUCT_DETAIL_EXT_CFG } from '@extensions/bed-kingdom/components/product/description-detail';
import { BEDKINGDOM_PRODUCT_OPTIONS_EXT_CFG } from '@extensions/bed-kingdom/components/product/options-type';
import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_PRODUCT_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'PRODUCT_TWO_COLUMNS',
    title: 'Product Two columns',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./Product')),
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
    uiId: 'PRODUCT_BREADCRUMB',
    component: dynamic(() => import('./Breadcrumb')),
  },
  {
    uiId: 'PRODUCT_MEDIA',
    component: dynamic(() => import('./Media')),
  },
  {
    uiId: 'PRODUCT_DESCRIPTIONS',
    component: dynamic(() => import('./Descriptions')),
  },
  {
    uiId: 'PRODUCT_DESCRIPTIONS_MOBILE',
    component: dynamic(() => import('./DescriptionsMobile')),
  },
  {
    uiId: 'PRODUCT_INFO',
    component: dynamic(() => import('./Info')),
  },
  {
    uiId: 'PRODUCT_INFO_PRICE',
    component: dynamic(() => import('./InfoPrice')),
  },
  {
    uiId: 'PRODUCT_OPTIONS',
    component: dynamic(() => import('./Options')),
  },
  {
    uiId: 'PRODUCT_ADD_TO_CART_FORM',
    component: dynamic(() => import('./AddToCartForm')),
  },
  {
    uiId: 'PRODUCT_PAYMENT_METHOD_ACCEPTED',
    component: dynamic(() => import('./PaymentMethodAccepted')),
  },
  {
    uiId: 'PRODUCT_FINANCE',
    component: dynamic(() => import('./Finance')),
  },
  {
    uiId: 'POPUP_CALCULATOR',
    component: dynamic(() => import('./calculator/PopupCalculator')),
  },
  ...BEDKINGDOM_PRODUCT_OPTIONS_EXT_CFG,
  ...BEDKINGDOM_PRODUCT_DETAIL_EXT_CFG,
];
