import { useDispatch } from '@main/packages-web-redux';
import { useCallback } from 'react';

import {
  productsAddFilter,
  productsClearFilters,
  productsRemoveFilter,
  removeSearchString,
  setSearchString,
} from '../store/products';

export const useFilterActions = () => {
  const dispatch = useDispatch();
  const removeFilterAction = useCallback(
    (code: string, value: string, removeAllValue = false) => {
      const action = productsRemoveFilter({
        value,
        code,
        removeAllValue,
      });
      console.log(JSON.stringify(action));
      dispatch(action);
    },
    []
  );

  const addFilterAction = useCallback((code: string, value: string) => {
    dispatch(
      productsAddFilter({
        value,
        code,
      })
    );
  }, []);

  const clearFilters = useCallback(() => {
    dispatch(productsClearFilters({}));
  }, []);

  const setSearchStringAction = useCallback((searchString: string) => {
    dispatch(setSearchString({ searchString }));
  }, []);

  const removeSearchStringAction = useCallback(() => {
    dispatch(removeSearchString());
  }, []);

  const addFilterNavigateCategory = useCallback((categoryId: string) => {
    clearFilters();
    removeSearchStringAction();

    setTimeout(() => {
      addFilterAction('category_id', categoryId);
    }, 50);
  }, []);

  return {
    actions: {
      removeFilterAction,
      addFilterAction,
      clearFilters,
      setSearchStringAction,
      removeSearchStringAction,
      addFilterNavigateCategory,
    },
  };
};
