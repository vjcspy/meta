import { useDispatch } from '@main/packages-web-redux';
import { useCallback } from 'react';

import { setPageFilterInfo } from '../../store/products';

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
