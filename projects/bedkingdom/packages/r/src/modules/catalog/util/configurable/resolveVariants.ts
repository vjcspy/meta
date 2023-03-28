import forEach from 'lodash/forEach';
import intersectionBy from 'lodash/intersectionBy';
import values from 'lodash/values';

/**
 * Trả về variants, cái mà thoả mãn với những option đã selected
 *
 * configurableOptions: {
 *   size: "uid",
 *   color: "uid"
 * }
 *
 * @param configurableOptions
 * @param configurableProduct
 * @returns {any[]}
 */
export const resolveVariants = (
  configurableOptions: any,
  configurableProduct: any
) => {
  const variantsByOption: any = {};
  if (!Array.isArray(configurableProduct['variants'])) {
    console.error(
      'Could not resolve child products due to missing `variants` in configurable product'
    );
  }
  forEach(configurableOptions, (valueUid: string, attrCode: string) => {
    variantsByOption[attrCode] = configurableProduct.variants.filter(
      (variant: any) =>
        variant?.product?.stock_status === 'IN_STOCK' &&
        !!variant['attributes'].find(
          (variantAttr: any) =>
            variantAttr['code'] === attrCode && variantAttr['uid'] === valueUid
        )
    );
  });

  return intersectionBy(...values(variantsByOption));
};
