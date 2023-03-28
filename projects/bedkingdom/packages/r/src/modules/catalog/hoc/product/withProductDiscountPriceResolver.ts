import { useProductDiscountPrice } from '@modules/catalog/hook/product/useProductDiscountPrice';
import { createUiHOC } from '@web/ui-extension';

export const withProductDiscountPriceResolver = createUiHOC(
  (props) => useProductDiscountPrice(props),
  'withProductDiscountPriceResolver'
);
