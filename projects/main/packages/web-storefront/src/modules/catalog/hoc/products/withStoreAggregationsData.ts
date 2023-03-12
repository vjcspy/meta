import { useSelector } from '@main/packages-web-redux';
import { createUiHOC } from '@web/ui-extension';
import filter from 'lodash/filter';
import { useMemo } from 'react';

import { selectAggregations } from '../../store/products';

export const withStoreAggregationsData = createUiHOC(() => {
  const allAggregations = useSelector(selectAggregations);

  const aggregations: any = useMemo(
    () =>
      filter(
        allAggregations,
        (aggregation) =>
          !!aggregation['attribute_code'] &&
          aggregation['attribute_code'] !== 'category_id'
      ),
    [allAggregations]
  );

  return { aggregations };
}, 'withStoreAggregationsData');
