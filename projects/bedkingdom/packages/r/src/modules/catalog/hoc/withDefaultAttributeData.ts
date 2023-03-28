import { useAttributeData } from '@modules/catalog/hook/products/useAttributeData';
import { useGetDefaultAttributeMetadataLazyQuery } from '@vjcspy/apollo';
import { createUiHOC } from '@web/ui-extension';

export const withDefaultAttributeData = createUiHOC((props) => {
  return useAttributeData(
    props['attributeCode'],
    useGetDefaultAttributeMetadataLazyQuery
  );
}, 'withAttributeData');
