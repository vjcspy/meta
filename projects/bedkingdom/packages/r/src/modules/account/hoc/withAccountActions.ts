import { useAccountActions } from '@modules/account/hook/useAccountActions';
import { createUiHOC } from '@web/ui-extension';

export const withAccountActions = createUiHOC(() => {
  return useAccountActions();
}, 'withAccountActions');
