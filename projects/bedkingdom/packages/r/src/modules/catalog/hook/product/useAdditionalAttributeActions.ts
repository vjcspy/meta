import { toggleAdditionalAttributeAction } from '@modules/catalog/store/product-info/product-info.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useAdditionalAttributeActions = () => {
  const dispatch = useDispatch();
  const toggleAdditionalAttribute = useCallback(
    (productId: string, attributeCode: string, attributeValue: any) => {
      dispatch(
        toggleAdditionalAttributeAction({
          productId,
          attributeCode,
          attributeValue,
        })
      );
    },
    []
  );

  return {
    actions: {
      toggleAdditionalAttribute,
    },
  };
};
