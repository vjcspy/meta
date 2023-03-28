import { ProductInfo } from '@modules/catalog/store/product-info/product-info.state';
import { resolveVariants } from '@modules/catalog/util/configurable/resolveVariants';
import { PriceRange } from '@vjcspy/apollo';

/**
 * Trả về product price với input là buyRequest
 *
 * @returns {any}
 */
export const resolveProductPrice = (productInfo: ProductInfo): PriceRange => {
  const product = productInfo.product;
  let price: any = product.price_range;

  if (
    product['__typename'] === 'ConfigurableProduct' &&
    productInfo?.configurable?.super_attribute
  ) {
    const variants = resolveVariants(
      productInfo.configurable.super_attribute,
      product
    );
    if (variants.length === 1) {
      const variant: any = variants[0];
      price = variant.product?.price_range ?? price;
    }
  }

  return price;
};
