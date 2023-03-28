import { ProductInfo } from '@modules/catalog/store/product-info/product-info.state';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';

export const withCustomizableOptionActions = createUiHOC(
  (props: {
    option: any;
    product: any;
    state: { productInfo: ProductInfo };
  }) => {
    const isCustomizableOptionSelected = useCallback(
      (valueUid: string) => {
        const productInfo = props?.state?.productInfo;
        if (typeof productInfo === 'undefined') {
          return;
        }

        if (
          ['CustomizableDropDownOption', 'CustomizableRadioOption'].includes(
            props?.option['__typename']
          )
        ) {
          return (
            props.option &&
            productInfo?.customizable &&
            productInfo.customizable[props.option['uid']] === valueUid
          );
        } else if (
          ['CustomizableMultipleOption', 'CustomizableCheckboxOption'].includes(
            props?.option['__typename']
          )
        ) {
          return (
            props.option &&
            productInfo?.customizable &&
            Array.isArray(productInfo?.customizable[props.option['uid']]) &&
            productInfo?.customizable[props.option['uid']].includes(valueUid)
          );
        }
      },
      [props?.state?.productInfo]
    );

    /**
     * Check xem Selection này đã chọn bất cứ 1 giá trị nào chưa
     * @type {() => void}
     */
    const isSelectionHasValue = useCallback(() => {
      const productInfo = props?.state?.productInfo;
      return (
        productInfo?.customizable &&
        (Array.isArray(productInfo?.customizable[props.option['uid']]) ||
          typeof productInfo?.customizable[props.option['uid']] === 'string')
      );
    }, [props?.state?.productInfo]);

    return {
      fns: {
        isCustomizableOptionSelected,
        isSelectionHasValue,
      },
    };
  },
  'withCustomizableOptionActions'
);
