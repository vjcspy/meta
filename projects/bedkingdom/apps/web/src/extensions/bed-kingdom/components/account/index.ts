import { BEDKINGDOM_ACCOUNT_ADDRESS_CONFIGS } from '@extensions/bed-kingdom/components/account/address';
import { ACCOUNT_FORGOT_PASSWORD_CONFIGS } from '@extensions/bed-kingdom/components/account/forgot-password';
import { BEDKINGDOM_MYACCOUNT_EXT_CFG } from '@extensions/bed-kingdom/components/account/my-account';
import { HOME_MY_ORDERS_CONTENT_CFG } from '@extensions/bed-kingdom/components/account/my-orders';
import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_ACCOUNT_EXTENSION_CONFIGS: ExtensionConfig[] = [
  {
    uiId: 'ACCOUNT_LOGIN_FORM',
    component: dynamic(() => import('./AccountLoginForm')),
  },
  {
    uiId: 'MY_ACCOUNT',
    component: dynamic(() => import('./MyAccount')),
    customizeType: ExtensionCustomizeType.HOOK,
    structure: [
      {
        title: 'content',
        hookId: 'content',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.COMPONENT,
      },
    ],
  },
  {
    uiId: 'ACCOUNT_REGISTER_FORM',
    component: dynamic(() => import('./AccountRegisterForm')),
  },
  {
    uiId: 'ACCOUNT_REGISTER',
    component: dynamic(() => import('./AccountRegister')),
  },
  {
    uiId: 'AUTH_CONTAINER',
    component: dynamic(() => import('./AuthenticateContainer')),
    customizeType: ExtensionCustomizeType.HOOK,
    structure: [
      {
        title: 'content',
        hookId: 'content',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.COMPONENT,
      },
    ],
  },
  ...ACCOUNT_FORGOT_PASSWORD_CONFIGS,
  ...BEDKINGDOM_MYACCOUNT_EXT_CFG,
  ...BEDKINGDOM_ACCOUNT_ADDRESS_CONFIGS,
  ...HOME_MY_ORDERS_CONTENT_CFG,
];
