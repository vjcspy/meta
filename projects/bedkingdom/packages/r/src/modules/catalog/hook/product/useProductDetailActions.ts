import { setProductInfoQtyAction } from '@modules/catalog/store/product-info/product-info.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useProductDetailActions = () => {
  const dispatch = useDispatch();

  const setProductInfoQty = useCallback((productId: any, qty: number) => {
    dispatch(
      setProductInfoQtyAction({
        productId,
        qty,
      })
    );
  }, []);

  return {
    actions: {
      setProductInfoQty,
    },
  };
};
