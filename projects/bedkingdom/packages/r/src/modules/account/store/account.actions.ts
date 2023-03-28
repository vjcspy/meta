import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'account';

const CHECK_CUSTOMER_IS_LOGGED = 'CHECK_CUSTOMER_IS_LOGGED';
export const checkCustomerIsLogged = createAction(
  CHECK_CUSTOMER_IS_LOGGED,
  PREFIX
);

const GENERATE_CUSTOMER_TOKEN = 'GENERATE_CUSTOMER_TOKEN';
export const generateCustomerTokenAction = createAction<{
  email: string;
  password: string;
  isUsername?: boolean;
}>(GENERATE_CUSTOMER_TOKEN, PREFIX);

const GENERATE_CUSTOMER_TOKEN_SUCCESS = 'GENERATE_CUSTOMER_TOKEN_SUCCESS';
export const generateCustomerTokenSuccessAction = createAction<{
  token: string;
}>(GENERATE_CUSTOMER_TOKEN_SUCCESS, PREFIX);

const GENERATE_CUSTOMER_TOKEN_FAIL = 'GENERATE_CUSTOMER_TOKEN_FAIL';
export const generateCustomerTokenFail = createAction<{
  error: Error;
}>(GENERATE_CUSTOMER_TOKEN_FAIL, PREFIX);

const PERSISTENT_CUSTOMER_TOKEN_SUCCESS = 'PERSISTENT_CUSTOMER_TOKEN_SUCCESS';
export const persistentCustomerTokenSuccess = createAction<{
  token: string;
}>(PERSISTENT_CUSTOMER_TOKEN_SUCCESS, PREFIX);

const GOT_CUSTOMER_TOKEN_IN_STORAGE = 'GOT_CUSTOMER_TOKEN_IN_STORAGE';
export const gotCustomerTokenInStorage = createAction<{
  token: string;
}>(GOT_CUSTOMER_TOKEN_IN_STORAGE, PREFIX);

const EMPTY_CUSTOMER_TOKEN_IN_STORAGE = 'EMPTY_CUSTOMER_TOKEN_IN_STORAGE';
export const emptyCustomerTokenInStorage = createAction(
  EMPTY_CUSTOMER_TOKEN_IN_STORAGE,
  PREFIX
);

const REGISTER_CUSTOMER_BY_EMAIL_PASSWORD =
  'REGISTER_CUSTOMER_BY_EMAIL_PASSWORD';
export const registerCustomerByEmailPassword = createAction<{
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  date_of_birth?: string;
  gender?: number;
  is_subscribed?: boolean;
  taxvat?: string;
  telephone?: string;
}>(REGISTER_CUSTOMER_BY_EMAIL_PASSWORD, PREFIX);

const REGISTER_CUSTOMER_BY_EMAIL_PASSWORD_SUCCESS =
  'REGISTER_CUSTOMER_BY_EMAIL_PASSWORD_SUCCESS';
export const registerCustomerByEmailPasswordSuccess = createAction<{
  customer: any;
}>(REGISTER_CUSTOMER_BY_EMAIL_PASSWORD_SUCCESS, PREFIX);

const REGISTER_CUSTOMER_BY_EMAIL_PASSWORD_FAIL =
  'REGISTER_CUSTOMER_BY_EMAIL_PASSWORD_FAIL';
export const registerCustomerByEmailPasswordFail = createAction<{
  error: Error;
}>(REGISTER_CUSTOMER_BY_EMAIL_PASSWORD_FAIL, PREFIX);

const GET_CUSTOMER_DETAIL = 'GET_CUSTOMER_DETAIL';
export const getCustomerDetail = createAction(GET_CUSTOMER_DETAIL, PREFIX);

const GOT_CUSTOMER_DETAIL = 'GOT_CUSTOMER_DETAIL';
export const gotCustomerDetail = createAction<{
  customer: any;
}>(GOT_CUSTOMER_DETAIL, PREFIX);

const GET_CUSTOMER_DETAIL_FAIL_DUE_TO_TOKEN =
  'GET_CUSTOMER_DETAIL_FAIL_DUE_TO_TOKEN';
export const getCustomerDetailFailDueToToken = createAction(
  GET_CUSTOMER_DETAIL_FAIL_DUE_TO_TOKEN,
  PREFIX
);

const CLEAR_CUSTOMER_TOKEN = 'CLEAR_CUSTOMER_TOKEN';
export const clearCustomerToken = createAction(CLEAR_CUSTOMER_TOKEN, PREFIX);

const CLEAR_CUSTOMER_TOKEN_AFTER = 'CLEAR_CUSTOMER_TOKEN_AFTER';
export const clearCustomerTokenAfter = createAction(
  CLEAR_CUSTOMER_TOKEN_AFTER,
  PREFIX
);

const CLEAR_DATA_CUSTOMER_LOGOUT = 'CLEAR_DATA_CUSTOMER_LOGOUT';
export const clearDataCustomerAfterLogout = createAction(
  CLEAR_DATA_CUSTOMER_LOGOUT,
  PREFIX
);

const SOCIAL_LOGIN = 'SOCIAL_LOGIN';
export const socialLoginAction = createAction<{
  provider: string;
  token: string;
}>(SOCIAL_LOGIN, PREFIX);

const GET_CUSTOMER_REVIEW = 'GET_CUSTOMER_REVIEW';
export const getCustomerReviewAction = createAction(
  GET_CUSTOMER_REVIEW,
  PREFIX
);

const GET_CUSTOMER_REVIEW_AFTER = 'GET_CUSTOMER_REVIEW_AFTER';
export const getCustomerReviewAfterAction = createAction<{
  reviews: any[];
}>(GET_CUSTOMER_REVIEW_AFTER, PREFIX);

const GET_CUSTOMER_REVIEW_ERROR = 'GET_CUSTOMER_REVIEW_ERROR';
export const getCustomerReviewErrorAction = createAction<{
  error: Error;
}>(GET_CUSTOMER_REVIEW_ERROR, PREFIX);

const GET_REWARD_POINT = 'GET_REWARD_POINT';
export const getRewardPointAction = createAction(GET_REWARD_POINT, PREFIX);

const GET_REWARD_POINT_AFTER = 'GET_REWARD_POINT_AFTER';
export const getRewardPointAfterAction = createAction<{
  reward_points: any[];
}>(GET_REWARD_POINT_AFTER, PREFIX);

const GET_REWARD_POINT_ERROR = 'GET_REWARD_POINT_ERROR';
export const getRewardPointErrorAction = createAction<{
  error: Error;
}>(GET_REWARD_POINT_ERROR, PREFIX);

const GET_STORE_CREDIT = 'GET_STORE_CREDIT';
export const getStoreCreditAction = createAction(GET_STORE_CREDIT, PREFIX);

const GET_STORE_CREDIT_AFTER = 'GET_STORE_CREDIT_AFTER';
export const getStoreCreditAfterAction = createAction<{
  store_credit: any;
}>(GET_STORE_CREDIT_AFTER, PREFIX);

const GET_STORE_CREDIT_ERROR = 'GET_STORE_CREDIT_ERROR';
export const getStoreCreditErrorAction = createAction<{
  error: Error;
}>(GET_STORE_CREDIT_ERROR, PREFIX);

export const refreshCustomerSessionError = createAction<{
  error: any;
}>('REFRESH_CUSTOMER_ERROR');
