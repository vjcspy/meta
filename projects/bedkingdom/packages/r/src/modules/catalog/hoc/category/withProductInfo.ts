import { useDispatch, useSelector } from '@main/packages-web-redux';
import { useAdditionalAttributeActions } from '@modules/catalog/hook/product/useAdditionalAttributeActions';
import { useConfigurableOptionActions } from '@modules/catalog/hook/product/useConfigurableOptionActions';
import { useCustomizableOptionActions } from '@modules/catalog/hook/product/useCustomizableOptionActions';
import { setProductInfoQtyAction } from '@modules/catalog/store/product-info/product-info.actions';
import { selectProductInfo } from '@modules/catalog/store/product-info/product-info.selectors';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';

/**
 * Có thể gọi nhiều lần ở tất cả các component muốn lấy product info
 *
 * @type {UiHOC}
 */
export const withProductInfo = createUiHOC((props: { product: any }) => {
  // @ts-ignore
  const productInfo = useSelector(selectProductInfo)(props?.product?.id);
  const dispatch = useDispatch();

  const configurableProductCtn = useConfigurableOptionActions(
    productInfo,
    props.product
  );

  const customizableProductCtn = useCustomizableOptionActions(
    productInfo,
    props.product
  );

  const additionalAttributeCtn = useAdditionalAttributeActions();

  const setProductInfoQty = useCallback((productId: any, qty: number) => {
    dispatch(
      setProductInfoQtyAction({
        productId,
        qty,
      })
    );
  }, []);

  const isAttributeHasOneOption = useCallback(
    (attrCode: string) => {
      const option = props?.product?.configurable_options?.find(
        (_o: any) => _o['attribute_code'] === attrCode
      );
      return Array.isArray(option?.values) && option?.values.length === 1
        ? option?.values[0]
        : undefined;
    },
    [props?.product?.id]
  );

  return {
    state: {
      productInfo,
    },
    fns: {
      configurable: {
        isOptionValueAvailable:
          configurableProductCtn.fns.isOptionValueAvailable,
        isOptionsSelected: configurableProductCtn.fns.isOptionsSelected,
      },
    },
    actions: {
      configurable: {
        toggleConfigurableOption:
          configurableProductCtn.actions.toggleConfigurableOptionAction,
        isAttributeHasOneOption,
      },
      customizable: {
        toggleCustomizableOption:
          customizableProductCtn.actions.toggleCustomizableOptionAction,
      },
      customAdditionalAttribute: {
        toggleAdditionalAttribute:
          additionalAttributeCtn.actions.toggleAdditionalAttribute,
      },
      setProductInfoQty,
    },
  };
}, 'withProductInfo');
