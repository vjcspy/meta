import { cartReducer } from '@modules/checkout/store/cart/cart.reducer';
import { combineReducers } from '@main/packages-web-redux';

export const checkoutReducer = combineReducers({
  cart: cartReducer,
});
