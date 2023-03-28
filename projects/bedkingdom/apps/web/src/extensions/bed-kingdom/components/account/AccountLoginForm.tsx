import ROUTES from '@values/extendable/ROUTES';
import { withAccountDefaultActions } from '@vjcspy/r/build/modules/account/hoc/withAccountDefaultActions';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const AccountLoginForm: React.FC = combineHOC(
  withAccountDefaultActions
  // withAccountLoadingState
)((props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback((data: any) => {
    if (typeof props.actions?.singInDefault === 'function') {
      props.actions.singInDefault(data.email, data.password);
    }
  }, []);

  const go = useCallback((url: string) => {
    RouterSingleton.push(url);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="b-form-group">
          <label htmlFor="email" className="mb-4 block" />
          <div className="b-inputForm">
            <UiExtension
              uiId="MATERIAL_INPUT"
              control={control}
              rules={{
                required: true,
                pattern: new RegExp(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
                ),
              }}
              name="email"
              error={errors.email}
              label={'Email*'}
              helperText="Please enter the correct email"
            />
          </div>
        </div>

        <div className="b-form-group mt-3">
          <label htmlFor="password" className="mb-10" />
          <div className="b-inputForm relative">
            <UiExtension
              uiId="MATERIAL_PASSWORD"
              control={control}
              rules={{
                required: true,
              }}
              name="password"
              error={errors.password}
              label={'Password*'}
              helperText={' This is a required field.'}
            />
          </div>
        </div>

        <div
          className="b-loginForgot mt-4 inline-block cursor-pointer underline"
          onClick={() => go(ROUTES.r('ACCOUNT_FORGET_PASSWORD'))}
        >
          <span>Forgot Password?</span>
        </div>

        <div className="mt-3 mb-5">
          <button
            type="submit"
            disabled={props?.state?.loadingToken}
            className={clsx(
              'btn-primary white mt-4 h-44 w-full rounded bg-color-2362AA text-center text-16px font-bold text-white mdm:h-40px',
              props?.state?.loadingToken && 'btn-loader btn-loader-active'
            )}
          >
            <span className={clsx(props?.state?.loadingToken && 'loader')} />
            Login
          </button>
        </div>
        <p className="text-12px text-color-e02b27">* Required Fields</p>
      </form>
    </>
  );
});

export default AccountLoginForm;
