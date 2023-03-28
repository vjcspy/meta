import { useAttributeData } from '@modules/catalog/hook/products/useAttributeData';
import { createUiHOC } from '@web/ui-extension';

export const withAttributeData = createUiHOC((props) => {
  return useAttributeData(props['attributeCode']);
}, 'withAttributeData');
