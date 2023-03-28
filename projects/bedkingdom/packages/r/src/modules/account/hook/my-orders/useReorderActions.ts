import { reorderCartAction } from '@modules/checkout/store/cart/actions/reorder.actions';
import { selectIsUpdatingTotals } from '@modules/checkout/store/cart/cart.selector';
import { useCallback } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useReorderActions = () => {
  const dispatch = useDispatch();
  const isUpdatingTotals = useSelector(selectIsUpdatingTotals);

  const reorderAction = useCallback((orderNumber: string) => {
    dispatch(reorderCartAction({ orderNumber }));
  }, []);

  return {
    actions: {
      reorderAction,
    },
    state: {
      isUpdatingTotals,
    },
  };
};
