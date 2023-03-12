import { UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

export default (function Price(props: any) {
  if (!props.priceRange) {
    return null;
  }

  const isShowRange = useMemo(() => {
    return (
      props.priceRange.maximum_price?.final_price?.value >
      props.priceRange.minimum_price?.final_price?.value
    );
  }, [props.priceRange]);

  const isDiscount = useMemo(() => {
    return (
      props.priceRange?.minimum_price.discount?.amount_off ||
      props.priceRange?.minimum_price.discount?.percent_off
    );
  }, [props.priceRange]);

  return (
    <>
      {isShowRange ? (
        <span className="ui-price">
          <span className="ui-price__title">Giá thấp nhất từ</span>
          <UiExtension
            uiId="CURRENCY"
            price={props.priceRange.minimum_price?.final_price?.value}
          />
        </span>
      ) : (
        <>
          <span className="ui-price ui-price__new">
            {' '}
            <UiExtension
              uiId="CURRENCY"
              price={props.priceRange.minimum_price?.final_price?.value}
            />
          </span>
          &nbsp;
          {isDiscount ? (
            <span
              className="ui-price ui-price__old"
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
