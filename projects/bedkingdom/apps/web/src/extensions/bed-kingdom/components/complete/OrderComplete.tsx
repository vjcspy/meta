import ROUTES from '@values/extendable/ROUTES';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';

const OrderComplete = combineHOC()(() => {
  const router = useRouter();

  const orderId = useMemo(() => {
    return router.query?.order_number;
  }, [router.query]);

  const goToOrderDetail = useCallback(() => {
    RouterSingleton.push(
      '/' + ROUTES.r('ORDER_DETAIL') + '?order_number=' + orderId
    );
  }, [orderId]);

  return (
    <section className="b-page-order-success mb-5 min-h-580 py-4">
      {typeof orderId !== 'string' && (
        <UiExtension uiId="LOADING_INDICATOR" global={false} />
      )}
      {typeof orderId === 'string' && (
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-22px md:text-36px">
            Thank you for your purchase!
          </h1>

          <div className="checkout-success">
            <p className="mb-3 flex items-center">
              Your order number is:{' '}
              <span
                className="order-number cursor-pointer pl-2 text-18px text-color-2362AA"
                onClick={goToOrderDetail}
              >
                <strong>{orderId}</strong>
              </span>
              .
            </p>
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              We'll email you an order confirmation with details and tracking
              info.
            </p>

            <div
              className="actions-toolbar mt-6 inline-block "
              onClick={() => RouterSingleton.push('/')}
            >
              <div className="btn continue btn-default max-w-165 h-40px px-5 text-14px">
                <span>Continue Shopping</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default OrderComplete;
