import { useAccountResetPassword } from '@modules/account/hook/reset-password/useAccountResetPassword';
import { createUiHOC } from '@web/ui-extension';

export const withAccountResetPassword = createUiHOC(
  () => useAccountResetPassword(),
  'withAccountResetPassword'
);
