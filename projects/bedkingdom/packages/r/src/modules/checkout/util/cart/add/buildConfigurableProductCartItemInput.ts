import type { ProductInfo } from '@modules/catalog/store/product-info/product-info.state';
import { resolveVariants } from '@modules/catalog/util/configurable/resolveVariants';
import { buildCustomizableOptions } from '@modules/checkout/util/cart/add/buildCustomizableOptions';

export const buildConfigurableProductCartItemInput = (
  productInfo: ProductInfo,
  quantity = 1
) => {
  const product = productInfo.product;
  const variants = resolveVariants(
    productInfo.configurable?.super_attribute,
    product
  );
  let buyRequest: any = {
    sku: product['sku'],
    quantity,
  };

  if (productInfo.additionalAttribute?.date_picker) {
    buyRequest = {
      ...buyRequest,
      date_picker: productInfo?.additionalAttribute?.date_picker,
    };
  }
  // build configurable selection
  let selected_options: any[] = [];
  if (Array.isArray(variants) && variants.length === 1) {
    for (const [key, value] of Object.entries(
      productInfo.configurable!.super_attribute
    )) {
      selected_options.push(value);
    }
  } else {
    console.warn(
      'Could not build configurable add to cart input',
      productInfo.configurable,
      product
    );

    return undefined;
  }

  // build customizable selection
  selected_options = buildCustomizableOptions(selected_options, productInfo);

  buyRequest['selected_options'] = selected_options;

  return buyRequest;
};
