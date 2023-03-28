import ROUTES from '@values/extendable/ROUTES';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo } from 'react';

const OrderComplete = combineHOC()((props) => {
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
    <section className="b-page-order-success min-h-580 pt-4 pb-4 mb-5">
      {typeof orderId !== 'string' && (
        <UiExtension uiId="LOADING_INDICATOR" global={false} />
      )}
      {typeof orderId === 'string' && (
        <div className="container mx-auto px-4">
          <h1 className="text-22px md:text-36px mb-8">
            Thank you for your purchase!
          </h1>

          <div className="checkout-success">
            <p className="flex items-center mb-3">
              Your order number is:{' '}
              <span
                className="order-number text-color-2362AA cursor-pointer text-18px pl-2"
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
              className="actions-toolbar inline-block mt-6 "
              onClick={() => RouterSingleton.push('/')}
            >
              <div className="btn continue btn-default h-40px text-14px max-w-165 pl-5 pr-5">
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
