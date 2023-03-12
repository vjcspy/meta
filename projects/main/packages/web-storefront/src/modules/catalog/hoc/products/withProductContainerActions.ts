import { createUiHOC } from '@web/ui-extension';

import { useProductContainerActions } from '../../hook/products/useProductContainerActions';

export const withProductContainerActions = createUiHOC(
  () => useProductContainerActions(),
  'withProductContainerActions'
);
