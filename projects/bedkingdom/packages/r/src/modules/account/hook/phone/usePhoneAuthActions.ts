import { useDispatch } from '@main/packages-web-redux';
import { generateCustomerTokenSuccessAction } from '@modules/account/store/account.actions';
import {
  requestOtpAction,
  requestOtpAfterAction,
  requestOtpErrorAction,
  submitOtpAction,
  submitOtpAfterAction,
  submitOtpErrorAction,
} from '@modules/account/store/phone/phone.actions';
import { R_DEFAULT_VALUE } from '@values/R_DEFAULT_VALUE';
import { Registry } from 'chitility';
import { apiFetch } from 'chitility/dist/util/api-fetch';
import { useCallback, useState } from 'react';

export const usePhoneAuthActions = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState<any>();
  const [authResInfo, setAuthResInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [verifyError, setVerifyError] = useState(false);

  const requestOtp = useCallback(
    (_phone: string) => {
      if (isLoading) {
        return;
      }

      setPhone(_phone);
      dispatch(
        requestOtpAction({
          phone: _phone,
        })
      );
      setIsLoading(true);
      setIsRequestSuccess(false);
      setTimeout(() => {
        apiFetch(
          'oauth/phone-authorize',
          {
            pcmsUrl: Registry.getInstance().registry(
              R_DEFAULT_VALUE.PCMS_DEFAULT_URL_KEY
            ),
            phone: _phone,
            client_id: Registry.getInstance().registry(
              R_DEFAULT_VALUE.CLIENT_ID_KEY
            ),
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
          .then((data) => {
            setIsLoading(false);
            setIsRequestSuccess(true);
            setAuthResInfo(data);
            dispatch(requestOtpAfterAction({ data }));
          })
          .catch((error) => {
            setIsLoading(false);
            dispatch(requestOtpErrorAction({ error }));
          });
      }, 1000);
    },
    [isLoading]
  );

  const submitOtp = useCallback((info: any) => {
    setIsLoading(true);

    dispatch(
      submitOtpAction({
        code: info.otp,
        phone: info.phone,
        user_id: info.userId,
      })
    );

    setTimeout(() => {
      apiFetch(
        'oauth/pcms-token',
        {
          pcms_url: Registry.getInstance().registry(
            R_DEFAULT_VALUE.PCMS_DEFAULT_URL_KEY
          ),
          grant_type: 'authorization_code',
          code: info.otp,
          phone: info.phone,
          user_id: info.userId,
          client_id: Registry.getInstance().registry(
            R_DEFAULT_VALUE.CLIENT_ID_KEY
          ),
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
        .then((data: any) => {
          setIsLoading(false);
          setIsRequestSuccess(true);
          setAuthResInfo(data);
          dispatch(submitOtpAfterAction({ data }));
          dispatch(
            generateCustomerTokenSuccessAction({
              token: data.token,
            })
          );
        })
        .catch((error) => {
          setIsLoading(false);
          setVerifyError(true);
          dispatch(submitOtpErrorAction({ error }));
        });
    }, 1000);
  }, []);

  return {
    actions: {
      requestOtp,
      submitOtp,
    },
    state: {
      isLoading,
      isRequestSuccess,
      phone,
      // fake when testing
      authInfo: authResInfo,
      verifyError,
    },
  };
};
