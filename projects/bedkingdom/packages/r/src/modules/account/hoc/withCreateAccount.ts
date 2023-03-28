import { useCreateAccount } from '@modules/account/hook/useCreateAccount';
import { createUiHOC } from '@web/ui-extension';

export const withCreateAccount = createUiHOC(() => {
  return useCreateAccount();
}, 'withCreateAccount');
