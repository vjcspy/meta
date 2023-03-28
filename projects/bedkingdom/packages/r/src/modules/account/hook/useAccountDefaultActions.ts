import {
  generateCustomerTokenAction,
  generateCustomerTokenFail,
  generateCustomerTokenSuccessAction,
} from '@modules/account/store/account.actions';
import {
  requestPasswordResetAction,
  requestPasswordResetAfterAction,
  requestPasswordResetFailAction,
} from '@modules/account/store/customer_reset_password/actions';
import {
  useCreateAccountMutation,
  useRequestPasswordResetEmailMutation,
  useSignInMutation,
} from '@vjcspy/apollo';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useAccountDefaultActions = () => {
  const dispatch = useDispatch();
  const [loadingToken, setLoadingToken] = useState(false);
  const [customerData, setCustomerData] = useState<any>();
  const [createAccountQuery, createAccountRes] = useCreateAccountMutation();

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
      console.error('Could not create customer account');
      setCustomerData({});
    }

    if (createAccountRes.data) {
      if (createAccountRes.data?.createCustomer?.customer) {
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
