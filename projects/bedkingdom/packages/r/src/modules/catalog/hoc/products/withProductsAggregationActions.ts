import { useAggregationActions } from '@modules/catalog/hook/products/useAggregationActions';
import { createUiHOC } from '@web/ui-extension';

export const withProductsAggregationActions = createUiHOC(() => {
  return useAggregationActions();
}, 'withProductsAggregationActions');
