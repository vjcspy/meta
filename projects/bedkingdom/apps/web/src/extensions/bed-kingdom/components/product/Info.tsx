import 'react-datepicker/dist/react-datepicker.css';

import { withBedKingdomReviews } from '@extensions/bed-kingdom/hoc/common/withBedKingdomReviews';
import { withBedKingdomXnotifStock } from '@extensions/bed-kingdom/hoc/common/withBedKingdomXnotifStock';
import { withBedkingdomGetDeliveryNextDay } from '@extensions/bed-kingdom/hoc/product/withBedkingdomGetDeliveryNextDay';
import { withCustomer } from '@vjcspy/r/build/modules/account/hoc/withCustomer';
import { withProductInfo } from '@vjcspy/r/build/modules/catalog/hoc/category/withProductInfo';
import { withCurrentProductState } from '@vjcspy/r/build/modules/catalog/hoc/product/withCurrentProductState';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

const Info = combineHOC(
  withCurrentProductState,
  withBedkingdomGetDeliveryNextDay,
  withProductInfo,
  withBedKingdomReviews,
  withBedKingdomXnotifStock,
  withCustomer
)((props) => {
  const {
    handleSubmit,
    register,
    setValue,
    // eslint-disable-next-line unused-imports/no-unused-vars
    formState: { errors },
  } = useForm();

  const skuProduct = useMemo(() => {
    let sku = props?.state?.product?.sku;
    if (
      props?.state?.productInfo?.configurable?.variants &&
      Array.isArray(props?.state?.productInfo?.configurable?.variants) &&
      props?.state?.productInfo?.configurable?.variants.length > 0
    ) {
      if (props?.state?.productInfo?.configurable?.variants[0]?.product?.sku) {
        sku =
          props?.state?.productInfo?.configurable?.variants[0]?.product?.sku;
      }
    }
    return sku;
  }, [props?.state?.product, props?.state?.productInfo?.configurable]);

  const productInfoData = useMemo(() => {
    let data = props?.state?.productInfo;
    if (
      props?.state?.productInfo?.configurable?.variants &&
      Array.isArray(props?.state?.productInfo?.configurable?.variants) &&
      props?.state?.productInfo?.configurable?.variants.length > 0
    ) {
      if (props?.state?.productInfo?.configurable?.variants[0]?.product) {
        data = {
          ...props?.state?.productInfo?.configurable?.variants[0]?.product,
          priceRange:
            props?.state?.productInfo?.configurable?.variants[0]?.product
              ?.price_range,
        };
      }
    }
    return data;
  }, [props?.state?.productInfo]);

  useEffect(() => {
    if (typeof props?.actions?.calculateDeliveryNextDay === 'function') {
      props?.actions?.calculateDeliveryNextDay();
    }
    if (typeof props?.actions?.customAttributeMetadata === 'function') {
      props?.actions?.customAttributeMetadata();
    }
  }, []);

  useEffect(() => {
    if (props?.state?.customer?.email) {
      setValue('requiredEmail', props?.state?.customer?.email);
    }
  }, [props?.state?.customer]);

  const onSubmit = useCallback((data: any) => {
    if (typeof props.actions?.xnotifStockSubmit === 'function') {
      props.actions.xnotifStockSubmit(data?.requiredEmail, data?.product_id);
    }
  }, []);

  return (
    <>
      <UiExtension uiId="ONLY_DESKTOP">
        <h1 className="b-product-title">
          <span>{props?.state?.product?.name}</span>
        </h1>
      </UiExtension>

      <div className="b-product-sku-code border-b-1 flex justify-between">
        <span>Sku: {skuProduct}</span>
        <span>
          Product By:{' '}
          <span className="text-blue">
            {props?.state?.product?.manufacturer}
          </span>
        </span>
      </div>

      {props?.state?.product?.stock_status === 'IN_STOCK' && (
        <>
          <div className="b-product-prices border-b-1 flex  justify-between">
            <UiExtension
              uiId="PRODUCT_INFO_PRICE"
              productInfo={productInfoData}
            />
            <div className="b-product-label" />
            <div
              className="b-product-review"
              onClick={() => props?.actions?.setShowReview(true)}
            >
              <UiExtension
                uiId="BEDKINGDOM_TRUST_PILOT_START_ON_LIST_ITEM"
                dataRate={
                  props.state?.product?.bed_data
                    ?.trustpilot_product_reviews_summary
                }
              />
            </div>
          </div>
        </>
      )}
      {props?.state?.product?.stock_status === 'OUT_OF_STOCK' && (
        <>
          <form id="form-validate-stock" onSubmit={handleSubmit(onSubmit)}>
            <label>Subscribe to back in stock notification</label>
            <div className="notification-container">
              <div className="input-fields fieldset">
                <input
                  {...register('requiredEmail', {
                    required: true,
                    pattern: new RegExp(
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
                    ),
                  })}
                  className="input-text"
                  size={30}
                  type="email"
                  placeholder="Insert your email"
                />
                <input
                  {...register('product_id')}
                  type="hidden"
                  value={props.state?.product?.id}
                />
              </div>
              <div className="actions-toolbar">
                <div className="primary">
                  <button type="submit" className="action submit primary">
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
});

export default Info;
