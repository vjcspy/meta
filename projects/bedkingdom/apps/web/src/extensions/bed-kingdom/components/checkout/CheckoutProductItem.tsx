import { useImageSizeBaseOnCfg } from '@modules/ui/hook/useImageSizeBaseOnCfg';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useMemo, useRef, useState } from 'react';

const CheckoutProductItem = combineHOC()((props) => {
  const [showView, setShowView] = useState(false);
  const mediaRef = useRef<any>();

  const currentWidth = useMemo(() => {
    return mediaRef?.current?.offsetWidth;
  }, [mediaRef.current]);

  const { width, height } = useImageSizeBaseOnCfg(
    ['product', 'default_image_w_h'],
    undefined,
    currentWidth,
    undefined
  );
  return (
    <div className="product-item flex border-b border-color-ccc pt-3 pb-2">
      <div className="product-item-image mr-2" ref={mediaRef}>
        <UiExtension
          uiId="IMAGE"
          className="product-image-photo"
          label={props?.item?.product?.small_image?.label || ''}
          width={width}
          height={height}
          src={
            props?.item?.product?.bed_data?.bed_category_product_image[0]
              ?.url || props?.item?.product?.small_image?.url
          }
        />
      </div>
      <div className="product-item-details">
        <strong> {props?.item?.product?.name}</strong>
        <div className="details-qty my-2 flex text-color-666">
          <span className="label pr-2">
            <span>Qty</span>
          </span>
          <span className="value">{props?.item?.quantity}</span>
        </div>
        <div className="cart-price font-bold text-color-666">
          <span className="price">
            <UiExtension
              uiId="CURRENCY"
              price={props?.item?.prices?.price?.value}
            />
          </span>

          {props?.item?.product?.price_range?.maximum_price?.regular_price
            ?.value &&
            props?.item?.product?.price_range?.maximum_price?.regular_price
              ?.value > props?.item?.prices?.price?.value && (
              <span className="price-old">
                <s className="price text-md block text-color-666">
                  <UiExtension
                    uiId="CURRENCY"
                    price={
                      props?.item?.product?.price_range?.maximum_price
                        ?.regular_price?.value
                    }
                  />
                </s>
              </span>
            )}
        </div>
        {/*click vao title add class active ben duoi*/}
        <div
          className="b-code-title my-2 flex items-center font-bold"
          onClick={() => setShowView(!showView)}
        >
          <span className="pr-2 uppercase text-color-666">View Details</span>
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6.33301L0 1.33301L1.175 0.158008L5 3.97467L8.825 0.158008L10 1.33301L5 6.33301Z"
              fill="#5F5F5F"
            />
          </svg>
        </div>
        <div className={clsx(showView && 'active')}>
          {/*add title ben tren remove class hidden ben duoi*/}
          {props?.item?.configurable_options &&
            props?.item?.configurable_options?.length > 0 &&
            props?.item?.configurable_options.map((it: any) => (
              <dl
                className={clsx(
                  'details-option flex text-color-666',
                  !showView && 'hidden'
                )}
                key={it?.label}
              >
                <span className="label pr-2">
                  <span> {it?.option_label} :</span>
                </span>
                <span className="value">{it?.value_label}</span>
              </dl>
            ))}
          {props?.item?.date_picker && (
            <dl
              className={clsx(
                'details-option flex hidden text-color-666',
                !showView && 'hidden'
              )}
            >
              <span className="label pr-2">
                <span> Delivery date :</span>
              </span>
              <span className="value">
                {JSON.parse(props?.item?.date_picker) &&
                  JSON.parse(props?.item?.date_picker)[0]?.value}
              </span>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
});

export default CheckoutProductItem;
