import { withBedCalculatorFinanceData } from '@extensions/bed-kingdom/hoc/products/withBedCalculatorFinanceData';
import { withCurrentProductState } from '@vjcspy/r/build/modules/catalog/hoc/product/withCurrentProductState';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

const Finance = combineHOC(
  withCurrentProductState,
  withBedCalculatorFinanceData
)((props) => {
  const dataPrice = useMemo(() => {
    let price =
      props?.state?.product?.price_range?.minimum_price?.final_price?.value +
      (props?.state?.productInfo?.optionAdditionPrice ?? 0);

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
  }, [props?.state?.productInfo, props?.state?.product]);

  return (
    <>
      {dataPrice && parseFloat(dataPrice + '') > 250 && (
        <div className="b-product-calculator xxl:flex xxl:items-center xxl:justify-between text-center">
          Finance this item from as little as{' '}
          <strong>
            <UiExtension
              uiId="CURRENCY"
              price={props?.state?.calculatorFinance || 0}
            />
          </strong>
          <span className="pl-1">per Month</span>
          <UiExtension
            uiId="POPUP_CALCULATOR"
            productDataPrice={dataPrice}
            setPriceRepayments={props?.actions?.setCalculatorFinanceActions}
            itemDiv={
              <div className="xxl:mt-0 mt-3 xxl:ml-0 xxl:mr-3 ml-auto mr-auto btn-default">
                Calculator
              </div>
            }
          />
        </div>
      )}
    </>
  );
});

export default Finance;
