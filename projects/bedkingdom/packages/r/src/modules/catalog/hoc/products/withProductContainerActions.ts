import { useProductContainerActions } from '@modules/catalog/hook/products/useProductContainerActions';
import { createUiHOC } from '@web/ui-extension';

export const withProductContainerActions = createUiHOC(
  () => useProductContainerActions(),
  'withProductContainerActions'
);
