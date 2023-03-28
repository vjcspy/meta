import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CHECKOUT_CART_ADD_CONFIGURABLE';

/**
 * Add 1 lúc nhiều simple vào cart.
 * Lý do chọn phương án này thay vì add từng sản phẩm:
 * 1. Hạn chế request
 * 2. Kể cả trường hợp add one/many nếu có lỗi đều không add các sản phẩm đi
 * kèm vào cart
 * @type {string}
 */
const ADD_PRODUCTS_TO_CART_TYPE_CONFIGURABLE =
  'ADD_PRODUCTS_TO_CART_TYPE_CONFIGURABLE';
export const addProductsToCartTypeConfigurable = createAction<{
  items: any[];
}>(ADD_PRODUCTS_TO_CART_TYPE_CONFIGURABLE, PREFIX);

const ADD_PRODUCTS_TO_CART_TYPE_CONFIGURABLE_AFTER =
  'ADD_PRODUCTS_TO_CART_TYPE_CONFIGURABLE_AFTER';
export const addProductsToCartTypeConfigurableAfter = createAction<{
  cartId: string;
  items: any[];
}>(ADD_PRODUCTS_TO_CART_TYPE_CONFIGURABLE_AFTER, PREFIX);

const ADD_PRODUCTS_TO_CART_TYPE_CONFIGURABLE_ERROR =
  'ADD_PRODUCTS_TO_CART_TYPE_CONFIGURABLE_ERROR';
export const addProductsToCartTypeConfigurableError = createAction<{
  error: Error;
  items: any[];
}>(ADD_PRODUCTS_TO_CART_TYPE_CONFIGURABLE_ERROR, PREFIX);
