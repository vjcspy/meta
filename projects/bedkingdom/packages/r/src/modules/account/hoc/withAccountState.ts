import { useAccountState } from '@modules/account/hook/useAccountState';
import { createUiHOC } from '@web/ui-extension';

export const withAccountState = createUiHOC(() => {
  return useAccountState();
}, 'withAccountState');
