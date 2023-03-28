import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const ACCOUNT_FORGOT_PASSWORD_CONFIGS: ExtensionConfig[] = [
  {
    uiId: 'ACCOUNT_FORGOT_PASSWORD_FORM',
    component: dynamic(() => import('./ForgotPasswordForm')),
  },
  {
    uiId: 'ACCOUNT_RESET_PASSWORD_FORM',
    component: dynamic(() => import('./ResetPasswordForm')),
  },
];
