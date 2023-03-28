import { useReorderActions } from '@modules/account/hook/my-orders/useReorderActions';
import { createUiHOC } from '@web/ui-extension';

export const withReorderActions = createUiHOC(() => {
  return useReorderActions();
}, 'withReorderActions');
