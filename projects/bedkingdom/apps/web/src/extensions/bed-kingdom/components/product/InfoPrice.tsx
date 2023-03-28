import { withCurrentProductState } from '@vjcspy/r/build/modules/catalog/hoc/product/withCurrentProductState';
import { animateCSS } from '@web/base/dist/util/animateCSS';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useEffect, useMemo, useState } from 'react';

let unmounted = false;

const InfoPrice = combineHOC(withCurrentProductState)(
  React.memo((props) => {
    const [firstInit, setFirstInit] = useState(true);
    const isDiscount = useMemo(() => {
      return (
        props?.productInfo?.priceRange?.minimum_price.discount?.amount_off ||
        props?.productInfo?.priceRange?.minimum_price.discount?.percent_off
      );
    }, [props?.productInfo?.priceRange]);

    const totalPrice = useMemo(() => {
      let price =
        (props?.productInfo?.priceRange.minimum_price?.final_price?.value ??
          0) + (props?.state?.productInfo?.optionAdditionPrice ?? 0);

      if (
        props?.state?.productInfo?.configurable?.variants &&
        Array.isArray(props?.state?.productInfo?.configurable?.variants) &&
        props?.state?.productInfo?.configurable?.variants.length > 0
      ) {
        if (
          props?.state?.productInfo?.configurable?.variants[0]?.product
            ?.price_range?.minimum_price?.final_price?.value
        ) {
          price =
            props?.state?.productInfo?.configurable?.variants[0]?.product
              ?.price_range?.minimum_price?.final_price?.value +
            (props?.state?.productInfo?.optionAdditionPrice ?? 0);
        }
      }

      return price;
    }, [props?.productInfo]);

    useEffect(() => {
      if (!firstInit) animateCSS('.productList__price', 'fadeIn');
      setTimeout(() => {
        if (!unmounted) {
          setFirstInit(false);
        }
      }, 1500);

      return () => {
        unmounted = true;
      };
    }, [totalPrice]);

    return (
      <>
        <div className="b-product-prices">
          <div className="productList__price">
            <strong className="price-nomal">
              <UiExtension uiId="CURRENCY" price={totalPrice} />
            </strong>
            {!!isDiscount && isDiscount > 0 && (
              <s className="price-old">
                <UiExtension
                  uiId="CURRENCY"
                  price={
                    (props?.productInfo?.priceRange.minimum_price?.regular_price
                      ?.value ?? 0) +
                    (props?.productInfo?.optionAdditionPrice ?? 0)
                  }
                />
              </s>
            )}
          </div>
        </div>
      </>
    );
  })
);

InfoPrice.displayName = 'InfoPrice';
export default InfoPrice;
