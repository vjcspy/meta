import { withBedKingdomCustomerForm } from '@extensions/bed-kingdom/hoc/common/withBedKingdomCustomerForm';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const CustomForm = combineHOC(withBedKingdomCustomerForm)((props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (typeof props?.actions?.getCustomForm === 'function' && props?.formId) {
      props?.actions?.getCustomForm(props?.formId);
    }
  }, [props?.formId]);

  const onSubmit = useCallback(
    (data: any) => {
      data['form_id'] = props?.state?.customFormData?.form_id;
      data['form_key'] = 'JrHluMDH3pi7lJ5K';

      if (data) {
        if (typeof props.actions.amCustomFormSubmit === 'function') {
          props.actions.amCustomFormSubmit(JSON.stringify(data));
        }
      }
    },
    [props?.state?.customFormData]
  );

  const form = useCallback(
    (item: any) => {
      if (item?.type) {
        switch (item?.type) {
          case 'dropdown':
            return (
              <div
                className={clsx(
                  'form-input mb-3',
                  item?.required && 'required'
                )}
              >
                <label className="label font-bold mb-2 block" htmlFor="Name">
                  <span>{item?.label}</span>
                </label>
                <div className="control">
                  <select
                    className="input-text w-full h-40px "
                    {...register(item?.name, {
                      required: !!item?.required,
                    })}
                    defaultValue={
                      item?.values.filter((i: any) => i?.selected === '1')[0]
                        ?.value
                    }
                    multiple={false}
                  >
                    {item?.values.map((it: any) => (
                      <option value={item?.value} key={it?.label}>
                        {it?.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          case 'textinput':
            return (
              <div
                className={clsx(
                  'form-input mb-3',
                  item?.required && 'required'
                )}
              >
                <label className="label font-bold mb-2 block" htmlFor="Name">
                  <span>{item?.label}</span>
                </label>
                <div className="control">
                  <input
                    type="text"
                    {...register(item?.name, {
                      required: !!item?.required,
                    })}
                    className="input-text w-full h-40px "
                  />
                </div>
              </div>
            );
          case 'number':
            return (
              <div
                className={clsx(
                  'form-input mb-3',
                  item?.required && 'required'
                )}
              >
                <label
                  className="label font-bold mb-2 block"
                  htmlFor="Telephone Number *"
                >
                  <span>{item?.label}</span>
                </label>
                <div className="control">
                  <input
                    type="text"
                    {...register(item?.name, {
                      required: !!item?.required,
                    })}
                    className="input-text w-full h-40px max-w-125"
                  />
                </div>
              </div>
            );
          case 'radio':
            return (
              <div
                className={clsx(
                  'form-input mb-3',
                  item?.required && 'required'
                )}
              >
                <label
                  className="label font-bold mb-2 block"
                  htmlFor="Telephone Number *"
                >
                  <span>{item?.label}</span>
                </label>
                <div className="control">
                  {Array.isArray(item?.values) &&
                    item?.values.length > 0 &&
                    item?.values.map((it: any) => (
                      <div
                        key={item?.name + it?.value}
                        style={{ padding: '0 10px' }}
                      >
                        <input
                          type="radio"
                          {...register(item?.name, {
                            required: !!item?.required,
                          })}
                          // className="input-text "

                          id={`raido-${it?.value}-${item?.name}`}
                        />
                        <label
                          htmlFor={`raido-${it?.value}-${item?.name}`}
                          title={it?.label}
                          onClick={() => {}}
                        >
                          {it?.label}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            );
          case 'textarea':
            return (
              <div
                className={clsx(
                  'form-input mb-5',
                  item?.required && 'required'
                )}
              >
                <label
                  className="label font-bold mb-2 block"
                  htmlFor="Comments *"
                >
                  <span>{item?.label}</span>
                </label>
                <div className="control">
                  <textarea
                    {...register(item?.name, {
                      required: !!item?.required,
                    })}
                    className="input-text input-text w-full min-h-92"
                    cols={5}
                    rows={3}
                  />
                </div>
              </div>
            );
        }
      }
      return '';
    },
    [props?.state?.customFormData]
  );

  return (
    <>
      {/*{props?.state?.statusLoading && (*/}
      {/*  <UiExtension uiId="LOADING_INDICATOR" global={false} />*/}
      {/*)}*/}
      {props?.state?.customFormData?.form_json &&
        JSON.parse(props?.state?.customFormData?.form_json) &&
        JSON.parse(props?.state?.customFormData?.form_json).length > 0 && (
          <form>
            {JSON.parse(props?.state?.customFormData?.form_json)[0].map(
              (item: any) => {
                return (
                  <div key={item?.name}>
                    {form(item)}{' '}
                    {errors[item?.name] && (
                      <span className="mt-2 text-red-700">
                        This is a required field.
                      </span>
                    )}
                  </div>
                );
              }
            )}
            <button
              type="button"
              className={clsx(
                'btn btn-default mt-8 pl-8 pr-8',
                props.state?.statusLoading &&
                  'divDisable btn-loader btn-loader-active divDisable'
              )}
              onClick={handleSubmit(onSubmit)}
              disabled={props.state?.statusLoading}
            >
              <span className={clsx(props.state?.statusLoading && 'loader')} />
              Submit
            </button>
          </form>
        )}
    </>
  );
});

export default CustomForm;
