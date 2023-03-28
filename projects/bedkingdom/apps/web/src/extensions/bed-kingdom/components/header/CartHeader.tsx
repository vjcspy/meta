import { withMgtCheckoutActions } from '@extensions/bed-kingdom/hoc/checkout/withMgtCheckoutActions';
import { withBedStatusPopupData } from '@extensions/bed-kingdom/hoc/content/withBedStatusPopupData';
import { useBodyScroll } from '@modules/ui/hook/useBodyScroll';
import ROUTES from '@values/extendable/ROUTES';
import { withCustomer } from '@vjcspy/r/build/modules/account/hoc/withCustomer';
import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { useOutsideClickHandle } from '@web/base/dist/hook/useOutsideClickHandle';
import { isSSR } from '@web/base/dist/util/isSSR';
import { combineHOC, UiExtension } from '@web/ui-extension';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const CartHeader = combineHOC(
  withCheckoutCartData,
  withCustomer,
  withMgtCheckoutActions,
  withBedStatusPopupData
)((props) => {
  const wrapperRef = useRef(null);

  const { body, disableScroll, enableScroll } = useBodyScroll();

  useEffect(() => {
    if (!body) {
      return;
    }
    if (props.state?.isCartOpening === true) {
      setTimeout(() => {
        disableScroll();
        body?.classList?.add('main-body', 'sidebar-move');
      }, 100);
    } else {
      enableScroll();
      body?.classList?.remove('sidebar-move');
    }
  }, [props.state?.isCartOpening, body]);

  useEffect(() => {
    if (props.state?.isOpenPopup) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  }, [props.state?.isOpenPopup]);

  const openCart = useCallback(() => {
    if (
      !Array.isArray(props.state?.cart?.items) ||
      !props.state?.cart?.total_quantity ||
      props.state?.cart?.total_quantity == 0
    ) {
      return;
    }
    if (props.actions?.openCart) {
      props.actions.openCart();
    }
  }, [props.actions?.openCart, props.state?.cart?.total_quantity]);

  const closeCart = useCallback(() => {
    if (props.actions?.closeCart) {
      props.actions.closeCart();
    }
  }, [props.actions?.closeCart]);

  const goCheckout = () => {
    props.actions.closeCart();
    props?.actions?.goMgtCheckout();
  };

  useEffect(() => {
    if (props?.state?.cart?.total_quantity === 0) {
      closeCart();
    }
  }, [props?.state?.cart?.total_quantity]);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)',
  });

  useOutsideClickHandle(wrapperRef, () => closeCart());

  return (
    <>
      {props?.state?.isRedirecting && (
        <UiExtension uiId="LOADING_INDICATOR" global={true} />
      )}
      <div className="b-miniCart relative">
        <div className="b-miniCart-wrapper">
          <div
            className={clsx(
              'flex cursor-pointer items-center',
              (isSSR() || isDesktopOrLaptop) && 'ml-8'
            )}
            onClick={() => openCart()}
          >
            <UiExtension uiId="ONLY_DESKTOP">
              <div className="b-miniCart__icon mr-2">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#000000"
                    d="M8 20c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2zM8 17c-0.551 0-1 0.449-1 1s0.449 1 1 1 1-0.449 1-1-0.449-1-1-1z"
                  />
                  <path
                    fill="#000000"
                    d="M15 20c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2zM15 17c-0.551 0-1 0.449-1 1s0.449 1 1 1 1-0.449 1-1-0.449-1-1-1z"
                  />
                  <path
                    fill="#000000"
                    d="M17.539 4.467c-0.251-0.297-0.63-0.467-1.039-0.467h-12.243l-0.099-0.596c-0.131-0.787-0.859-1.404-1.658-1.404h-1c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h1c0.307 0 0.621 0.266 0.671 0.569l1.671 10.027c0.131 0.787 0.859 1.404 1.658 1.404h10c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-10c-0.307 0-0.621-0.266-0.671-0.569l-0.247-1.48 9.965-0.867c0.775-0.067 1.483-0.721 1.611-1.489l0.671-4.027c0.067-0.404-0.038-0.806-0.289-1.102zM16.842 5.404l-0.671 4.027c-0.053 0.316-0.391 0.629-0.711 0.657l-10.043 0.873-0.994-5.962h12.076c0.117 0 0.215 0.040 0.276 0.113s0.085 0.176 0.066 0.291z"
                  />
                </svg>
              </div>
              <div className="text-base">
                <div className="b-miniCart__label text-sm">MyBasket</div>
                <div className="b-miniCart__price font-bold">
                  <UiExtension
                    uiId="CURRENCY"
                    price={props?.state?.cart?.prices?.grand_total?.value || 0}
                  />
                </div>
                <div className="b-miniCart__qty absolute text-xs">
                  {props?.state?.cart?.total_quantity}
                </div>
              </div>
            </UiExtension>
            <UiExtension uiId="ONLY_MOBILE">
              <div className="b-miniCart mr-2">
                <div className="b-miniCart-wrapper__mb relative">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#000000"
                      d="M8 20c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2zM8 17c-0.551 0-1 0.449-1 1s0.449 1 1 1 1-0.449 1-1-0.449-1-1-1z"
                    />
                    <path
                      fill="#000000"
                      d="M15 20c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2zM15 17c-0.551 0-1 0.449-1 1s0.449 1 1 1 1-0.449 1-1-0.449-1-1-1z"
                    />
                    <path
                      fill="#000000"
                      d="M17.539 4.467c-0.251-0.297-0.63-0.467-1.039-0.467h-12.243l-0.099-0.596c-0.131-0.787-0.859-1.404-1.658-1.404h-1c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h1c0.307 0 0.621 0.266 0.671 0.569l1.671 10.027c0.131 0.787 0.859 1.404 1.658 1.404h10c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-10c-0.307 0-0.621-0.266-0.671-0.569l-0.247-1.48 9.965-0.867c0.775-0.067 1.483-0.721 1.611-1.489l0.671-4.027c0.067-0.404-0.038-0.806-0.289-1.102zM16.842 5.404l-0.671 4.027c-0.053 0.316-0.391 0.629-0.711 0.657l-10.043 0.873-0.994-5.962h12.076c0.117 0 0.215 0.040 0.276 0.113s0.085 0.176 0.066 0.291z"
                    />
                  </svg>
                  <div className="b-miniCart__qty">
                    {props?.state?.cart?.total_quantity}
                  </div>
                </div>
              </div>
            </UiExtension>
          </div>
          {typeof props?.state?.cart?.total_quantity !== 'undefined' &&
            props?.state?.cart?.total_quantity > 0 && (
              <div ref={wrapperRef}>
                {/*add class is_active show dropdown cart*/}
                <div
                  className={clsx(
                    'b-miniCart__dropdown fixed right-0 top-0 z-99 m-0 bg-white',
                    props?.state?.isCartOpening && 'is_active'
                  )}
                >
                  {props?.state?.isUpdatingTotals && (
                    <UiExtension uiId="LOADING_INDICATOR" global={false} />
                  )}
                  <div className="b-miniCart-content-wrapper">
                    <div className="b-block-title flex items-center justify-between">
                      <strong>
                        <span className="text">
                          Your <span className="text-main-2362AA">Basket</span>
                        </span>
                      </strong>
                      <div
                        className="miniCart-close cursor-pointer"
                        onClick={() => closeCart()}
                      >
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#000000"
                            d="M10.707 10.5l5.646-5.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-5.646 5.646-5.646-5.646c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l5.646 5.646-5.646 5.646c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l5.646-5.646 5.646 5.646c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146c0.195-0.195 0.195-0.512 0-0.707l-5.646-5.646z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="b-block-content">
                      <div className="b-miniCart-items-wrapper">
                        {/*Cart Empty*/}
                        {props?.state?.cart?.total_quantity === 0 && (
                          <div className="b-miniCart-empty my-5 text-18px  font-bold uppercase md:text-20px">
                            No Items In cart
                          </div>
                        )}
                        <div className="b-miniCart-items">
                          {props?.state?.cart?.items
                            ?.filter((it: any) => it?.id)
                            .map((item: any) => (
                              <UiExtension
                                uiId="CART_HEADER_ITEM"
                                item={item}
                                cartId={props?.state?.cart?.id}
                                key={item?.id}
                                closeCart={() => closeCart()}
                                openCart={() => openCart()}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="b-miniCart-items__bottom bottom-0 w-full bg-white pt-3">
                      <div className="product-item__subtotal">
                        <div className="flex items-center justify-between">
                          <span className="label text-18px font-bold mdm:text-16px">
                            <span>Basket Subtotal</span>
                          </span>
                          <div className="total-amount text-20px mdm:text-18px">
                            <span className="price-wrapper">
                              <span className="price font-bold text-main-2361aa">
                                <UiExtension
                                  uiId="CURRENCY"
                                  price={
                                    props?.state?.cart?.prices?.grand_total
                                      ?.value || 0
                                  }
                                />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__checkout grid grid-cols-2 gap-3">
                        <div
                          className="action viewCart flex h-44 cursor-pointer items-center justify-center rounded-100px bg-main-2361aa text-16px font-bold text-white mdm:text-14px"
                          onClick={() => {
                            RouterSingleton.push(ROUTES.r('CART'));
                            closeCart();
                          }}
                        >
                          <span>View Basket</span>
                          <span className="qty absolute flex items-center justify-center text-13px">
                            {props?.state?.cart?.total_quantity}
                          </span>
                        </div>
                        <div
                          className="action checkout flex h-44 cursor-pointer items-center justify-center rounded-100px text-16px font-bold text-white mdm:text-14px"
                          onClick={() => {
                            goCheckout();
                          }}
                        >
                          <span>Checkout</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          <div
            className={clsx(
              'b-mob-screen invisible fixed top-0 left-0 -z-1 h-100% w-100% bg-black bg-opacity-40 opacity-0 transition duration-500 ease-in-out',
              props?.state?.isCartOpening && 'is_active'
            )}
          >
            &nbsp;
          </div>
        </div>
      </div>
    </>
  );
});

export default CartHeader;
