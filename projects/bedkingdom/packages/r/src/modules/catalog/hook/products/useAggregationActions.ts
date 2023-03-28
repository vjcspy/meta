import { productsToggleAggregationItem } from '@modules/catalog/store/products/products.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

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
