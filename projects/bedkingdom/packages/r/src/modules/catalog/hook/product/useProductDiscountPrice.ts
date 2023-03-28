import { productPriceHasDiscount } from '@modules/catalog/util/productPriceHasDiscount';
import type { ProductInterface } from '@vjcspy/apollo';
import first from 'lodash/first';
import size from 'lodash/size';
import { useMemo } from 'react';

export const useProductDiscountPrice = (props: {
  product: ProductInterface;
}) => {
  const { isShowDiscount, discountPrice } = useMemo(() => {
    let tierPrice: any = null;

    if (size(props?.product?.price_tiers) > 0) {
      tierPrice = first(props?.product?.price_tiers);
    }

    const hasDiscount = productPriceHasDiscount(props?.product?.price_range);

    let discountPrice: any = null;
    if (hasDiscount) {
      if (
        !isNaN(tierPrice?.final_price?.value) &&
        props.product?.price_range?.minimum_price?.final_price?.value &&
        tierPrice?.final_price?.value <
          props.product?.price_range?.minimum_price?.final_price?.value
      ) {
        discountPrice = tierPrice;
      } else {
        discountPrice = props.product?.price_range?.minimum_price;
      }
    }

    return {
      isShowDiscount: hasDiscount,
      discountPrice,
    };
  }, [props.product?.price_range]);

  return { isShowDiscount, discountPrice };
};
