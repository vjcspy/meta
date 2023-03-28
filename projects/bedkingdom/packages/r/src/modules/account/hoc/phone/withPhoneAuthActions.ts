import { usePhoneAuthActions } from '@modules/account/hook/phone/usePhoneAuthActions';
import { createUiHOC } from '@web/ui-extension';

export const withPhoneAuthActions = createUiHOC(
  () => usePhoneAuthActions(),
  'withPhoneAuthActions'
);
