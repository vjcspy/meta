import {
  productsAddFilter,
  productsClearFilters,
  productsRemoveFilter,
  removeSearchString,
  setSearchString,
} from '@modules/catalog/store/products/products.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useFilterActions = () => {
  const dispatch = useDispatch();
  const removeFilterAction = useCallback(
    (code: string, value: string, removeAllValue = false) => {
      dispatch(
        productsRemoveFilter({
          value,
          code,
          removeAllValue,
        })
      );
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
