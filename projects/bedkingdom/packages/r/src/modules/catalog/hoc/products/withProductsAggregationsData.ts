import {
  selectAggregations,
  selectPageFilterInfo,
} from '@modules/catalog/store/products/products.selectors';
import { createUiHOC } from '@web/ui-extension';
import filter from 'lodash/filter';
import { useMemo } from 'react';
import { useSelector } from '@main/packages-web-redux';

export const withProductsAggregationsData = createUiHOC(() => {
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

  const pageFilterInfo = useSelector(selectPageFilterInfo);

  return { aggregations, pageFilterInfo };
}, 'withProductsAggregationsData');
