import { withBedKingdomAccountActions } from '@extensions/bed-kingdom/hoc/account/withBedKingdomAccountActions';
import { withCustomer } from '@vjcspy/r/build/modules/account/hoc/withCustomer';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const MyAccountEdit = combineHOC(
  withCustomer,
  withBedKingdomAccountActions
)((props) => {
  const [canEditEmail, setCanEditEmail] = useState<boolean>(false);
  const [canEditPassword, setCanEditPassword] = useState<boolean>(
    props?.state?.selectedStatusReset || false
  );
  const [newPassword, setNewPassword] = useState<any>(0);
  const [passwordVadility, setPasswordVadility] = useState<{
    minChar: any;
    number: any;
    specialChar: any;
  }>({
    minChar: null,
    number: null,
    specialChar: null,
  });

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const isNumberRegx = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
  const specialCharacterRegx = /[ !@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/;

  const textStrength = useMemo(() => {
    if (passwordVadility?.minChar && passwordVadility?.number) {
      return {
        highlightClass: 'text-green-600',
        textShow: 'Very Strong',
      };

      if (passwordVadility?.specialChar) {
        return { highlightClass: 'text-green-600', textShow: 'Strong' };
      }
    } else {
      return { highlightClass: 'text-red-600', textShow: 'Weak' };
    }
  }, [passwordVadility]);

  // init form value
  useEffect(() => {
    if (props.state?.customer) {
      setValue('firstname', props.state?.customer?.firstname ?? '');
      setValue('lastname', props.state?.customer?.lastname ?? '');
      setValue(
        'assistance_allowed_checkbox',
        props.state?.customer?.allow_remote_shopping_assistance
      );
    }
  }, [props.state?.customer]);

  useEffect(() => {
    if (props.state?.customer && canEditEmail) {
      setValue('email', props.state?.customer?.email ?? '');
    }
  }, [props.state?.customer, canEditEmail]);

  const onSubmit = useCallback(
    (data: any) => {
      const input: any = {};

      input['firstname'] = data.firstname;
      input['lastname'] = data.lastname;
      input['allow_remote_shopping_assistance'] =
        data.assistance_allowed_checkbox;

      if (canEditEmail && data.email) {
        input['email'] = data.email;
        input['password'] = data.password;
      }

      if (
        canEditPassword &&
        typeof props.actions.changeCustomerPassword === 'function' &&
        data.password &&
        data.newPassword
      ) {
        props.actions.changeCustomerPassword(data.password, data.newPassword);
      }

      if (typeof props.actions.updateCustomer === 'function') {
        props.actions.updateCustomer(input);
      }
    },
    [canEditEmail, canEditPassword]
  );

  return (
    <div className="b-block-sidebar">
      <h1 className="b-account-title mb-5 mdm:font-bold">
        <span className="text-26px">Edit Account Information</span>
      </h1>
      <form>
        <div className="block-dashboard-info mb-6 md:mb-12">
          <div className="block-content grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="box-information">
              <div className="form-input required mb-6">
                <label className="label font-bold mb-2 block b-checkout__label">
                  <span>First Name</span>
                </label>
                <div className="control">
                  <input
                    type="text"
                    // name="firstname"
                    {...register('firstname', {
                      required: true,
                    })}
                    max={50}
                    title="First Name"
                    className="input-text w-full h-40px "
                  />
                </div>
                {errors.firstname && (
                  <span className="mt-2 text-red-700">
                    This is a required field.
                  </span>
                )}
              </div>
              <div className="form-input required mb-6">
                <label className="label font-bold mb-2 block b-checkout__label">
                  <span>Last Name</span>
                </label>
                <div className="control">
                  <input
                    type="text"
                    // name="firstname"
                    {...register('lastname', {
                      required: true,
                    })}
                    max={50}
                    title="Last Name"
                    className="input-text w-full h-40px "
                  />
                </div>
                {errors.lastname && (
                  <span className="mt-2 text-red-700">
                    This is a required field.
                  </span>
                )}
              </div>
            </div>

            <div className="box box-newsletter">
              {canEditEmail && (
                <>
                  <div className="form-input required mb-6">
                    <label className="label font-bold mb-2 block b-checkout__label">
                      <span>Email</span>
                    </label>
                    <div className="control">
                      <input
                        type="text"
                        // name="firstname"
                        {...register('email', {
                          required: true,
                          pattern: new RegExp(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
                          ),
                        })}
                        max={50}
                        className="input-text w-full h-40px "
                      />
                    </div>
                    {errors.email && (
                      <span className="mt-2 text-red-700">
                        This is a required field.
                      </span>
                    )}
                  </div>
                  <div className="form-input required mb-6">
                    <label className="label font-bold mb-2 block b-checkout__label">
                      <span>Current Password</span>
                    </label>
                    <div className="control">
                      <input
                        type="password"
                        // name="currentPassword"
                        {...register('password', {
                          required: true,
                          minLength: 8,
                        })}
                        max={50}
                        className="input-text w-full h-40px "
                      />
                    </div>
                    {errors.password && (
                      <span className="mt-2 text-red-700">
                        This is a required field.
                      </span>
                    )}
                  </div>
                </>
              )}
              {canEditPassword && (
                <>
                  {canEditPassword !== canEditEmail && (
                    <div className="form-input required mb-6">
                      <label className="label font-bold mb-2 block b-checkout__label">
                        <span>Current Password</span>
                      </label>
                      <div className="control">
                        <input
                          type="password"
                          // name="firstname"
                          {...register('password', {
                            required: true,
                            minLength: 8,
                          })}
                          max={50}
                          className="input-text w-full h-40px "
                        />
                      </div>
                      {errors.password && (
                        <span className="mt-2 text-red-700">
                          This is a required field.
                        </span>
                      )}
                    </div>
                  )}
                  <div className="form-input required mb-6">
                    <label className="label font-bold mb-2 block b-checkout__label">
                      <span>New Password</span>
                    </label>
                    <div className="control">
                      <input
                        type="password"
                        // name="firstname"
                        {...register('newPassword', {
                          required: true,
                          minLength: 8,
                        })}
                        max={50}
                        className="input-text w-full h-40px "
                        onChange={(val) => {
                          setNewPassword(val?.target?.value.length);
                          setPasswordVadility({
                            minChar: val?.target?.value.length >= 8,
                            number: isNumberRegx.test(val?.target?.value),
                            specialChar: specialCharacterRegx.test(
                              val?.target?.value
                            ),
                          });
                        }}
                      />
                    </div>
                    {errors.newPassword && (
                      <span className="mt-2 text-red-700">
                        This is a required field.
                      </span>
                    )}
                  </div>
                  <div className="password-strength-meter mt-3 bg-gray-50 p-2">
                    Password Strength:
                    {/*neu strong thay class text-red-600 = text-green-600 thay text- no pass theo cac trang thai*/}
                    {newPassword === 0 ? (
                      <span className="text-red-600 font-bold pl-2">
                        No Password
                      </span>
                    ) : (
                      <span
                        className={`font-bold pl-2 ${textStrength?.highlightClass}`}
                      >
                        {textStrength?.textShow}
                      </span>
                    )}
                  </div>
                  <div className="form-input required mb-6">
                    <label className="label font-bold mb-2 block b-checkout__label">
                      <span>Confirm New Password</span>
                    </label>
                    <div className="control">
                      <input
                        type="password"
                        // name="firstname"
                        {...register('confirmNewPassword', {
                          required: true,
                          validate: (value: any) =>
                            value === watch('newPassword') ||
                            'Passwords dont match',
                        })}
                        max={50}
                        className="input-text w-full h-40px "
                      />
                    </div>
                    {errors.confirmNewPassword && (
                      <span className="mt-2 text-red-700">
                        Passwords dont match
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="block-dashboard-addresses mb-6 md:mb-12">
              <div className="field choice mb-3">
                <input
                  type="checkbox"
                  name="change_email"
                  id="change-email"
                  data-role="change-email"
                  value="1"
                  title="Change Email"
                  className="checkbox"
                  defaultChecked={canEditEmail}
                  onChange={(e) => setCanEditEmail(e.target.checked)}
                />
                <label className="label pl-3 relative" htmlFor="change-email">
                  <span>Change Email</span>
                </label>
              </div>
              <div className="field choice mb-3 ">
                <input
                  type="checkbox"
                  name="change_password"
                  id="change-password"
                  data-role="change-password"
                  value="1"
                  title="Change Password"
                  className="checkbox"
                  defaultChecked={canEditPassword}
                  onChange={(e) => setCanEditPassword(e.target.checked)}
                />
                <label
                  className="label pl-3 relative"
                  htmlFor="change-password"
                >
                  <span>Change Password</span>
                </label>
              </div>
              <div className="field choice mb-3">
                <input
                  type="checkbox"
                  // name="assistance_allowed_checkbox"
                  title="Allow remote shopping assistance"
                  // value="1"
                  id="assistance_allowed_checkbox"
                  className="checkbox"
                  {...register('assistance_allowed_checkbox')}
                />
                <label
                  htmlFor="assistance_allowed_checkbox"
                  className="label pl-3 relative"
                >
                  <span>Allow remote shopping assistance</span>
                </label>
              </div>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className={clsx(
                  'btn btn-default mt-8 pl-8 pr-8',
                  props?.state?.isLoadingState?.resetPassword &&
                    'btn-loader btn-loader-active'
                )}
                disabled={props?.state?.isLoadingState?.resetPassword}
              >
                <span
                  className={clsx(
                    props?.state?.isLoadingState?.resetPassword && 'loader'
                  )}
                />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});

export default MyAccountEdit;
