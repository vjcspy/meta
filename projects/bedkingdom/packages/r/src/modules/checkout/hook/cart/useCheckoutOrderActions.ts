import { useDispatch, useSelector } from '@main/packages-web-redux';
import {
  placeOrder,
  placeOrderAfter,
  placeOrderError,
} from '@modules/checkout/store/cart/actions/order.actions';
import { selectCart } from '@modules/checkout/store/cart/cart.selector';
import type { CheckoutHookCfg } from '@modules/checkout/util/cart/addPlaceOrderHookFn';
import { CheckoutConstant } from '@modules/checkout/util/constant';
import type { Cart, Order } from '@vjcspy/apollo';
import { usePlaceOrderMutation } from '@vjcspy/apollo';
import { Registry } from 'chitility';
import filter from 'lodash/filter';
import { useCallback, useEffect, useRef } from 'react';

const resolveHooks = async (cart: Cart, order?: Order, type = 'after') => {
  let hookFns: CheckoutHookCfg[] = Registry.getInstance().registry(
    CheckoutConstant.CHECKOUT_HOOK_KEY
  );

  hookFns = filter(hookFns, (h) => h.type === type);
  if (Array.isArray(hookFns) && hookFns.length > 0) {
    for (let i = 0; i <= hookFns.length; i++) {
      const resolveNext = await hookFns[i].hookFn(cart, order);

      if (!resolveNext) {
        return;
      }
    }
  }
};

export const useCheckoutOrderActions = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const placeOrderAction = useCallback(() => {
    dispatch(
      placeOrder({
        resolveByEffect: true,
      })
    );
  }, []);

  const cartRef = useRef<any>();

  const [placeOrderMutation, placeOrderMutationRes] = usePlaceOrderMutation();

  const placeOrderWithHookAction = useCallback(async () => {
    try {
      if (cart?.id) {
        cartRef.current = cart;
        dispatch(
          placeOrder({
            resolveByEffect: false,
          })
        );
        await placeOrderMutation({
          variables: {
            cartId: cart.id,
          },
        });
      }
    } catch (e) {
      console.error('could not place order', e);
    }
  }, [cart]);

  useEffect(() => {
    if (placeOrderMutationRes.error) {
      dispatch(
        placeOrderError({
          error: placeOrderMutationRes.error,
        })
      );
    }

    if (placeOrderMutationRes.data?.placeOrder?.order.order_number) {
      dispatch(
        placeOrderAfter({
          order: placeOrderMutationRes.data?.placeOrder?.order,
        })
      );
      setTimeout(
        () =>
          resolveHooks(
            cartRef.current,
            placeOrderMutationRes.data?.placeOrder?.order
          ),
        100
      );
    }
  }, [placeOrderMutationRes.data, placeOrderMutationRes.error]);

  return {
    actions: { placeOrderAction, placeOrderWithHookAction },
  };
};
