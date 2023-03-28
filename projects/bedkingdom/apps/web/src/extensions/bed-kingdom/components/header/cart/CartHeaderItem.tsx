import { useImageSizeBaseOnCfg } from '@modules/ui/hook/useImageSizeBaseOnCfg';
import { withCartDetailActions } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCartDetailActions';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Popup from 'reactjs-popup';

const CartHeaderItem: React.FC<{
  item: any;
  cartId: string;
  closeCart: () => void;
  openCart: () => void;
}> = combineHOC(withCartDetailActions)(
  React.memo((props) => {
    const [showDetail, setShowDetail] = useState(false);

    const mediaRef = useRef<any>();

    const showDetailOption = useMemo(() => {
      if (
        (props?.item?.configurable_options &&
          props?.item?.configurable_options?.length > 0) ||
        (props?.item?.customizable_options &&
          props?.item?.customizable_options?.length > 0) ||
        props?.item?.date_picker
      ) {
        return true;
      }
      return false;
    }, [props?.item]);
    const currentWidth = useMemo(() => {
      return mediaRef?.current?.offsetWidth;
    }, [mediaRef.current]);

    const { width, height } = useImageSizeBaseOnCfg(
      ['product', 'default_image_w_h'],
      undefined,
      currentWidth,
      undefined
    );

    const removeCartItem = useCallback(() => {
      const cartId: any = props?.cartId;
      if (
        typeof props.actions.removeItemFromCart === 'function' &&
        cartId &&
        props?.item?.id
      ) {
        props.actions.removeItemFromCart(cartId, props?.item?.id);
      }
    }, []);
    const updateQty = useCallback(
      (cartItemId: number, qty: any) => {
        if (props.actions?.updateCartItem && props?.cartId) {
          props.actions.updateCartItem({
            cartId: props?.cartId,
            cartItemId,
            qty,
          });
        }
      },
      [props.state?.cart?.id]
    );

    const popupDeleteItem = useCallback(() => {
      return (
        <Popup
          trigger={
            <div
              className="product-item__action absolute"
              // onClick={() => removeCartItem()}
            >
              <span
                className="action delete block cursor-pointer"
                title="Remove item"
              >
                <span>
                  <svg
                    width="12"
                    height="16"
                    viewBox="0 0 12 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33342 5.5V13.8333H2.66675V5.5H9.33342ZM8.08342 0.5H3.91675L3.08342 1.33333H0.166748V3H11.8334V1.33333H8.91675L8.08342 0.5ZM11.0001 3.83333H1.00008V13.8333C1.00008 14.75 1.75008 15.5 2.66675 15.5H9.33342C10.2501 15.5 11.0001 14.75 11.0001 13.8333V3.83333Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </span>
            </div>
          }
          modal
          nested
          className="delete"
        >
          {
            // @ts-ignore
            (close: any) => (
              <div className="modal">
                <div className="header text-15px">
                  Do you want to delete this item?
                </div>
                <div className="actions">
                  <button
                    type="button"
                    className="action mr-3 h-40px min-w-125 rounded-3 bg-red-700 font-bold text-white"
                    onClick={() => {
                      close();
                      props?.openCart();
                    }}
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="action h-40px min-w-125 whitespace-nowrap rounded-3 bg-main-2361aa px-4 font-bold text-white"
                    value="Cancel Coupon"
                    onClick={() => {
                      removeCartItem();
                      close();
                      props?.openCart();
                    }}
                  >
                    <span>Ok</span>
                  </button>
                </div>
              </div>
            )
          }
        </Popup>
      );
    }, []);

    return (
      <div className="product-item">
        <div className="product-item__inner relative flex">
          <span className="product-item__photo" ref={mediaRef}>
            <span className="product-item__image">
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
            </span>
          </span>
          <div className="product-item__details cursor-default">
            <div
              className="product-item-name cursor-pointer text-13px font-bold text-color-222 hover:text-color-2362AA"
              onClick={() => {
                RouterSingleton.push(`/${props?.item?.product?.url_key}.html`);
                props?.closeCart();
              }}
            >
              <span>{props?.item?.product?.name}</span>
            </div>
            {showDetailOption && (
              <div
                className="product-options cursor-pointer text-13px text-color-999"
                onClick={() => setShowDetail(!showDetail)}
              >
                <span className="product-options__toggle cursor-pointer">
                  <span>See Details</span>
                  <span className="product-options__arrow">
                    {showDetail ? (
                      <i className="fa fa-angle-up" />
                    ) : (
                      <i className="fa fa-angle-down" />
                    )}
                  </span>
                </span>
                {/*click see details remove class hidden ben duoi*/}
                {props?.item?.configurable_options &&
                  props?.item?.configurable_options?.length > 0 && (
                    <div
                      className={clsx(
                        'content-options',
                        !showDetail && 'hidden'
                      )}
                    >
                      {props?.item?.configurable_options.map((item: any) => (
                        <div
                          className="product-options__list"
                          key={item?.option_label}
                        >
                          <div className="label font-bold text-color-222">
                            {item?.option_label}
                          </div>
                          <div className="values">
                            <span>{item?.value_label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {props?.item?.customizable_options &&
                  props?.item?.customizable_options?.length > 0 && (
                    <div
                      className={clsx(
                        'content-options',
                        !showDetail && 'hidden'
                      )}
                    >
                      {props?.item?.customizable_options.map((item: any) => (
                        <div
                          className="product-options__list"
                          key={item?.label}
                        >
                          <div className="label font-bold text-color-222">
                            {item?.label}
                          </div>
                          <div className="values">
                            <span>{item?.values[0]?.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {props?.item?.date_picker && (
                  <div
                    className={clsx('content-options', !showDetail && 'hidden')}
                  >
                    <div className="product-options__list">
                      <div className="label font-bold text-color-222">
                        Delivery date
                      </div>
                      <div className="values">
                        <span>
                          {JSON.parse(props?.item?.date_picker) &&
                            JSON.parse(props?.item?.date_picker)[0]?.value}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="product-item__pricing">
              <div className="price-container">
                <span className="price-wrapper">
                  <span className="price-including-tax">
                    <span className="miniCart-price">
                      <span className="price text-16px font-bold text-color-2362AA">
                        <UiExtension
                          uiId="CURRENCY"
                          price={props?.item?.prices?.price?.value}
                        />
                      </span>
                    </span>
                  </span>
                </span>
                {props?.item?.product?.price_range?.maximum_price?.regular_price
                  ?.value &&
                  props?.item?.product?.price_range?.maximum_price
                    ?.regular_price?.value >
                    props?.item?.prices?.price?.value && (
                    <span className="price-wrapper">
                      <span className="price-including-tax">
                        <span className="miniCart-price">
                          <span className="price-old text-color-999">
                            <UiExtension
                              uiId="CURRENCY"
                              price={
                                props?.item?.product?.price_range?.maximum_price
                                  ?.regular_price?.value
                              }
                            />
                          </span>
                        </span>
                      </span>
                    </span>
                  )}
              </div>
            </div>
          </div>
          {popupDeleteItem()}
          {props?.item?.product?.__typename === 'ConfigurableProduct' && (
            <div
              className="product-item__action absolute mt-9 cursor-pointer"
              onClick={() => {
                props?.closeCart();
                RouterSingleton.push(`/${props?.item?.product?.url_key}.html`);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 19 19"
                height="13px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 19 19"
                width="13px"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M8.44,7.25C8.348,7.342,8.277,7.447,8.215,7.557L8.174,7.516L8.149,7.69   C8.049,7.925,8.014,8.183,8.042,8.442l-0.399,2.796l2.797-0.399c0.259,0.028,0.517-0.007,0.752-0.107l0.174-0.024l-0.041-0.041   c0.109-0.062,0.215-0.133,0.307-0.225l5.053-5.053l-3.191-3.191L8.44,7.25z"
                    fill="black"
                  />
                  <path
                    d="M18.183,1.568l-0.87-0.87c-0.641-0.641-1.637-0.684-2.225-0.097l-0.797,0.797l3.191,3.191l0.797-0.798   C18.867,3.205,18.824,2.209,18.183,1.568z"
                    fill="#231F20"
                  />
                  <path
                    d="M15,9.696V17H2V2h8.953l1.523-1.42c0.162-0.161,0.353-0.221,0.555-0.293   c0.043-0.119,0.104-0.18,0.176-0.287H0v19h17V7.928L15,9.696z"
                    fill="#231F20"
                  />
                </g>
              </svg>
            </div>
          )}
        </div>
        {props?.item?.product?.stock_status === 'OUT_OF_STOCK' && (
          <div className="page-message pt-3">
            <div className="container mx-auto">
              <div className="message message-error my-3 py-2 px-4">
                <span>There are no source items with the in stock status</span>
              </div>
            </div>
          </div>
        )}

        <div className="product-item__bottom">
          <div className="flex items-center justify-between">
            <UiExtension
              uiId="CART_HEADER_ITEM_QTY"
              qty={props?.item?.quantity}
              whenUpdateItemQty={(qty: number) => {
                updateQty(parseInt(props?.item?.id), qty);
              }}
            />
            <div className="product-item__sum">
              <span className="text-blue text-16px font-bold text-color-2362AA">
                <UiExtension
                  uiId="CURRENCY"
                  price={props.item?.prices?.row_total_including_tax?.value}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default CartHeaderItem;
