import { withProductWishlistDataCheckout } from '@extensions/bed-kingdom/hoc/checkout/withProductWishlistDataCheckout';
import { withBedCustomerWishlistActions } from '@extensions/bed-kingdom/hoc/wishlist/withBedCustomerWishlistActions';
import { withBedCustomerWishlistData } from '@extensions/bed-kingdom/hoc/wishlist/withCustomerWishlistData';
import { useProductItemList } from '@modules/catalog/hook/product/useProductItemList';
import { useImageSizeBaseOnCfg } from '@modules/ui/hook/useImageSizeBaseOnCfg';
import { withCustomerWishlistActions } from '@vjcspy/r/build/modules/account/hoc/wishlist/withCustomerWishlistActions';
import { withAccountState } from '@vjcspy/r/build/modules/account/hoc/withAccountState';
import { withCartDetailActions } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCartDetailActions';
import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { withIsResolvedCart } from '@vjcspy/r/build/modules/checkout/hoc/cart/withIsResolvedCart';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import Popup from 'reactjs-popup';

const CheckoutCartItems = combineHOC(
  withBedCustomerWishlistActions,
  withCheckoutCartData,
  withIsResolvedCart,
  withCartDetailActions,
  withProductWishlistDataCheckout,
  withAccountState,
  withBedCustomerWishlistData,
  withCustomerWishlistActions
)((props) => {
  const mediaRef = useRef<any>();

  const { toggleWishlist } = useProductItemList(props);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const currentWidth = useMemo(() => {
    return mediaRef?.current?.offsetWidth;
  }, [mediaRef.current]);

  const { width, height } = useImageSizeBaseOnCfg(
    ['product', 'default_image_w_h'],
    undefined,
    currentWidth,
    undefined
  );

  const removeCartItem = useCallback((itemId: number) => {
    const cartId: any = props?.state?.cart?.id;
    if (
      typeof props.actions.removeItemFromCart === 'function' &&
      cartId &&
      itemId
    ) {
      props.actions.removeItemFromCart(cartId, itemId);
    }
  }, []);

  const updateQty = useCallback(
    (cartItemId: number, qty: any) => {
      const cartId: any = props?.state?.cart?.id;
      if (props.actions?.updateCartItem && cartId) {
        props.actions.updateCartItem({
          cartId: cartId,
          cartItemId,
          qty,
        });
      }
    },
    [props.state?.cart?.id]
  );
  useEffect(() => {
    if (props?.state?.cart?.items && props?.state?.cart?.items?.length > 0) {
      props?.state?.cart?.items.forEach((item: any) => {
        if (item?.product?.stock_status === 'OUT_OF_STOCK') {
          // AlertService.error(
          //   'There are no source items with the in stock status.'
          // );
          // AlertService.error('Some of the products are out of stock.');
          return false;
        }
      });
    }
  }, [props?.state?.cart?.items]);

  if (!props.state?.isResolvedCart) {
    return <UiExtension uiId="LOADING_INDICATOR" global={true} />;
  }

  const popupDeleteItem = useCallback((item: any) => {
    return (
      <Popup
        trigger={
          <div
            // onClick={() => removeCartItem(item?.id)}
            className="cursor-pointer  hover:text-color-2362AA"
          >
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
                  className="action mr-3 h-40px min-w-125 font-bold"
                  onClick={() => {
                    close();
                  }}
                >
                  <span>Cancel</span>
                </button>
                <button
                  type="button"
                  className="action h-40px min-w-125 whitespace-nowrap rounded-3 bg-main-2361aa px-4 font-bold text-white"
                  value="Cancel Coupon"
                  onClick={() => {
                    removeCartItem(item?.id);
                    close();
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
    <>
      <table className="b-table-cart w-full">
        {!isMobile && (
          <thead>
            <tr className="uppercase">
              <th
                className="b-col item border-b border-t-0 border-color-ccc pb-4 pl-0 text-left text-color-666"
                scope="col"
              >
                <span>Item</span>
              </th>
              <th
                className="b-col price border-b border-t-0 border-color-ccc pb-4 text-right text-color-666"
                scope="col"
              >
                <span>Price</span>
              </th>
              <th
                className="b-col qty border-b border-t-0 border-color-ccc pb-4 text-right text-color-666"
                scope="col"
              >
                <span>Qty</span>
              </th>
            </tr>
          </thead>
        )}
        <tbody className="cart item">
          {props?.state?.cart?.items &&
            props?.state?.cart?.items?.length > 0 &&
            props?.state?.cart?.items
              .filter((it: any) => it?.uid)
              .map((item: any) => (
                <tr className="item-info" key={item?.uid}>
                  <td className="b-col py-3 pl-0 text-left mdm:pr-0">
                    <div className="md:flex">
                      <div
                        className="item-info-img md:mr-4 md:max-w-125"
                        ref={mediaRef}
                      >
                        <UiExtension
                          uiId="IMAGE"
                          className="product-image-photo"
                          label={item?.product?.small_image?.label || ''}
                          width={width}
                          height={height}
                          src={
                            item?.product?.bed_data
                              ?.bed_category_product_image[0]?.url ||
                            item?.product?.small_image?.url
                          }
                        />
                      </div>
                      {!isMobile && (
                        <div className="item-info-details">
                          <strong
                            className="item-info-name mb-1 block cursor-pointer hover:text-color-2362AA mdm:mt-2"
                            onClick={() => {
                              RouterSingleton.push(
                                `/${item?.product?.url_key}.html`
                              );
                            }}
                          >
                            {item?.product?.name}
                          </strong>

                          {item?.configurable_options &&
                            item?.configurable_options?.length > 0 &&
                            item?.configurable_options.map((it: any) => (
                              <dl
                                className="item-options flex"
                                key={it?.configurable_product_option_uid}
                              >
                                <dt className="mr-3 font-bold text-color-666">
                                  {it?.option_label} :
                                </dt>
                                <dd>{it?.value_label}</dd>
                              </dl>
                            ))}

                          {item?.date_picker && (
                            <dl className="item-options md:flex">
                              <dt className="mr-3 font-bold text-color-666">
                                Delivery date:
                              </dt>
                              <dd>
                                {JSON.parse(item?.date_picker) &&
                                  JSON.parse(item?.date_picker)[0]?.value}
                              </dd>
                            </dl>
                          )}
                          {item?.product?.stock_status === 'OUT_OF_STOCK' && (
                            <div className="page-message pt-3">
                              <div className="container mx-auto">
                                <div className="message message-error my-3 py-2 px-4">
                                  <span>
                                    There are no source items with the in stock
                                    status
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  {isMobile && (
                    <td className="mdm:pl-3">
                      <div className="item-info-details">
                        <strong
                          className="item-info-name mb-2 block cursor-pointer hover:text-color-2362AA"
                          onClick={() => {
                            RouterSingleton.push(
                              `/${item?.product?.url_key}.html`
                            );
                          }}
                        >
                          {item?.product?.name}
                        </strong>

                        {item?.configurable_options &&
                          item?.configurable_options?.length > 0 &&
                          item?.configurable_options.map((it: any) => (
                            <dl
                              className="item-options flex"
                              key={it?.configurable_product_option_uid}
                            >
                              <dt className="mr-3 font-bold text-color-666">
                                {it?.option_label} :
                              </dt>
                              <dd>{it?.value_label}</dd>
                            </dl>
                          ))}

                        {item?.date_picker && (
                          <dl className="item-options md:flex">
                            <dt className="mr-3 font-bold text-color-666">
                              Delivery date:
                            </dt>
                            <dd>
                              {JSON.parse(item?.date_picker) &&
                                JSON.parse(item?.date_picker)[0]?.value}
                            </dd>
                          </dl>
                        )}
                        {item?.product?.stock_status === 'OUT_OF_STOCK' && (
                          <div className="page-message pt-3">
                            <div className="container mx-auto">
                              <div className="message message-error my-3 py-2 px-4">
                                <span>
                                  There are no source items with the in stock
                                  status
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="b-col qty mt-2 flex justify-between text-left">
                        <UiExtension
                          uiId="CHECKOUT_CART_ITEMS_QTY"
                          qty={item?.quantity}
                          whenUpdateItemQty={(qty: number) => {
                            updateQty(parseInt(item?.id), qty);
                          }}
                        />
                        <div className="actions-toolbar mt-3 flex">
                          {!props?.actions?.productInWishlistCheck(
                            item?.product?.sku
                          ) && (
                            <div
                              onClick={() =>
                                toggleWishlist({
                                  sku: item?.product?.sku,
                                  quantity: 1,
                                })
                              }
                              className="mr-4 cursor-pointer hover:text-color-2362AA"
                            >
                              <svg
                                width="18"
                                height="16"
                                viewBox="0 0 18 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.7493 0.5C11.2993 0.5 9.90768 1.175 8.99935 2.24167C8.09102 1.175 6.69935 0.5 5.24935 0.5C2.68268 0.5 0.666016 2.51667 0.666016 5.08333C0.666016 8.23333 3.49935 10.8 7.79102 14.7L8.99935 15.7917L10.2077 14.6917C14.4993 10.8 17.3327 8.23333 17.3327 5.08333C17.3327 2.51667 15.316 0.5 12.7493 0.5ZM9.08268 13.4583L8.99935 13.5417L8.91602 13.4583C4.94935 9.86667 2.33268 7.49167 2.33268 5.08333C2.33268 3.41667 3.58268 2.16667 5.24935 2.16667C6.53268 2.16667 7.78268 2.99167 8.22435 4.13333H9.78268C10.216 2.99167 11.466 2.16667 12.7493 2.16667C14.416 2.16667 15.666 3.41667 15.666 5.08333C15.666 7.49167 13.0493 9.86667 9.08268 13.4583Z"
                                  fill="black"
                                />
                              </svg>
                            </div>
                          )}

                          {item?.product?.__typename ===
                            'ConfigurableProduct' && (
                            <div
                              className="mr-4 cursor-pointer hover:text-color-2362AA"
                              onClick={() => {
                                RouterSingleton.push(
                                  `/${item?.product?.url_key}.html`
                                );
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                enableBackground="new 0 0 19 19"
                                height="15px"
                                id="Layer_1"
                                version="1.1"
                                viewBox="0 0 19 19"
                                width="15px"
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
                          {popupDeleteItem(item)}
                        </div>
                      </div>
                    </td>
                  )}
                  {!isMobile && (
                    <td className="b-col price text-right">
                      {item?.product?.price_range?.maximum_price?.regular_price
                        ?.value &&
                        item?.product?.price_range?.maximum_price?.regular_price
                          ?.value > item?.prices?.price?.value && (
                          <span className="price-old">
                            <s className="price text-md block text-color-666">
                              <UiExtension
                                uiId="CURRENCY"
                                price={
                                  item?.product?.price_range?.maximum_price
                                    ?.regular_price?.value
                                }
                              />
                            </s>
                          </span>
                        )}

                      <span className="price-including-tax">
                        <span className="price text-lg font-bold">
                          <UiExtension
                            uiId="CURRENCY"
                            price={item?.prices?.price?.value}
                          />
                        </span>
                      </span>
                    </td>
                  )}
                  {!isMobile && (
                    <td className="b-col qty pr-0 text-right">
                      <UiExtension
                        uiId="CHECKOUT_CART_ITEMS_QTY"
                        qty={item?.quantity}
                        whenUpdateItemQty={(qty: number) => {
                          updateQty(parseInt(item?.id), qty);
                        }}
                      />
                      <div className="actions-toolbar mt-3 flex justify-end">
                        {!props?.actions?.productInWishlistCheck(
                          item?.product?.sku
                        ) && (
                          <div
                            onClick={() =>
                              toggleWishlist({
                                sku: item?.product?.sku,
                                quantity: 1,
                              })
                            }
                            className="mr-4 cursor-pointer hover:text-color-2362AA"
                          >
                            <svg
                              width="18"
                              height="16"
                              viewBox="0 0 18 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.7493 0.5C11.2993 0.5 9.90768 1.175 8.99935 2.24167C8.09102 1.175 6.69935 0.5 5.24935 0.5C2.68268 0.5 0.666016 2.51667 0.666016 5.08333C0.666016 8.23333 3.49935 10.8 7.79102 14.7L8.99935 15.7917L10.2077 14.6917C14.4993 10.8 17.3327 8.23333 17.3327 5.08333C17.3327 2.51667 15.316 0.5 12.7493 0.5ZM9.08268 13.4583L8.99935 13.5417L8.91602 13.4583C4.94935 9.86667 2.33268 7.49167 2.33268 5.08333C2.33268 3.41667 3.58268 2.16667 5.24935 2.16667C6.53268 2.16667 7.78268 2.99167 8.22435 4.13333H9.78268C10.216 2.99167 11.466 2.16667 12.7493 2.16667C14.416 2.16667 15.666 3.41667 15.666 5.08333C15.666 7.49167 13.0493 9.86667 9.08268 13.4583Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                        )}

                        {item?.product?.__typename ===
                          'ConfigurableProduct' && (
                          <div
                            className="mr-4 cursor-pointer hover:text-color-2362AA"
                            onClick={() => {
                              RouterSingleton.push(
                                `/${item?.product?.url_key}.html`
                              );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              enableBackground="new 0 0 19 19"
                              height="15px"
                              id="Layer_1"
                              version="1.1"
                              viewBox="0 0 19 19"
                              width="15px"
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
                        {popupDeleteItem(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
      <UiExtension uiId="CHECKOUT_CART_BUTTON" />
    </>
  );
});

export default CheckoutCartItems;
