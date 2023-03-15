import { useDispatch } from '@main/packages-web-redux';
import { useCallback } from 'react';

import { productsToggleAggregationItem } from '../../store/products/products.actions';

export const useAggregationActions = () => {
  const dispatch = useDispatch();

  const toggleAggregationItem = useCallback(
    (attributeCode: string, attributeValue: any) => {
      dispatch(
        productsToggleAggregationItem({
          attributeCode,
          attributeValue,
        })
      );
    },
    []
  );
  return {
    actions: { toggleAggregationItem },
  };
};
