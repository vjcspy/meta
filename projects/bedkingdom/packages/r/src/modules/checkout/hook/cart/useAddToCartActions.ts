import { useDispatch, useSelector } from '@main/packages-web-redux';
import { prepareProductAddToCartAction } from '@modules/checkout/store/cart/actions/add.actions';
import { openCartDetail } from '@modules/checkout/store/cart/cart.actions';
import {
  selectAddingProduct,
  selectCartItems,
} from '@modules/checkout/store/cart/cart.selector';
import { Registry } from 'chitility';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import { useCallback, useEffect, useState } from 'react';

const ADD_TO_CART_CALL_BACK_KEY = 'ADD_TO_CART_CALL_BACK_KEY';

export const useAddToCartActions = () => {
  useEffect(() => {
    return () => {
      Registry.getInstance().unregister(ADD_TO_CART_CALL_BACK_KEY);
    };
  }, []);
  const dispatch = useDispatch();
  const [currentProductId, setCurrentProductId] = useState<any>();
  const addingProduct = useSelector(selectAddingProduct);
  const cartItems = useSelector(selectCartItems);

  const prepareProductAddToCart = useCallback(
    (productId: number, callBack: () => void, qty?: number) => {
      Registry.getInstance().register(ADD_TO_CART_CALL_BACK_KEY, callBack);
      setCurrentProductId(productId);
      dispatch(
        prepareProductAddToCartAction({
          productId,
          qty,
        })
      );
    },
    [currentProductId, setCurrentProductId]
  );

  useEffect(() => {
    let isAdding = false;
    if (addingProduct && currentProductId) {
      forEach(addingProduct, (addingPrs) => {
        if (includes(addingPrs, currentProductId)) {
          isAdding = true;

          return false;
        }
      });
      if (
        !isAdding &&
        Registry.getInstance().registry(ADD_TO_CART_CALL_BACK_KEY)
      ) {
        const isExistingInCart = cartItems?.find(
          (item: any) => item?.product?.id == currentProductId
        );

        if (isExistingInCart) {
          Registry.getInstance().registry(ADD_TO_CART_CALL_BACK_KEY)();
          Registry.getInstance().unregister(ADD_TO_CART_CALL_BACK_KEY);
        }
      }
    }
  }, [addingProduct, currentProductId, cartItems]);

  const openCart = useCallback(() => {
    dispatch(openCartDetail());
  }, []);

  return {
    actions: { prepareProductAddToCart, openCart },
  };
};
