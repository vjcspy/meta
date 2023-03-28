import { useAccountLoadingState } from '@modules/account/hook/useAccountLoadingState';
import { createUiHOC } from '@web/ui-extension';

export const withAccountLoadingState = createUiHOC(() => {
  return useAccountLoadingState();
}, 'withAccountLoadingState');
