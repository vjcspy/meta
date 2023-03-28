import { ProductInfo } from '@modules/catalog/store/product-info/product-info.state';

export const isOptionsValid = (productInfo: ProductInfo): boolean => {
  if (!productInfo?.product) {
    console.error('product info must have product data');
    return false;
  }
  if (Array.isArray(productInfo.product['options'])) {
    let isValid = true;

    productInfo.product.options.forEach((o: any) => {
      if (o['required'] === true) {
        if (
          !productInfo?.customizable ||
          !(
            typeof productInfo?.customizable[o['uid']] === 'string' ||
            Array.isArray(productInfo?.customizable[o['uid']])
          )
        ) {
          isValid = false;

          return false;
        }
      }
    });

    return isValid;
  }

  return true;
};
