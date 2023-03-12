import { createUiHOC } from '@web/ui-extension';

import { useAggregationActions } from '../../hook/products/useAggregationActions';

export const withAggregationActions = createUiHOC(() => {
  return useAggregationActions();
}, 'withAggregationActions');
