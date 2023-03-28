import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CHECKOUT_CART_ADD';

/*
 * Dựa vào product-info để prepare data add to cart
 * */
const PREPARE_PRODUCT_ADD_TO_CART = 'PREPARE_PRODUCT_ADD_TO_CART';
export const prepareProductAddToCartAction = createAction<{
  productId: number;
  qty?: number;
}>(PREPARE_PRODUCT_ADD_TO_CART, PREFIX);

const ADD_PRODUCTS_TO_CART = 'ADD_PRODUCTS_TO_CART';
export const addProductsToCart = createAction<{
  items: { product: any; input: any }[];
}>(ADD_PRODUCTS_TO_CART, PREFIX);

const ADD_PRODUCTS_TO_CART_AFTER = 'ADD_PRODUCTS_TO_CART_AFTER';
export const addProductsToCartAfter = createAction<{
  cartId: string;
}>(ADD_PRODUCTS_TO_CART_AFTER, PREFIX);
