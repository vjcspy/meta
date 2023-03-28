import { withAmLabelProductState } from '@extensions/bed-kingdom/hoc/product/withAmLabelProductState';
import { combineHOC } from '@web/ui-extension';
import React, { useMemo } from 'react';

const ContentProductItemLabel: React.FC<{ product: any }> = combineHOC(
  withAmLabelProductState
)((props) => {
  const checkShowDelivery = useMemo(() => {
    if (
      props?.state?.amLabelProduct &&
      props.product?.id &&
      Object.values(props?.state?.amLabelProduct).length > 0 &&
      props?.state?.amLabelProduct[props.product?.id]
    ) {
      if (
        props?.state?.amLabelProduct[props.product?.id].find(
          (item: any) => item?.txt === 'Next Day Delivery'
        )
      ) {
        return true;
      }
    }
    return false;
  }, [props.product, props?.state?.amLabelProduct]);

  const checkShowSales = useMemo(() => {
    if (
      props?.state?.amLabelProduct &&
      props.product?.id &&
      Object.values(props?.state?.amLabelProduct).length > 0 &&
      props?.state?.amLabelProduct[props.product?.id]
    ) {
      if (
        props?.state?.amLabelProduct[props.product?.id].find(
          (item: any) => item?.txt === 'On Sale'
        )
      ) {
        return true;
      }
    }
    return false;
  }, [props.product, props?.state?.amLabelProduct]);

  return (
    <div className="b-product__label">
      {checkShowDelivery && (
        <div className="b-label b-label-delivery">
          <span>Next Day Delivery</span>
        </div>
      )}
      {checkShowSales && (
        <div className="b-label b-label-sale">
          <span>On Sale</span>
        </div>
      )}
    </div>
  );
});

export default ContentProductItemLabel;
