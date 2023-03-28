import { AlertService } from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import {
  useCreateAccountMutation,
  useRequestPasswordResetEmailMutation,
  useSignInMutation,
} from '@vjcspy/apollo';
import { useCreateCustomerV2Mutation } from '@vjcspy/apollo-bed-kingdom';
import {
  generateCustomerTokenFail,
  generateCustomerTokenSuccessAction,
} from '@vjcspy/r/build/modules/account/store/account.actions';
import {
  requestPasswordResetAction,
  requestPasswordResetAfterAction,
  requestPasswordResetFailAction,
} from '@vjcspy/r/build/modules/account/store/customer_reset_password/actions';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useBedAccountDefaultActions = () => {
  const dispatch = useDispatch();
  const [loadingToken, setLoadingToken] = useState(false);
  const [customerData, setCustomerData] = useState<any>();
  const [createAccountQuery, createAccountRes] = useCreateCustomerV2Mutation();

  const [signInMutation, signInRes] = useSignInMutation();

  const [requestPasswordResetMutation, requestPasswordResetRes] =
    useRequestPasswordResetEmailMutation();

  const createCustomerAccount = useCallback((customerData: any) => {
    setCustomerData(customerData);
    createAccountQuery({
      variables: {
        ...customerData,
      },
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (createAccountRes.error) {
      if (createAccountRes.error.message) {
        AlertService.error(createAccountRes.error.message);
      }

      setCustomerData({});
    }

    if (createAccountRes.data) {
      if (createAccountRes.data?.createCustomerV2?.customer) {
        if (customerData?.email && customerData?.password) {
          singInDefault(customerData?.email, customerData?.password);
        }
        setCustomerData({});
      }
    }
  }, [createAccountRes.data, createAccountRes.error]);

  const singInDefault = useCallback((email: string, password: string) => {
    if (email && password) {
      // dispatch(generateCustomerTokenDefaultAction());
      setLoadingToken(true);
      signInMutation({
        variables: {
          email,
          password,
        },
      }).catch(() => {});
    }
  }, []);

  const requestPasswordReset = useCallback((email: string) => {
    dispatch(requestPasswordResetAction());
    requestPasswordResetMutation({
      variables: {
        email,
      },
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (signInRes.data?.generateCustomerToken?.token) {
      dispatch(
        generateCustomerTokenSuccessAction({
          token: signInRes.data?.generateCustomerToken?.token,
        })
      );
      setLoadingToken(false);
    }
    if (signInRes.error) {
      dispatch(
        generateCustomerTokenFail({
          error: signInRes.error,
        })
      );
      setLoadingToken(false);
    }
  }, [signInRes.data, signInRes.error]);

  useEffect(() => {
    if (requestPasswordResetRes.data?.requestPasswordResetEmail) {
      dispatch(
        requestPasswordResetAfterAction({
          status: !!requestPasswordResetRes.data?.requestPasswordResetEmail,
        })
      );
    }
    if (
      requestPasswordResetRes.error ||
      requestPasswordResetRes.data?.requestPasswordResetEmail === false
    ) {
      dispatch(
        requestPasswordResetFailAction({
          error: requestPasswordResetRes.error,
        })
      );
    }
  }, [requestPasswordResetRes.data, requestPasswordResetRes.error]);

  return {
    state: {
      loadingToken,
      isCreating: createAccountRes.loading,
    },
    actions: {
      singInDefault,
      requestPasswordReset,
      createCustomerAccount,
    },
  };
};
