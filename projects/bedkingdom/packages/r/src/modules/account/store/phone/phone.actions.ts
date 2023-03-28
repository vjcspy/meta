import { generateAction } from '@main/packages-web-redux/dist/util/createAction';

const prefix = 'PHONE';
const requestOtp = generateAction<{ phone: string }>(
  'REQUEST_OTP_ACTIONS',
  prefix
);

export const requestOtpAction = requestOtp.ACTION;
export const requestOtpErrorAction = requestOtp.ERROR;
export const requestOtpAfterAction = requestOtp.AFTER;

const submitOtp = generateAction('SUBMIT_OTP', prefix);
export const submitOtpAction = submitOtp.ACTION;
export const submitOtpAfterAction = submitOtp.AFTER;
export const submitOtpErrorAction = submitOtp.ERROR;
