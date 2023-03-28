import { toggleShowCustomizableOptions } from '@modules/catalog/store/product-info/product-info.actions';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const withToggleShowCustomizableOptions = createUiHOC((props) => {
  const dispatch = useDispatch();
  const toggleShowCustomizableOptionsAction = useCallback(
    (force?: boolean) => {
      dispatch(
        toggleShowCustomizableOptions({
          force,
          productId: props?.state?.product.id,
        })
      );
    },
    [props?.state?.product]
  );

  return {
    actions: {
      toggleShowCustomizableOptionsAction,
    },
  };
}, 'withToggleShowCustomizableOptions');
