import { createReducer } from '@main/packages-web-redux';
import {
  clearCustomerToken,
  clearDataCustomerAfterLogout,
  emptyCustomerTokenInStorage,
  generateCustomerTokenAction,
  generateCustomerTokenFail,
  generateCustomerTokenSuccessAction,
  getCustomerReviewAfterAction,
  getRewardPointAfterAction,
  getStoreCreditAfterAction,
  gotCustomerDetail,
  gotCustomerTokenInStorage,
  registerCustomerByEmailPassword,
  registerCustomerByEmailPasswordFail,
  registerCustomerByEmailPasswordSuccess,
  socialLoginAction,
} from '@modules/account/store/account.actions';
import { accountStateFactory } from '@modules/account/store/account.state';
import { resetPassword } from '@modules/account/store/customer_reset_password/reducer';
import { updateCustomer } from '@modules/account/store/customer_update/reducer';
import { customerAddressBuilderCallBack } from '@modules/account/store/customer-address/reducer';
import { customerInfoReducer } from '@modules/account/store/customer-info/customer-info.reducer';
import { customerOrderBuilderCallBack } from '@modules/account/store/customer-order/reducer';
import { myWishlistBuilderCallback } from '@modules/account/store/wishlisht/wishlist.reducer';

export const accountReducer = createReducer(
  accountStateFactory(),
  (builder) => {
    builder
      .addCase(generateCustomerTokenAction, (state) => {
        state.loadingState.generateToken = true;
      })
      .addCase(socialLoginAction, (state) => {
        state.loadingState.generateToken = true;
      })
      .addCase(generateCustomerTokenSuccessAction, (state) => {
        state.loadingState.generateToken = false;
      })
      .addCase(generateCustomerTokenFail, (state) => {
        state.loadingState.generateToken = false;
      })
      .addCase(gotCustomerTokenInStorage, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(emptyCustomerTokenInStorage, (state) => {
        state.token = undefined;
        state.customer = undefined;
        state.isResolvedCustomerState = true;
      })
      .addCase(gotCustomerDetail, (state, action) => {
        state.customer = action.payload?.customer;
        state.isResolvedCustomerState = true;
      })
      .addCase(clearCustomerToken, (state) => {
        state.token = undefined;
        state.customer = undefined;
        state.isResolvedCustomerState = true;
      })
      .addCase(getRewardPointAfterAction, (state, action) => {
        state.reward_points = action.payload.reward_points;
      })
      .addCase(getStoreCreditAfterAction, (state, action) => {
        state.store_credit = action.payload.store_credit;
      })
      .addCase(getCustomerReviewAfterAction, (state, action) => {
        state.reviews = action.payload.reviews;
      })
      .addCase(clearDataCustomerAfterLogout, (state) => {
        state.wishlist = [];
        state.orders = [];
      });

    builder
      .addCase(registerCustomerByEmailPassword, (state) => {
        state.loadingState.createAccount = true;
      })
      .addCase(registerCustomerByEmailPasswordSuccess, (state, action) => {})
      .addCase(registerCustomerByEmailPasswordFail, (state) => {
        state.loadingState.createAccount = false;
      });

    customerAddressBuilderCallBack(builder);
    customerOrderBuilderCallBack(builder);
    myWishlistBuilderCallback(builder);
    customerInfoReducer(builder);
    resetPassword(builder);
    updateCustomer(builder);
  }
);
