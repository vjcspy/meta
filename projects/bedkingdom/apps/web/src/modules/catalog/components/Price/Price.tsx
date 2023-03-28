import { withPriceFormat } from '@main/packages-web-storefront/src/modules/catalog/hoc/withPriceFormat';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

const Price = combineHOC(withPriceFormat)((props) => {
  const isShowRange = useMemo(() => {
    return (
      props.priceRange?.maximum_price?.final_price?.value! >
      props.priceRange?.minimum_price?.final_price?.value!
    );
  }, [props.priceRange]);

  const isDiscount = useMemo(() => {
    return (
      props.priceRange?.minimum_price.discount?.amount_off ||
      props.priceRange?.minimum_price.discount?.percent_off
    );
  }, [props.priceRange]);

  if (!props.priceRange) {
    return null;
  }

  return (
    <>
      {isShowRange ? (
        <strong className="text-blue">
          <UiExtension
            uiId="CURRENCY"
            price={props.priceRange.minimum_price?.final_price?.value}
          />
        </strong>
      ) : (
        <>
          <strong className="text-blue">
            {' '}
            <UiExtension
              uiId="CURRENCY"
              price={props.priceRange.minimum_price?.final_price?.value}
            />
          </strong>
          &nbsp;
          {isDiscount ? (
            <span
              className="ui-price ui-price__old text-16px"
              style={{ textDecoration: 'line-through' }}
            >
              <UiExtension
                uiId="CURRENCY"
                price={props.priceRange.minimum_price?.regular_price?.value}
              />
            </span>
          ) : null}
        </>
      )}
    </>
  );
});

export default Price;
