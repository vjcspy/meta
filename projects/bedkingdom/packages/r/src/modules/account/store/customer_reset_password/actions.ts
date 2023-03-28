import { generateAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'RESET_PASSWORD';

const requestResetPassword = generateAction<any, { status: boolean }>(
  'REQUEST_PASSWORD_RESET',
  PREFIX
);
export const requestPasswordResetAction = requestResetPassword.ACTION;
export const requestPasswordResetAfterAction = requestResetPassword.AFTER;
export const requestPasswordResetFailAction = requestResetPassword.ERROR;

const resetPassword = generateAction<any, { status: boolean }>(
  'RESET_PASSWORD',
  PREFIX
);
export const resetPasswordAction = resetPassword.ACTION;
export const resetPasswordAfterAction = resetPassword.AFTER;
export const resetPasswordFailAction = resetPassword.ERROR;
