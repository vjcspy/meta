import { withBedAccountDefaultActions } from '@extensions/bed-kingdom/hoc/account/withBedAccountDefaultActions';
import ROUTES from '@values/extendable/ROUTES';
import { withAccountState } from '@vjcspy/r/build/modules/account/hoc/withAccountState';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const AccountRegisterForm = combineHOC(
  withBedAccountDefaultActions,
  withAccountState
)((props) => {
  const {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = useCallback((data: any) => {
    const input: any = {};
    input['firstname'] = data['first_name'];
    // input['middleName'] = data['middle_name'];
    input['lastname'] = data['last_name'];
    input['password'] = data['password'];
    input['email'] = data['email'];
    input['is_subscribed'] = data['is_subscribed'] ?? false;
    input['allow_remote_shopping_assistance'] =
      data['assistance_allowed_checkbox'] ?? false;

    if (props.actions?.createCustomerAccount) {
      props.actions.createCustomerAccount(input);
    }
  }, []);

  useEffect(() => {
    if (
      props.state?.accountState?.isResolvedCustomerState === true &&
      typeof props.state?.accountState?.token === 'string'
    ) {
      RouterSingleton.go(ROUTES.r('MY_ACCOUNT'));
    }
  }, [
    props.state?.accountState?.isResolvedCustomerState,
    props.state?.accountState?.token,
  ]);

  // useEffect(() => {
  //   setValue('middle_name', 'middle_name');
  //   setValue('first_name', 'check');
  //   setValue('last_name', 'check');
  //   setValue('password', 'Admin@123');
  //   setValue('password_confirm', 'Admin@123');
  //   setValue('email', 'checkq1@yopmail.com');
  // }, []);

  return (
    <section className="b-customer-page mx-auto">
      <h4 className="b-page-title text-26px text-center mdm:mb-6 mb-14 mt-10 mdm:mt-5 font-bold">
        Create New Customer Account
      </h4>
      <div className="max-w-440 mx-auto px-4">
        <div className="block-customer-login mb-5 lg:mb-10">
          <div className="form-login">
            <h2 className="b-customer__title text-22px mdm:text-18px text-black font-bold mb-6">
              Register
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="b-form-group">
                <div className="b-inputForm">
                  <UiExtension
                    uiId="MATERIAL_INPUT"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    name="first_name"
                    error={errors.first_name}
                    label={'First Name *'}
                    helperText="This is a required field."
                  />
                </div>
              </div>
              <div className="b-form-group mt-3">
                <div className="b-inputForm relative">
                  <UiExtension
                    uiId="MATERIAL_INPUT"
                    control={control}
                    // rules={{
                    //   required: true,
                    // }}
                    name="middle_name"
                    error={errors.middle_name}
                    label="Middle Name/Initial"
                    helperText="This is a required field."
                  />
                </div>
              </div>
              <div className="b-form-group mt-3">
                <div className="b-inputForm relative">
                  <UiExtension
                    uiId="MATERIAL_INPUT"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    name="last_name"
                    error={errors.last_name}
                    label={'Last Name *'}
                    helperText="This is a required field."
                  />
                </div>
              </div>
              <div className="b-form-group mt-3">
                <div className="b-inputForm relative">
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
                    type="Email"
                    error={errors.email}
                    label={'Email *'}
                    helperText="Please enter the correct email"
                  />
                </div>
              </div>
              <div className="b-form-group mt-3">
                <div className="b-inputForm relative">
                  <UiExtension
                    uiId="MATERIAL_PASSWORD_STRENGTH"
                    control={control}
                    rules={{
                      required: true,
                      minLength: 8,
                    }}
                    name="password"
                    error={errors.password}
                    label={'Password *'}
                    helperText={' This is a required field.'}
                  />
                </div>
                {/*<div*/}
                {/*  className="password-strength-meter mt-3 bg-gray-50*/}
                {/*    p-2"*/}
                {/*>*/}
                {/*  Password Strength:*/}
                {/*  /!*neu strong thay class text-red-600 = text-green-600 thay text- no pass theo cac trang thai*!/*/}
                {/*  <span className="text-red-600 font-bold pl-2">*/}
                {/*    No Password*/}
                {/*  </span>*/}
                {/*</div>*/}
              </div>
              <div className="b-form-group mt-3">
                <div className="b-inputForm relative">
                  <UiExtension
                    uiId="MATERIAL_PASSWORD"
                    control={control}
                    rules={{
                      required: true,
                      validate: (value: any) =>
                        value === watch('password') || 'Passwords dont match',
                    }}
                    name="password_confirm"
                    error={errors.password_confirm}
                    label={'Confirm Password *'}
                    helperText={'Passwords dont match'}
                  />
                </div>
              </div>
              <div className="b-field newsletter mt-3">
                <input
                  type="checkbox"
                  // name="is_subscribed"
                  title="Sign Up for Newsletter"
                  // value="1"
                  id="is_subscribed"
                  className="checkbox"
                  {...register('is_subscribed')}
                />
                <label htmlFor="is_subscribed" className="label pl-2">
                  <span>Sign Up for Newsletter</span>
                </label>
              </div>
              <div className="b-field choice mt-3">
                <input
                  type="checkbox"
                  // name="assistance_allowed_checkbox"
                  // value="1"
                  id="assistance_allowed_checkbox"
                  className="checkbox"
                  {...register('assistance_allowed_checkbox')}
                />
                <label
                  htmlFor="assistance_allowed_checkbox"
                  className="label pl-2 relative"
                >
                  <span>Allow remote shopping assistance</span>
                </label>
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  disabled={props?.state?.isCreating}
                  className={clsx(
                    'btn-primary mdm:h-40px h-44 bg-color-2362AA white text-16px rounded text-white text-center w-full font-bold mt-4',
                    props?.state?.isCreating && 'btn-loader btn-loader-active'
                  )}
                >
                  <span
                    className={clsx(props?.state?.isCreating && 'loader')}
                  />
                  Create an Account
                </button>
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => {
                    RouterSingleton.push(ROUTES.r('ACCOUNT_LOGIN'));
                  }}
                  className="btn-primary mdm:h-40px h-44 bg-white white text-16px rounded text-black text-center w-full font-bold mt-3 border-black border mb-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AccountRegisterForm;
