import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_MYACCOUNT_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'MY_ACCOUNT_SIDEBAR',
    component: dynamic(() => import('./Sidebar')),
  },
  {
    uiId: 'MY_ACCOUNT_INFO',
    component: dynamic(() => import('./MyAccountInfo')),
  },
  {
    uiId: 'MY_ACCOUNT_ORDERS',
    component: dynamic(() => import('./MyAccountOrders')),
  },
  {
    uiId: 'MY_ACCOUNT_WISHLIST',
    component: dynamic(() => import('./MyAccountWishlist')),
  },
  {
    uiId: 'MY_ACCOUNT_PAGING',
    component: dynamic(() => import('./MyAccountPaging')),
  },
  {
    uiId: 'MY_ACCOUNT_EDIT',
    component: dynamic(() => import('./MyAccountEdit')),
  },
  {
    uiId: 'MY_ACCOUNT_NEWSLETTER',
    component: dynamic(() => import('./MyAccountNewsletter')),
  },
  {
    uiId: 'MY_ACCOUNT_ADDRESS',
    component: dynamic(() => import('./MyAccountAddressBook')),
  },
  {
    uiId: 'MY_ACCOUNT_GIFT_CART',
    component: dynamic(() => import('./MyAccountGiftCart')),
  },
  {
    uiId: 'MY_ACCOUNT_ANONYMISE',
    component: dynamic(() => import('./MyAccountAnonymise')),
  },
];
