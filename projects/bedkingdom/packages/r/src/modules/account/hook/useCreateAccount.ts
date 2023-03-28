import { generateCustomerTokenAction } from '@modules/account/store/account.actions';
import { useCreateAccountMutation } from '@vjcspy/apollo';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useCreateAccount = () => {
  const dispatch = useDispatch();

  const [customerData, setCustomerData] = useState<any>();
  const [createAccountQuery, createAccountRes] = useCreateAccountMutation();

  const createCustomerAccount = useCallback((customerData: any) => {
    console.log('===customerData', customerData);
    setCustomerData(customerData);
    createAccountQuery({
      variables: {
        ...customerData,
      },
    });
  }, []);

  useEffect(() => {
    if (createAccountRes.error) {
      console.error('Could not create customer account');
      setCustomerData({});
    }
    if (createAccountRes.data) {
      if (createAccountRes.data?.createCustomer?.customer) {
        dispatch(
          generateCustomerTokenAction({
            email: customerData?.email,
            password: customerData?.password,
          })
        );
        setCustomerData({});
      }
    }
  }, [createAccountRes.data, createAccountRes.error]);

  return {
    actions: {
      createCustomerAccount,
    },
    state: {
      isCreating: createAccountRes.loading,
    },
  };
};
