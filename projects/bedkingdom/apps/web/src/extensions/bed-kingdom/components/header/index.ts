import { BEDKINGDOM_CART_HEADER_ITEM_EXT_CFG } from '@extensions/bed-kingdom/components/header/cart';
import { BEDKINGDOM_MOBILE_SEARCH_HEADER_EXT_CFG } from '@extensions/bed-kingdom/components/header/search-bar';
import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_HEADER_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'HEADER',
    component: dynamic(() => import('./Header')),
  },
  {
    uiId: 'HEADER_RIGHT_SIDE',
    component: dynamic(() => import('./HeaderRightSide')),
  },
  {
    uiId: 'DEFAULT_HEADER',
    component: dynamic(() => import('./DefaultHeader')),
    priority: 10,
  },
  {
    uiId: 'MEGA_MENU_CONTAINER',
    component: dynamic(() => import('./MegaMenu.container')),
  },
  {
    uiId: 'MEGA_MENU_PC',
    component: dynamic(() => import('./Megamenu.pc')),
  },
  {
    uiId: 'MEGA_MENU_MB',
    component: dynamic(() => import('./Megamenu.mb')),
  },
  {
    uiId: 'MEGA_MENU_ITEM',
    component: dynamic(() => import('./MegaMenuItem')),
  },
  {
    uiId: 'MEGA_MENU_ITEM_LEVEL2',
    component: dynamic(() => import('./MegaMenuItemLevel2')),
  },
  {
    uiId: 'HEADER_ACCOUNT',
    component: dynamic(() => import('./Account')),
  },
  {
    uiId: 'HEADER_CART',
    component: dynamic(() => import('./CartHeader')),
  },
  ...BEDKINGDOM_MOBILE_SEARCH_HEADER_EXT_CFG,
  ...BEDKINGDOM_CART_HEADER_ITEM_EXT_CFG,
];
