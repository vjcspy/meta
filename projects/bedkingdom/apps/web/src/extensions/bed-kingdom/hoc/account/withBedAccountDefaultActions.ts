import { useBedAccountDefaultActions } from '@extensions/bed-kingdom/hook/account/useBedAccountDefaultActions';
import { createUiHOC } from '@web/ui-extension';

export const withBedAccountDefaultActions = createUiHOC(() => {
  return useBedAccountDefaultActions();
}, 'withBedAccountDefaultActions');
