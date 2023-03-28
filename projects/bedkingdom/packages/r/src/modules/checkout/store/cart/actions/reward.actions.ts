import { generateAction } from '@main/packages-web-redux/dist/util/createAction';

const setReward = generateAction<{}, { cart: any }>(
  'SET_REWARD_POINT_TO_CART',
  'CHECKOUT_PAYMENT'
);

export const setRewardPointToCartAction = setReward.ACTION;
export const setRewardPointToCartAfterAction = setReward.AFTER;
export const setRewardPointToCartErrorAction = setReward.ERROR;

const removeReward = generateAction<{}, { cart: any }>(
  'REMOVE_REWARD_PONINT_FROM_CART',
  'CHECKOUT_PAYMENT'
);

export const removeRewardPointFromCartAction = removeReward.ACTION;
export const removeRewardPointFromCartAfterAction = removeReward.AFTER;
export const removeRewardPointFromCartErrorAction = removeReward.ERROR;

const setRewardWithPoint = generateAction<{}, { cart: any }>(
  'SET_REWARD_POINT_TO_CART_WITH_POINT',
  'CHECKOUT_PAYMENT'
);

export const setRewardPointsToCartWithPointAction = setRewardWithPoint.ACTION;
export const setRewardPointsToCartWithPointAfterAction =
  setRewardWithPoint.AFTER;
export const setRewardPointsToCartWithPointErrorAction =
  setRewardWithPoint.ERROR;
