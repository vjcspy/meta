import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CHECKOUT_CART_ADD_SIMPLE';

/**
 * Add 1 lúc nhiều simple vào cart.
 * Lý do chọn phương án này thay vì add từng sản phẩm:
 * 1. Hạn chế request
 * 2. Kể cả trường hợp add one/many nếu có lỗi đều không add các sản phẩm đi
 * kèm vào cart
 * @type {string}
 */
const ADD_PRODUCTS_TO_CART_TYPE_SIMPLE = 'ADD_PRODUCTS_TO_CART_TYPE_SIMPLE';
export const addProductsToCartTypeSimple = createAction<{
  items: any[];
}>(ADD_PRODUCTS_TO_CART_TYPE_SIMPLE, PREFIX);

const ADD_PRODUCTS_TO_CART_TYPE_SIMPLE_AFTER =
  'ADD_PRODUCTS_TO_CART_TYPE_SIMPLE_AFTER';
export const addProductsToCartTypeSimpleAfter = createAction<{
  cartId: string;
  items: any[];
}>(ADD_PRODUCTS_TO_CART_TYPE_SIMPLE_AFTER, PREFIX);

const ADD_PRODUCTS_TO_CART_TYPE_SIMPLE_ERROR =
  'ADD_PRODUCTS_TO_CART_TYPE_SIMPLE_ERROR';
export const addProductsToCartTypeSimpleError = createAction<{
  error: Error;
  items: any[];
}>(ADD_PRODUCTS_TO_CART_TYPE_SIMPLE_ERROR, PREFIX);
