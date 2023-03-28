import { selectProduct } from '@modules/catalog/store/product/product.selectors';
import {
  selectCart,
  selectIsAddingProductId,
} from '@modules/checkout/store/cart/cart.selector';
import { useMemo } from 'react';
import { useSelector } from '@main/packages-web-redux';

export const useAddToCartData = () => {
  const isAddingProductId = useSelector(selectIsAddingProductId);
  const cart = useSelector(selectCart);
  const product = useSelector(selectProduct);

  const productCartItem = useMemo(() => {
    return cart?.items?.find((item: any) => item?.product?.id === product?.id);
  }, [cart?.items, product?.id]);

  return {
    actions: { isAddingProductId },
    state: {
      productCartItem,
    },
  };
};
