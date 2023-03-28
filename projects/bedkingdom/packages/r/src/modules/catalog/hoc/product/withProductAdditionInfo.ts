import { useProductAdditionInfo } from '@modules/catalog/hook/product/useProductAdditionInfo';
import { createUiHOC } from '@web/ui-extension';

export const withProductAdditionInfo = createUiHOC(() => {
  return useProductAdditionInfo();
}, 'withProductAdditionInfo');
