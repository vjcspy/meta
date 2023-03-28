import 'reactjs-popup/dist/index.css';

import { withBedCustomerAddressActions } from '@extensions/bed-kingdom/hoc/account/withBedCustomerAddressActions';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const FromDetailAddress: React.FC<{ close: any; address?: any }> = combineHOC(
  withBedCustomerAddressActions
)((props) => {
  const [checkPostCodeFail, setCheckPostCodeFail] = useState(false);
  const [statusButton, setStatusButton] = useState(false);
  const [listDataByPostCode, setListDataByPostCode] = useState<any[]>([]);

  const queryGetDataByPostCode = useCallback(async (query: string) => {
    try {
      if (query.length > 0) {
        setStatusButton(true);
        if (typeof window !== 'undefined') {
          // @ts-ignore
          window['_cp_instances'] = [];
          // @ts-ignore
          window['_cp_instances'][1] = {
            handle_js_response: (status: any, result: any, data: any) => {
              const dataList: any[] = [];

              if (data && data[1] && data[1].length > 0) {
                data[1].forEach((item: any) => {
                  dataList.push({
                    name_street:
                      item?.building_name ||
                      '' + item?.organisation_name ||
                      '' + ' ' + item?.building_number ||
                      '',
                    thoroughfare:
                      data[1]?.thoroughfare_name +
                      ' ' +
                      data[1]?.thoroughfare_descriptor,
                    town: data?.town,
                    postcode: data?.postcode,
                  });
                });
                setListDataByPostCode(dataList);
                setCheckPostCodeFail(false);
              } else {
                setCheckPostCodeFail(true);
                setListDataByPostCode([]);
              }
            },
          };
        }

        const res = await fetch(
          'https://pcls1.craftyclicks.co.uk/js/rapidaddress?postcode=' +
            query +
            '&callback=_cp_instances%5B1%5D.handle_js_response&callback_id=0&key=5f4b0-84d7e-f7e41-004c3'
        );
        let text = await res.text();
        text = text.replace('{', '').replace('}', '');
        eval(text);
        setStatusButton(false);
      }
    } catch (e) {
      setStatusButton(false);
      console.log(e);
    }
  }, []);

  const setValueToInput = useCallback(
    (res: any) => {
      const data = listDataByPostCode.filter(
        (it: any) => it?.name_street === res
      );
      if (data && data[0]) {
        setValue('street', data[0]?.name_street ?? '');
        setValue('street1', data[0]?.thoroughfare ?? '');
        setValue('postcode', data[0]?.postcode ?? '');
        setValue('city', data[0]?.town ?? '');
      }
    },
    [listDataByPostCode]
  );

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback((data: any) => {
    setCheckPostCodeFail(false);
    const input: any = {};
    input['firstname'] = data.firstname;
    input['lastname'] = data.lastname;
    input['country_id'] = data.country_id;
    input['telephone'] = data.telephone;
    input['city'] = data.city;
    input['postcode'] = data.postcode;
    input['region'] = {
      region: data.region,
      region_code: 'AZ',
    };
    input['fax'] = data.fax;
    input['default_billing'] = data.default_billing;
    input['default_shipping'] = data.default_shipping;
    input['street'] = [data.street, data.street1, data.street2];
    if (props.address?.id) {
      if (typeof props.actions.updateCustomerAddress === 'function') {
        props.actions.updateCustomerAddress(props.address?.id, input);
      }
    } else {
      if (typeof props.actions?.createNewCustomerAddress === 'function') {
        props.actions?.createNewCustomerAddress(input);
      }
    }
  }, []);

  // init form value
  useEffect(() => {
    let isMounted = true;
    if (props.address?.id) {
      setValue('firstname', props.address?.firstname ?? '');
      setValue('lastname', props.address?.lastname ?? '');
      setValue('telephone', props.address?.telephone ?? '');
      setValue('city', props.address?.city ?? '');
      setValue('postcode', props.address?.postcode ?? '');
      setValue('region', props.address?.region?.region ?? '');
      setValue('fax', props.address?.fax ?? '');
      setValue('street', props.address?.street[0] ?? '');
      setValue('street1', props.address?.street[1] ?? '');
      setValue('street2', props.address?.street[2] ?? '');
      setValue('default_billing', props.address?.default_billing ?? '');
      setValue('default_shipping', props.address?.default_shipping ?? '');
    }

    return () => {
      isMounted = false;
      setListDataByPostCode([]);
    };
  }, [props.address?.id]);

  useEffect(() => {
    if (props.state?.isActionsDone) {
      props?.actions?.setIsActionsDone(false);
      props?.close();
    }
  }, [props.state?.isActionsDone]);

  return (
    <div className="modal">
      <div className="header flex items-center">
        Shipping Address{' '}
        <button className="close text-22px" onClick={() => props?.close()}>
          &times;
        </button>
      </div>
      <div className="content">
        <form>
          <div className="b-shipping-new-address-form mb-4">
            <div className="b-form grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
              <div className="form-input required mb-3">
                <label
                  className="label font-bold mb-2 block b-checkout__label"
                  htmlFor="firstname"
                >
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
                    placeholder="First Name"
                    className="input-text w-full h-40px "
                  />
                  {errors.firstname && (
                    <span className="mt-2 text-red-700">
                      This is a required field.
                    </span>
                  )}
                </div>
              </div>

              <div className="form-input required mb-3">
                <label
                  className="label font-bold mb-2 block b-checkout__label"
                  htmlFor="firstname"
                >
                  <span>Last Name</span>
                </label>
                <div className="control">
                  <input
                    type="text"
                    // name="lastname"
                    {...register('lastname', {
                      required: true,
                    })}
                    max={50}
                    placeholder="Last Name"
                    className="input-text w-full h-40px "
                  />
                  {errors.lastname && (
                    <span className="mt-2 text-red-700">
                      This is a required field.
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="b-form grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
              <div className="form-input required mb-3">
                <label
                  className="label font-bold mb-2 block b-checkout__label"
                  htmlFor="firstname"
                >
                  <span>Phone number</span>
                </label>
                <div className="control">
                  <input
                    type="number"
                    // name="telephone"
                    {...register('telephone', {
                      required: true,
                    })}
                    placeholder="Mobile Number *"
                    className="input-text w-full h-40px "
                  />
                  {errors.telephone && (
                    <span className="mt-2 text-red-700">
                      This is a required field.
                    </span>
                  )}
                </div>
              </div>
              <div className="form-input required mb-3">
                <label
                  className="label font-bold mb-2 block"
                  htmlFor="firstname"
                >
                  <span>Postal Code </span>
                </label>
                <div className="control">
                  <input
                    type="text"
                    // name="postcode"
                    {...register('postcode', {
                      required: true,
                    })}
                    placeholder="Postal Code "
                    className="input-text w-full h-40px "
                  />
                  {errors.postcode && (
                    <span className="mt-2 text-red-700">
                      This is a required field.
                    </span>
                  )}
                  {checkPostCodeFail && (
                    <span className="mt-2 text-red-700">
                      No data was found for the requested postcode.
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              className={clsx(
                'btn-default text-14px bg-color-6bc85e h-40px hover:opacity-80 mb-5 pl-4 pr-4',
                statusButton &&
                  'divDisable btn-loader btn-loader-active divDisable'
              )}
              onClick={() => {
                if (getValues('postcode').length >= 7) {
                  setCheckPostCodeFail(false);
                  queryGetDataByPostCode(getValues('postcode'));
                } else setCheckPostCodeFail(true);
              }}
              disabled={statusButton}
            >
              <span className={clsx(statusButton && 'loader')} />
              Click To Find Address
            </button>
            {listDataByPostCode && listDataByPostCode.length > 0 && (
              <div className="control">
                <select
                  placeholder="---- Please select your address ----"
                  className="input-text w-full h-40px "
                  onChange={(e) => {
                    setValueToInput(e.target.value);
                  }}
                >
                  <option value="">---- Please select your address ----</option>
                  {listDataByPostCode.map((it: any) => (
                    <option value={it?.name_street} key={it?.name_street}>
                      {it?.name_street +
                        ', ' +
                        it?.thoroughfare +
                        ', ' +
                        it?.town}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="b-street">
              <div className="b-checkout__label mt-4 text-14px mb-4 label font-bold mb-2 block">
                <span> Street Address</span>
              </div>
              <div className="b-form mb-4">
                <input
                  className="input-text w-full"
                  type="text"
                  max={50}
                  {...register('street', {
                    required: true,
                  })}
                />
                {errors.street && (
                  <span className="mt-2 text-red-700">
                    This is a required field.
                  </span>
                )}
              </div>
              <div className="b-form mb-4">
                <input
                  className="input-text w-full"
                  type="text"
                  max={50}
                  {...register('street1')}
                />
              </div>
              <div className="b-form mb-4">
                <input
                  className="input-text w-full"
                  type="text"
                  max={50}
                  {...register('street2')}
                />
              </div>
              <div className="b-form grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                <div className="form-input required mb-3">
                  <label
                    className="label font-bold mb-2 block b-checkout__label"
                    htmlFor="firstname"
                  >
                    <span>Country</span>
                  </label>
                  <div className="control">
                    <select
                      {...register('country_id', {
                        required: true,
                      })}
                      placeholder="Country *"
                      className="input-text w-full h-40px "
                    >
                      <option value="GB">United Kingdom</option>
                    </select>
                    {errors.country_id && (
                      <span className="mt-2 text-red-700">
                        This is a required field.
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-input  mb-3">
                  <label
                    className="label font-bold mb-2 block"
                    htmlFor="firstname"
                  >
                    <span>County</span>
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      // name="region"
                      {...register('region')}
                      placeholder="County"
                      className="input-text w-full h-40px "
                    />
                  </div>
                </div>
              </div>
              <div className="b-form grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="form-input required mb-3">
                  <label
                    className="label font-bold mb-2 block b-checkout__label"
                    htmlFor="firstname"
                  >
                    <span>Town / City</span>
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      // name="city"
                      {...register('city', {
                        required: true,
                      })}
                      placeholder="Town / City *"
                      className="input-text w-full h-40px "
                    />
                    {errors.city && (
                      <span className="mt-2 text-red-700">
                        This is a required field.
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-input mb-3">
                  <label
                    className="label font-bold mb-2 block"
                    htmlFor="firstname"
                  >
                    <span>Fax</span>
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      // name="fax"
                      {...register('fax')}
                      placeholder="Fax"
                      className="input-text w-full h-40px "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <input
                type="checkbox"
                id="default_billing"
                // name="default_billing"
                {...register('default_billing')}
              />
              <label htmlFor="default_billing" className="pl-2">
                Use as my default billing address
              </label>
            </div>
            <div className="mt-2 mb-2">
              <input
                type="checkbox"
                id="default_shipping"
                // name="default_shipping"
                {...register('default_shipping')}
              />
              <label htmlFor="default_shipping" className="pl-2">
                Use as my default shipping address
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="actions mt-5">
        <button
          type="button"
          className="action h-40px bg-main-2361aa rounded-3 text-white pl-4 pr-4 whitespace-nowrap mr-3 min-w-125 font-bold"
          onClick={() => {
            props?.close();
          }}
        >
          <span>Close</span>
        </button>
        <button
          type="button"
          className={clsx(
            'action h-40px bg-main-2361aa rounded-3 text-white pl-4 pr-4 whitespace-nowrap min-w-125 font-bold',
            props?.state?.isUpdatingAddress && 'btn-loader btn-loader-active'
          )}
          value="Cancel Coupon"
          onClick={handleSubmit(onSubmit)}
          disabled={props?.state?.isUpdatingAddress}
        >
          <span className={clsx(props?.state?.isUpdatingAddress && 'loader')} />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
});

export default FromDetailAddress;
