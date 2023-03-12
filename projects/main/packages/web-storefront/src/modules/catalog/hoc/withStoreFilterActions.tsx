import { createUiHOC } from '@web/ui-extension';

import { useFilterActions } from '../hook/useFilterActions';

export const withStoreFilterActions = createUiHOC(() => {
  return useFilterActions();
}, 'withStoreFilterActions');
