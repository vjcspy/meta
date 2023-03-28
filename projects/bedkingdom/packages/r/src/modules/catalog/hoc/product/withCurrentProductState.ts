import { useCurrentProductState } from '@modules/catalog/hook/product/useCurrentProductState';
import { createUiHOC } from '@web/ui-extension';

export const withCurrentProductState = createUiHOC(
  () => useCurrentProductState(),
  'withCurrentProductState'
);
