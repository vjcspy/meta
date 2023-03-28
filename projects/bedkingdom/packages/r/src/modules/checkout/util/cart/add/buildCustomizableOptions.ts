import type { ProductInfo } from '@modules/catalog/store/product-info/product-info.state';
import { isOptionsValid } from '@modules/catalog/util/customizable-options/isOptionsValid';
import { RuntimeError } from 'chitility/dist/lib/error/RuntimeError';

export const buildCustomizableOptions = (
  selectedOptions: string[],
  productInfo: ProductInfo
) => {
  // build customizable selection
  if (!isOptionsValid(productInfo)) {
    throw new RuntimeError('Product customizable option invalid');
  }

  if (productInfo.customizable) {
    for (const [key, value] of Object.entries(productInfo.customizable)) {
      if (typeof value === 'string') {
        selectedOptions.push(value);
      }

      if (Array.isArray(value)) {
        selectedOptions.push(...value);
      }
    }
  }

  return selectedOptions;
};
