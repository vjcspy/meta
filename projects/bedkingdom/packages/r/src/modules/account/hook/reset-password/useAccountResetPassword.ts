import {
  requestPasswordResetAction,
  requestPasswordResetAfterAction,
  requestPasswordResetFailAction,
  resetPasswordAction,
  resetPasswordAfterAction,
  resetPasswordFailAction,
} from '@modules/account/store/customer_reset_password/actions';
import {
  useChangeCustomerPasswordMutation,
  useRequestPasswordResetEmailAppMutation,
  useRequestPasswordResetEmailMutation,
  useRequestPasswordResetEmailWebMutation,
  useResetPasswordMutation,
} from '@vjcspy/apollo';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useAccountResetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<any>();
  const [requestPasswordResetMutation, requestPasswordResetRes] =
    useRequestPasswordResetEmailMutation();

  const [requestPasswordResetAppMutation, requestPasswordResetAppRes] =
    useRequestPasswordResetEmailAppMutation();

  const [requestPasswordResetWebMutation, requestPasswordResetWebRes] =
    useRequestPasswordResetEmailWebMutation();

  const [resetPasswordMutation, resetPasswordRes] = useResetPasswordMutation();

  const [changeCustomerPasswordMutation, changeCustomerPasswordRes] =
    useChangeCustomerPasswordMutation();

  const requestPasswordResetWeb = useCallback((email: string) => {
    dispatch(requestPasswordResetAction());
    setEmail(email);
    requestPasswordResetWebMutation({
      variables: {
        email,
      },
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (requestPasswordResetWebRes.data?.requestPasswordResetEmailWeb) {
      dispatch(
        requestPasswordResetAfterAction({
          status:
            !!requestPasswordResetWebRes.data?.requestPasswordResetEmailWeb,
        })
      );
    }
    if (
      requestPasswordResetWebRes.error ||
      requestPasswordResetWebRes.data?.requestPasswordResetEmailWeb === false
    ) {
      dispatch(
        requestPasswordResetFailAction({
          error: requestPasswordResetWebRes.error,
        })
      );
    }
  }, [requestPasswordResetWebRes.data, requestPasswordResetWebRes.error]);

  const requestPasswordResetApp = useCallback((email: string) => {
    dispatch(requestPasswordResetAction());
    setEmail(email);
    requestPasswordResetAppMutation({
      variables: {
        email,
      },
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (requestPasswordResetAppRes.data?.requestPasswordResetEmailApp) {
      dispatch(
        requestPasswordResetAfterAction({
          status:
            !!requestPasswordResetAppRes.data?.requestPasswordResetEmailApp,
        })
      );
    }

    if (
      requestPasswordResetAppRes.error ||
      requestPasswordResetAppRes.data?.requestPasswordResetEmailApp === false
    ) {
      dispatch(
        requestPasswordResetFailAction({
          error: requestPasswordResetAppRes.error,
        })
      );
    }
  }, [requestPasswordResetAppRes.data, requestPasswordResetAppRes.error]);

  const requestPasswordReset = useCallback((email: string) => {
    dispatch(requestPasswordResetAction());
    setEmail(email);
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

  const resetPasswordByOldPass = useCallback(
    (currentPassword: string, newPassword: string) => {
      dispatch(resetPasswordAction());
      changeCustomerPasswordMutation({
        variables: {
          currentPassword,
          newPassword,
        },
      }).catch(() => {});
    },
    []
  );

  useEffect(() => {
    if (changeCustomerPasswordRes.data?.changeCustomerPassword?.email) {
      dispatch(resetPasswordAfterAction());
    }

    if (changeCustomerPasswordRes.error) {
      dispatch(
        resetPasswordFailAction({
          error: changeCustomerPasswordRes.error,
        })
      );
    }
  }, [changeCustomerPasswordRes.data, changeCustomerPasswordRes.error]);

  return {
    actions: {
      requestPasswordReset,
      resetPassword,
      requestPasswordResetApp,
      requestPasswordResetWeb,
      resetPasswordByOldPass,
    },
    state: {
      email,
    },
  };
};
