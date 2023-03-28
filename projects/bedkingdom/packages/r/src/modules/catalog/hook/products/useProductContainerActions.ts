import { setPageFilterInfo } from '@modules/catalog/store/products/products.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useProductContainerActions = () => {
  const dispatch = useDispatch();
  const setFilterInfo = useCallback((pageFilterInfo: any) => {
    dispatch(
      setPageFilterInfo({
        pageFilterInfo,
      })
    );
  }, []);

  return {
    actions: {
      setFilterInfo,
    },
  };
};
