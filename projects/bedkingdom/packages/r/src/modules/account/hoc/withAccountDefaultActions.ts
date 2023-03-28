import { createUiHOC } from '@web/ui-extension';
import { useAccountDefaultActions } from '@modules/account/hook/useAccountDefaultActions';

export const withAccountDefaultActions = createUiHOC(() => {
  return useAccountDefaultActions();
}, 'withAccountDefaultActions');
