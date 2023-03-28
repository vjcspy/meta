import { ProductInfo } from '@modules/catalog/store/product-info/product-info.state';
import { buildCustomizableOptions } from '@modules/checkout/util/cart/add/buildCustomizableOptions';

export const buildSimpleProductCartItemInput = (
  productInfo: ProductInfo,
  quantity = 1
) => {
  const selected_options = buildCustomizableOptions([], productInfo);

  let input = {
    quantity,
    sku: productInfo.product.sku,
    selected_options:
      selected_options.length > 0 ? selected_options : undefined,
  };

  if (productInfo?.additionalAttribute?.date_picker) {
    input = {
      ...input,
      // @ts-ignore
      date_picker: productInfo?.additionalAttribute?.date_picker,
    };
  }
  return input;
};
