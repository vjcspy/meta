import {
  checkCustomerIsLogged,
  clearCustomerToken,
  generateCustomerTokenAction,
  generateCustomerTokenFail,
  generateCustomerTokenSuccessAction,
  gotCustomerDetail,
  registerCustomerByEmailPassword,
  socialLoginAction,
} from '@modules/account/store/account.actions';
import {
  updateCustomerAction,
  updateCustomerAfterAction,
  updateCustomerFailAction,
} from '@modules/account/store/customer_update/actions';
import {
  useGenerateCustomerTokenByUsernameMutation,
  useRequestPasswordResetEmailMutation,
  useResetPasswordMutation,
  useUpdateCustomerMutation,
} from '@vjcspy/apollo';
import { useCallback, useEffect } from 'react';
import { useDispatch } from '@main/packages-web-redux';

import {
  requestPasswordResetAction,
  requestPasswordResetAfterAction,
  requestPasswordResetFailAction,
  resetPasswordAction,
  resetPasswordAfterAction,
  resetPasswordFailAction,
} from '../store/customer_reset_password/actions';

export const useAccountActions = () => {
  const dispatch = useDispatch();
  const [generateTokenByUserNameMutation, tokenRes] =
    useGenerateCustomerTokenByUsernameMutation();

  const [requestPasswordResetMutation, requestPasswordResetRes] =
    useRequestPasswordResetEmailMutation();

  const [resetPasswordMutation, resetPasswordRes] = useResetPasswordMutation();
  const [updateCustomerMutation, updateCustomerRes] =
    useUpdateCustomerMutation();

  const generateCustomerToken = useCallback(
    (email: string, password: string) => {
      if (email.includes('@')) {
        dispatch(
          generateCustomerTokenAction({
            email,
            password,
          })
        );
      } else {
        dispatch(
          generateCustomerTokenAction({
            email,
            password,
            isUsername: true,
          })
        );
        generateTokenByUserNameMutation({
          variables: {
            username: email,
            password,
          },
        }).catch(() => {});
      }
    },
    []
  );

  useEffect(() => {
    if (tokenRes.data?.generateCustomerTokenByUsername?.token) {
      dispatch(
        generateCustomerTokenSuccessAction({
          token: tokenRes.data?.generateCustomerTokenByUsername?.token,
        })
      );
    }

    if (tokenRes.error) {
      dispatch(
        generateCustomerTokenFail({
          error: tokenRes.error,
        })
      );
    }
  }, [tokenRes.data, tokenRes.error]);

  const onLoginSocial = useCallback((provider: string, token: string) => {
    dispatch(
      socialLoginAction({
        provider,
        token,
      })
    );
  }, []);

  const registerCustomerAccount = useCallback((customerData: any) => {
    dispatch(registerCustomerByEmailPassword({ ...customerData }));
  }, []);

  const dispatchCheckCustomerIsLogged = useCallback(() => {
    dispatch(checkCustomerIsLogged({}));
  }, []);

  const logout = useCallback(() => {
    dispatch(clearCustomerToken());
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
    if (requestPasswordResetRes.data?.requestPasswordResetEmail) {
      dispatch(
        requestPasswordResetAfterAction({
          status: !!requestPasswordResetRes.data?.requestPasswordResetEmail,
        })
      );
    } else {
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

  const resetPassword = useCallback(
    (mail: string, resetPasswordToken: string, newPassword: string) => {
      dispatch(resetPasswordAction());
      resetPasswordMutation({
        variables: {
          mail,
          resetPasswordToken,
          newPassword,
        },
      }).catch(() => {});
    },
    []
  );

  useEffect(() => {
    if (resetPasswordRes.data?.resetPassword) {
      dispatch(resetPasswordAfterAction());
    }

    if (
      resetPasswordRes.error ||
      resetPasswordRes.data?.resetPassword === false
    ) {
      dispatch(
        resetPasswordFailAction({
          error: resetPasswordRes.error,
        })
      );
    }
  }, [resetPasswordRes.data, resetPasswordRes.error]);

  const updateCustomer = useCallback((input: any) => {
    dispatch(updateCustomerAction());
    updateCustomerMutation({
      variables: {
        input,
      },
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (updateCustomerRes.data?.updateCustomer) {
      dispatch(updateCustomerAfterAction());
      dispatch(
        gotCustomerDetail({
          customer: updateCustomerRes.data?.updateCustomer?.customer,
        })
      );
    }

    if (updateCustomerRes.error) {
      dispatch(
        updateCustomerFailAction({
          error: updateCustomerRes.error,
        })
      );
    }
  }, [updateCustomerRes.data, updateCustomerRes.error]);
  return {
    actions: {
      generateCustomerToken,
      registerCustomerAccount,
      dispatchCheckCustomerIsLogged,
      onLoginSocial,
      logout,
      requestPasswordReset,
      resetPassword,
      updateCustomer,
    },
  };
};
