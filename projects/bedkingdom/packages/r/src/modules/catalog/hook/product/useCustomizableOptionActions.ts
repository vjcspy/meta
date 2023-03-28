import { toggleCustomizableOption } from '@modules/catalog/store/product-info/product-info.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useCustomizableOptionActions = (
  productInfo: any,
  product: any
) => {
  const dispatch = useDispatch();
  const toggleCustomizableOptionAction = useCallback(
    (optionUid: string, valueUid: string) => {
      dispatch(
        toggleCustomizableOption({
          productId: product['id'],
          optionUid,
          valueUid,
        })
      );
    },
    []
  );

  return {
    actions: {
      toggleCustomizableOptionAction,
    },
  };
};
