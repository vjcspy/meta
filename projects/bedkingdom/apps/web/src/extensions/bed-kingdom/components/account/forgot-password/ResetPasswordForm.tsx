import { withAccountResetPassword } from '@vjcspy/r/build/modules/account/hoc/reset-password/withAccountResetPassword';
import { combineHOC, UiExtension } from '@web/ui-extension';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const ResetPasswordForm: React.FC<any> = combineHOC(withAccountResetPassword)(
  (props) => {
    const router = useRouter();
    const { token, email } = router.query;

    const {
      control,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm();

    const onSubmit = useCallback((data: any) => {
      if (typeof props.actions?.resetPassword === 'function') {
        // @ts-ignore
        props.actions.resetPassword(email || '', token || '', data.password);
      }
    }, []);

    return (
      <section className="b-customer-page mx-auto px-4">
        <div className="grid md:grid-cols-2 md:gap-20">
          <div className="form-forgot mb-4">
            <h2 className="b-customer__title text-22px mdm:text-18px text-black font-bold mb-6">
              Reset your password
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-20">
                <div className="row mb-10">
                  <div className="gl-input col-12">
                    <div className="row mb-10">
                      <div className="gl-input col-12">
                        <UiExtension
                          uiId="MATERIAL_PASSWORD"
                          control={control}
                          rules={{
                            required: true,
                            pattern: new RegExp(
                              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
                            ),
                          }}
                          name="password"
                          error={errors.password}
                          label="New Password"
                          helperText="This is a required field."
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="gl-input col-12">
                        <UiExtension
                          uiId="MATERIAL_PASSWORD"
                          control={control}
                          rules={{
                            required: true,
                            validate: (value: any) =>
                              value === watch('password') ||
                              'Please enter the same value again..',
                          }}
                          name="password_confirm"
                          error={errors.password_confirm}
                          label="Confirm New Password"
                          helperText="Please enter the same value again.."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mt-3">
                    <button
                      type="submit"
                      // disabled={props?.state?.loadingToken}
                      className="btn-primary mdm:h-40px h-44 bg-color-2362AA white text-16px rounded text-white text-center w-full font-bold mt-4"
                    >
                      Set a New Password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
);

export default ResetPasswordForm;
