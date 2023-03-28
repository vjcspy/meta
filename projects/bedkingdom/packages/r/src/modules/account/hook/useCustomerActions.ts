import {
  getCustomerReviewAction,
  getRewardPointAction,
  getStoreCreditAction,
} from '@modules/account/store/account.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useCustomerActions = () => {
  const dispatch = useDispatch();

  const getRewardPoint = useCallback(() => {
    dispatch(getRewardPointAction());
  }, []);

  const getCustomerReviews = useCallback(() => {
    dispatch(getCustomerReviewAction());
  }, []);

  const getStoreCredit = useCallback(() => {
    dispatch(getStoreCreditAction());
  }, []);

  return {
    actions: {
      getRewardPoint,
      getCustomerReviews,
      getStoreCredit,
    },
  };
};
