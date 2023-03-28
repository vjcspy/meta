import { toggleConfigurableOption } from '@modules/catalog/store/product-info/product-info.actions';
import { resolveVariants } from '@modules/catalog/util/configurable/resolveVariants';
import isEmpty from 'lodash/isEmpty';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useConfigurableOptionActions = (
  productInfo: any,
  product: any
) => {
  const dispatch = useDispatch();

  /**
   * Kiểm tra xem option value có simple product tương ứng khả dụng hay không
   *
   * @type {(optionId: any, optionValue: any) => (boolean | boolean)}
   */
  const isOptionValueAvailable = useCallback(
    (attrCode: any, valueUid: any) => {
      if (!productInfo || typeof productInfo.configurable === 'undefined') {
        return true;
      }

      let isAvailable = false;
      const d = { ...productInfo.configurable.super_attribute };
      delete d[attrCode];
      if (isEmpty(d)) {
        return true;
      }

      const option = product['configurable_options'].find(
        (o: any) => o.attribute_code == attrCode
      );

      if (option) {
        const variants = resolveVariants(d, product);
        variants.forEach((v: any) => {
          const isExisted = v['attributes'].find(
            (attr: any) => attr['uid'] == valueUid
          );

          if (isExisted) {
            isAvailable = true;

            return false;
          }
        });
      }

      return isAvailable;
    },
    [productInfo]
  );

  const toggleConfigurableOptionAction = useCallback(
    (attrCode: any, valueUid: any, forceAdd = false) => {
      dispatch(
        toggleConfigurableOption({
          productId: product['id'],
          attrCode,
          valueUid,
          forceAdd,
        })
      );
    },
    [product?.id]
  );

  const isOptionsSelected = useCallback(() => {
    if (!productInfo || typeof productInfo.configurable === 'undefined') {
      return false;
    }
    let isCheck = true;
    if (productInfo?.configurable?.super_attribute) {
      product.configurable_options.map((option: any) => {
        if (
          typeof productInfo?.configurable?.super_attribute[
            option.attribute_code
          ] === 'undefined'
        ) {
          isCheck = false;
        }
      });
    }
    return isCheck;
  }, [productInfo]);

  return {
    fns: { isOptionValueAvailable, isOptionsSelected },
    actions: { toggleConfigurableOptionAction },
  };
};
