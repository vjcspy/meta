import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import type { AccountState } from '@modules/account/store/account.state';
import {
  requestPasswordResetAction,
  requestPasswordResetAfterAction,
  requestPasswordResetFailAction,
  resetPasswordAction,
  resetPasswordAfterAction,
  resetPasswordFailAction,
} from '@modules/account/store/customer_reset_password/actions';

export const resetPassword = createBuilderCallback<AccountState>((builder) => {
  builder
    .addCase(requestPasswordResetAction, (state) => {
      state.loadingState.requestResetPassword = true;
    })
    .addCase(requestPasswordResetAfterAction, (state, action) => {
      state.statusRequestResetPassword = action.payload.status;
      state.loadingState.requestResetPassword = false;
    })
    .addCase(requestPasswordResetFailAction, (state) => {
      state.statusRequestResetPassword = false;
      state.loadingState.requestResetPassword = false;
    })
    .addCase(resetPasswordAction, (state) => {
      state.loadingState.resetPassword = true;
    })
    .addCase(resetPasswordAfterAction, (state) => {
      state.statusRequestResetPassword = false;
      state.statusResetPassword = true;
      state.loadingState.resetPassword = false;
    })
    .addCase(resetPasswordFailAction, (state) => {
      state.statusResetPassword = false;
      state.loadingState.resetPassword = false;
    });
});
