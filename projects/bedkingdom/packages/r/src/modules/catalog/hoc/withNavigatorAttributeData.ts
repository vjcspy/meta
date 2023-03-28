import { useAttributeData } from '@modules/catalog/hook/products/useAttributeData';
import { useGetNavigatorAttributeFilterDataLazyQuery } from '@vjcspy/apollo';
import { createUiHOC } from '@web/ui-extension';

export const withNavigatorAttributeData = createUiHOC((props) => {
  return useAttributeData(
    props['attributeCode'],
    useGetNavigatorAttributeFilterDataLazyQuery
  );
}, 'withNavigatorAttributeData');
