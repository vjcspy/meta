import { useProductCustomizableOptionsData } from '@modules/catalog/hook/product/useProductOptionsData';
import { createUiHOC } from '@web/ui-extension';

export const withProductCustomizableData = createUiHOC(
  () => useProductCustomizableOptionsData(),
  'withProductCustomizableData'
);
