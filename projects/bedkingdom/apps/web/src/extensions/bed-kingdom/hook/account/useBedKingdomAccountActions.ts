/* eslint-disable unused-imports/no-unused-vars,@typescript-eslint/no-empty-function */
import { AlertService } from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import { bedShowResetPassword } from '@extensions/bed-kingdom/store/content/content.content.actions';
import { selectStatusResetPassWord } from '@extensions/bed-kingdom/store/content/content.content.selector';
import { useDispatch, useSelector } from '@main/packages-web-redux';
import {
  useChangeCustomerPasswordMutation,
  useRequestPasswordResetEmailMutation,
  useResetPasswordMutation,
} from '@vjcspy/apollo';
import {
  useGdprAnonymisePerformMutation,
  useUpdateBedKingdomCustomerMutation,
  useUpdateBedKingdomCustomerV2Mutation,
} from '@vjcspy/apollo-bed-kingdom';
import {
  checkCustomerIsLogged,
  clearCustomerToken,
  gotCustomerDetail,
  registerCustomerByEmailPassword,
} from '@vjcspy/r/build/modules/account/store/account.actions';
import { selectLoadingState } from '@vjcspy/r/build/modules/account/store/account.selector';
import {
  requestPasswordResetAction,
  requestPasswordResetAfterAction,
  requestPasswordResetFailAction,
  resetPasswordAction,
  resetPasswordAfterAction,
  resetPasswordFailAction,
} from '@vjcspy/r/build/modules/account/store/customer_reset_password/actions';
import {
  updateCustomerAction,
  updateCustomerAfterAction,
  updateCustomerFailAction,
} from '@vjcspy/r/build/modules/account/store/customer_update/actions';
import { useCallback, useEffect } from 'react';

export const useBedKingdomAccountActions = () => {
  const dispatch = useDispatch();
  const selectedStatusReset = useSelector(selectStatusResetPassWord);
  const isLoadingState = useSelector(selectLoadingState);

  const [requestPasswordResetMutation, requestPasswordResetRes] =
    useRequestPasswordResetEmailMutation();

  const [changeCustomerPasswordMutation, changeCustomerPasswordRes] =
    useChangeCustomerPasswordMutation();

  const [resetPasswordMutation, resetPasswordRes] = useResetPasswordMutation();
  const [updateCustomerMutation, updateCustomerRes] =
    useUpdateBedKingdomCustomerV2Mutation();

  const [updateCustomerMutations, updateCustomerRess] =
    useUpdateBedKingdomCustomerMutation();

  const [gdprAnonymisePerformMutation, gdprAnonymisePerformRes] =
    useGdprAnonymisePerformMutation();

  const setStatusResetPassword = useCallback((status: any) => {
    dispatch(bedShowResetPassword({ status }));
  }, []);

  const gdprAnonymisePerformActions = useCallback(() => {
    gdprAnonymisePerformMutation({}).then(() => {
      logout();
      AlertService.success('Anonymise success.');
    });
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

  const updateCustomerNewsletter = useCallback((input: any) => {
    dispatch(updateCustomerAction());
    updateCustomerMutations({
      variables: {
        input,
      },
    })
      .then(() => {
        if (input?.is_subscribed === true) {
          AlertService.success('We have saved your subscription.');
        } else {
          AlertService.success('We have removed your newsletter subscription.');
        }
        dispatch(updateCustomerAfterAction());
      })
      .catch(() => {
        dispatch(
          updateCustomerFailAction({
            error: updateCustomerRes.error,
          })
        );
        AlertService.success('An error occurred, please try again.');
      });
  }, []);

  useEffect(() => {
    if (updateCustomerRes.data?.updateCustomerV2) {
      dispatch(updateCustomerAfterAction());
      dispatch(
        gotCustomerDetail({
          customer: updateCustomerRes.data?.updateCustomerV2?.customer,
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

  const changeCustomerPassword = useCallback(
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
      registerCustomerAccount,
      dispatchCheckCustomerIsLogged,

      logout,
      requestPasswordReset,
      resetPassword,
      updateCustomer,
      changeCustomerPassword,
      updateCustomerNewsletter,
      setStatusResetPassword,
      gdprAnonymisePerformActions,
    },
    state: {
      selectedStatusReset,
      isLoadingState,
    },
  };
};
