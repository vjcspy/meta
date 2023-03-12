import { createUiHOC } from '@web/ui-extension';

import { useAttributeData } from '../hook/useAttributeData';

export const withAttributeData = createUiHOC((props) => {
  if (!props?.attributeCode) {
    console.error(
      'property `attributeCode` must pass when using withAttributeData hoc'
    );
  }
  return useAttributeData(props['attributeCode']);
}, 'withAttributeData');
