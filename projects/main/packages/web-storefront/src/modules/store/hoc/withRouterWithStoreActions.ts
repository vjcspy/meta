import { createUiHOC } from '@web/ui-extension';

import { useRouterWithStoreActions } from '../hook/userRouterWithStoreActions';

export const withRouterWithStoreActions = createUiHOC(() => {
  return useRouterWithStoreActions();
}, 'withRouterWithStoreActions');
