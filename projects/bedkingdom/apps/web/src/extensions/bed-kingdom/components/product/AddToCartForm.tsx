import { withBedKingdomReviews } from '@extensions/bed-kingdom/hoc/common/withBedKingdomReviews';
import { withBedkingdomGetDeliveryNextDay } from '@extensions/bed-kingdom/hoc/product/withBedkingdomGetDeliveryNextDay';
import { withBedCustomerWishlistActions } from '@extensions/bed-kingdom/hoc/wishlist/withBedCustomerWishlistActions';
import { withBedCustomerWishlistData } from '@extensions/bed-kingdom/hoc/wishlist/withCustomerWishlistData';
import BED_KINGDOM_COMMON from '@extensions/bed-kingdom/values/BED_KINGDOM_COMMON';
import { useProductItemList } from '@modules/catalog/hook/product/useProductItemList';
import { withCustomerWishlistActions } from '@vjcspy/r/build/modules/account/hoc/wishlist/withCustomerWishlistActions';
import { withAccountState } from '@vjcspy/r/build/modules/account/hoc/withAccountState';
import { withProductInfo } from '@vjcspy/r/build/modules/catalog/hoc/category/withProductInfo';
import { withCurrentProductState } from '@vjcspy/r/build/modules/catalog/hoc/product/withCurrentProductState';
import { withProductDetailActions } from '@vjcspy/r/build/modules/catalog/hoc/product/withProductDetailActions';
import { withProductWishlistData } from '@vjcspy/r/build/modules/catalog/hoc/product/withProductWishlistData';
import { withAddToCartActions } from '@vjcspy/r/build/modules/checkout/hoc/cart/withAddToCartActions';
import { withAddToCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withAddToCartData';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import moment from 'moment/moment';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import DatePicker from 'react-datepicker';

const AddToCartForm = combineHOC(
  withCurrentProductState,
  withAddToCartActions,
  withAddToCartData,
  withBedCustomerWishlistData,
  withCustomerWishlistActions,
  withAccountState,
  withProductWishlistData,
  withProductDetailActions,
  withBedCustomerWishlistActions,
  withBedkingdomGetDeliveryNextDay,
  withCurrentProductState,
  withProductInfo,
  withBedKingdomReviews
)((props) => {
  const [qty, setQty] = useState<any>(props?.state?.productInfo?.qty ?? 1);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [minDate, setMinDate] = useState(new Date());
  const [excludeDates, setExcludeDates] = useState([]);
  const isWeekday = (date: any) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  // @ts-ignore
  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div
      className="delivery-date  d-flex align-items-center"
      onClick={onClick}
      // @ts-ignore
      ref={ref}
    >
      <span className="calendar-icon">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="20px"
          height="20px"
          viewBox="0 0 610.398 610.398"
          // @ts-ignore
          style={{ enableBackground: 'new 0 0 610.398 610.398' }}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <path
                d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052
			c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553
			V35.544V24.992C180.791,11.188,171.291,0,159.567,0z"
              />
              <path
                d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992
			h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z"
              />
              <path
                d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117
			V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818
			c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764
			V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z"
              />
              <path
                d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z"
              />
              <path
                d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017
			c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z"
              />
              <path
                d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z"
              />
              <path
                d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z"
              />
              <path
                d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z"
              />
              <path
                d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032
			c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z"
              />
              <path
                d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z"
              />
              <path
                d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z"
              />
            </g>
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      </span>
      {value}
    </div>
  ));
  const isAddingToCArt = useMemo(() => {
    if (props.actions?.isAddingProductId) {
      return props.actions.isAddingProductId(props.state?.product?.id);
    }

    return false;
  }, [props.actions?.isAddingProductId, props.state?.product?.id]);

  const addToCart = useCallback(() => {
    if (isAddingToCArt) {
      return;
    }

    if (!qty || qty === 0) {
      setErrorInput(true);
      return;
    }

    if (
      typeof props.actions?.prepareProductAddToCart === 'function' &&
      props.state?.product?.id &&
      props.actions?.openCart
    ) {
      props.actions.prepareProductAddToCart(props.state.product.id, () => {
        props.actions.openCart();
      });
    } else {
      console.warning('could not found product in state', props);
    }
  }, [isAddingToCArt, props?.state.product, qty]);

  const { toggleWishlist } = useProductItemList(props);

  const updateQty = useCallback(
    (e: any) => {
      const value = e?.target?.value || e;
      if (!isNaN(value) && value > 0) {
        setErrorInput(false);
        if (parseInt(value, 10) > 99) {
          setQty(99);
        } else {
          setQty(value);
        }
      } else {
        setQty('');
        setErrorInput(true);
      }
    },
    [qty]
  );

  useEffect(() => {
    if (props?.state?.dataDeliveryNextDay) {
      if (
        props?.state?.dataDeliveryNextDay?.limit_dates &&
        props?.state?.dataDeliveryNextDay?.limit_dates.length > 0
      ) {
        const arrExcludeDates =
          props?.state?.dataDeliveryNextDay?.limit_dates.map((item: any) => {
            // @ts-ignore
            if (!isNaN(new Date(item))) {
              return new Date(item);
            }
          });
        setExcludeDates(arrExcludeDates);
      }

      if (props?.state?.dataDeliveryNextDay?.min_date) {
        setMinDate(new Date(props?.state?.dataDeliveryNextDay?.min_date));
        setStartDate(new Date(props?.state?.dataDeliveryNextDay?.min_date));
      }
    }
  }, [props?.state?.dataDeliveryNextDay]);

  useEffect(() => {
    if (qty > 0 && props?.state?.product?.id) {
      props?.actions?.setProductInfoQty(props?.state?.product?.id, qty);
    }
  }, [qty]);

  useEffect(() => {
    setQty(1);
  }, []);

  const productDelivery = useMemo(() => {
    let data = props?.state?.product?.delivery;
    if (
      props?.state?.productInfo?.configurable?.variants &&
      Array.isArray(props?.state?.productInfo?.configurable?.variants) &&
      props?.state?.productInfo?.configurable?.variants.length > 0
    ) {
      if (
        props?.state?.productInfo?.configurable?.variants[0]?.product?.delivery
      ) {
        data =
          props?.state?.productInfo?.configurable?.variants[0]?.product
            ?.delivery;
      }
    }
    return data;
  }, [props?.state?.product, props?.state?.productInfo]);

  useEffect(() => {
    if (
      productDelivery === 75 &&
      startDate &&
      props?.state?.product?.id &&
      typeof props?.actions?.customAdditionalAttribute
        ?.toggleAdditionalAttribute === 'function'
    ) {
      props?.actions?.customAdditionalAttribute?.toggleAdditionalAttribute(
        props?.state?.product?.id,
        'date_picker',
        moment(startDate).format('MMM DD, yyyy | dddd')
      );
    }
  }, [startDate, props?.state?.product?.id, productDelivery]);

  const deliveryLabel = useMemo(() => {
    if (
      props?.state?.product?.delivery !==
        BED_KINGDOM_COMMON.SHOW_ICON_NEXT_DELIVERY_DATE &&
      props?.state?.attributeCustom &&
      props?.state?.attributeCustom.length > 0
    ) {
      // eslint-disable-next-line no-unused-vars
      const attributeOptions =
        props?.state?.attributeCustom
          .filter((item: any) => item.attribute_code === 'delivery')[0]
          ?.attribute_options?.filter(
            (it: any) =>
              parseInt(it?.value, 10) ===
              parseInt(props?.state?.product?.delivery, 10)
          )?.[0]?.label || null;
      return attributeOptions;
    }
    return null;
  }, [props?.state?.product, props?.state?.attributeCustom]);

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

  return (
    <>
      {props?.state?.product?.stock_status === 'IN_STOCK' && (
        <>
          {productDelivery === 75 ? (
            <div className="b-product-delivery flex items-center pt-5">
              <div className="delivery-name items-center mr-3 lg:mr-9 flex">
                <img
                  className="delivery-icon mr-2"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAATCAMAAABbR/ZNAAAAM1BMVEVHcExmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYIfjouAAAAEHRSTlMA7KiwOhHlS/d5zmIulCC/obFtDgAAANBJREFUGBllwQt2hCAQRcELNDR/3/5XGz2Oc0xSxanrlzB5yVr+Jucly3gLqZ2MW5bzVmoopWhxq8abBqepzmWv4ZfJTTZj706pGxg91Mviprm0ohpH5T9ZTDDlCNqRUooxOh+ymIDSsmDESzoGH7LY995qWWT+kg1dbIteaw+1VuehwTSziQtzX8Pd+dLg5uKkzSnzIQcyMAVkpYFXdXK76PB8qHpO4pRKmloe0g6XXmIP3tRK4rYEJh5y0OJharMUHqVYk/E1au2bR+61DuAHYWIJ+3epQ94AAAAASUVORK5CYII="
                  alt=""
                  width="29"
                  loading="lazy"
                />
                <span>Free Delivery Next Day</span>
              </div>
              {minDate && (
                <DatePicker
                  dateFormat="MMM dd, yyyy | EEEE"
                  selected={startDate}
                  minDate={minDate}
                  filterDate={isWeekday}
                  excludeDates={excludeDates}
                  onChange={(date: any) => setStartDate(date)}
                  customInput={<ExampleCustomInput />}
                />
              )}
            </div>
          ) : (
            <div className="flex justify-between mb-3 pt-5">
              <div className="delivery-name items-center mr-3 lg:mr-9 flex">
                <img
                  className="delivery-icon mr-2"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAATCAMAAABbR/ZNAAAAM1BMVEVHcExmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYIfjouAAAAEHRSTlMA7KiwOhHlS/d5zmIulCC/obFtDgAAANBJREFUGBllwQt2hCAQRcELNDR/3/5XGz2Oc0xSxanrlzB5yVr+Jucly3gLqZ2MW5bzVmoopWhxq8abBqepzmWv4ZfJTTZj706pGxg91Mviprm0ohpH5T9ZTDDlCNqRUooxOh+ymIDSsmDESzoGH7LY995qWWT+kg1dbIteaw+1VuehwTSziQtzX8Pd+dLg5uKkzSnzIQcyMAVkpYFXdXK76PB8qHpO4pRKmloe0g6XXmIP3tRK4rYEJh5y0OJharMUHqVYk/E1au2bR+61DuAHYWIJ+3epQ94AAAAASUVORK5CYII="
                  alt=""
                  width="29"
                  loading="lazy"
                />
                <span>Free Delivery</span>
              </div>
              <span>{deliveryLabel}</span>
            </div>
          )}

          <div className="b-product-prices flex justify-between pt-5">
            <UiExtension
              uiId="PRODUCT_INFO_PRICE"
              productInfo={productInfoData}
            />
            <div className="b-product-label" />
          </div>

          <div className="b-product-actions flex items-center justify-between">
            <div className="b-actions-qty">
              <div
                className={clsx(
                  'cursor-pointer b-actions-icon',
                  parseInt(qty, 10) === 1 && 'divDisable'
                )}
                onClick={() => {
                  if (parseInt(qty, 10) > 1) {
                    updateQty(parseInt(qty, 10) - 1);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16px"
                  height="16px"
                  id="Layer_1"
                  version="1.1"
                >
                  <rect height="64" width="384" x="64" y="224"></rect>
                </svg>
              </div>
              <input type="number" value={qty} onChange={updateQty} />
              <div
                className={clsx(
                  'b-actions-icon cursor-pointer',
                  parseInt(qty, 10) > 99 && 'divDisable'
                )}
                onClick={() => {
                  if (parseInt(qty, 10) >= 1) {
                    updateQty(parseInt(qty, 10) + 1);
                  } else if (parseInt(qty, 10) >= 99) {
                    updateQty(99);
                  } else {
                    updateQty(1);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16px"
                  height="16px"
                  fill="#000000"
                >
                  <path
                    fillRule="evenodd"
                    d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                  ></path>
                </svg>
              </div>
            </div>
            <div
              className={clsx('b-actions-added', isAddingToCArt && 'adding')}
              onClick={addToCart}
            >
              <span>{isAddingToCArt ? 'Adding...' : 'Add to Basket'}</span>
            </div>
            <div
              className={clsx(
                'b-actions-btn b-actions-wishlist',
                props.state?.productInWishlist && 'active'
              )}
              onClick={() =>
                toggleWishlist({
                  sku: props.state.product!.sku!,
                  quantity: 1,
                })
              }
            >
              <i className="fa fa-heart" />
            </div>
            {/*<div className="b-actions-btn  b-actions-compare hidden">*/}
            {/*  <i className="fa fa-refresh" />*/}
            {/*</div>*/}
          </div>
        </>
      )}

      {errorInput && (
        <span className="mt-2 text-red-700">
          Please enter a number greater than 0 in this field.
        </span>
      )}
    </>
  );
});

export default AddToCartForm;
