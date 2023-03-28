import BED_KINGDOM_COMMON from '@extensions/bed-kingdom/values/BED_KINGDOM_COMMON';
import ROUTES from '@values/extendable/ROUTES';
import { withAccountDefaultActions } from '@vjcspy/r/build/modules/account/hoc/withAccountDefaultActions';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import * as React from 'react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const AccountRegisterForm = combineHOC(withAccountDefaultActions)((props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = useCallback((data: any) => {
    if (props.actions.requestPasswordReset && data['email']) {
      props.actions.requestPasswordReset(data['email']);
    }
  }, []);

  return (
    <div className="form-forgot mb-4">
      <h2 className="b-customer__title text-22px mdm:text-18px text-black font-bold mb-6">
        Reset your password
      </h2>
      <p className="text-gray-600text-gray-600">
        We will send you an email to reset your password.
      </p>
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
        <div className="mt-3 grid grid-cols-2 gap-4">
          <button
            type="submit"
            className="btn-primary mdm:h-40px h-44 bg-color-2362AA white text-16px rounded text-white text-center font-bold mt-4"
          >
            Submit
          </button>
          <button
            className="btn-primary bg-color-e02b27 text-white mdm:h-40px h-44  text-16px rounded text-center font-bold mt-4"
            onClick={() => {
              RouterSingleton.push(ROUTES.r('ACCOUNT_LOGIN'));
            }}
          >
            Cancel
          </button>
        </div>
        <p className="text-12px text-color-e02b27 block mt-5">
          * Required Fields
        </p>
      </form>
    </div>
  );
});

export default AccountRegisterForm;
