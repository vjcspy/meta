import {
  createNewCustomerAddressAction,
  createNewCustomerAddressAfterAction,
  createNewCustomerAddressErrorAction,
  deleteCustomerAddressAction,
  deleteCustomerAddressAfterAction,
  deleteCustomerAddressErrorAction,
  updateCustomerAddressAction,
  updateCustomerAddressAfterAction,
  updateCustomerAddressErrorAction,
} from '@modules/account/store/customer-address/actions';
import {
  CountryCodeEnum,
  CustomerAddressInput,
  useCreateCustomerAddressMutation,
  useDeleteCustomerAddressMutation,
  useUpdateCustomerAddMutation,
} from '@vjcspy/apollo';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from '@main/packages-web-redux';

const fakeAddressData = (input: any) => {
  if (typeof input === 'object') {
    input['country_code'] = CountryCodeEnum.Vn;
    input['city'] = input.iz_address_province;
    input['postcode'] = '10000';
  }

  return input;
};

export const useCustomerAddActions = () => {
  const [isDeletedAddress, setIsDeletedAddress] = useState(false);
  const dispatch = useDispatch();

  const [updateCustomerAddQuery, updateCustomerRes] =
    useUpdateCustomerAddMutation();

  const updateCustomerAddress = useCallback(
    (id: number, input: CustomerAddressInput) => {
      input = fakeAddressData(input);
      dispatch(updateCustomerAddressAction());
      updateCustomerAddQuery({
        variables: {
          id,
          input,
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).then((r) => {});
    },
    []
  );

  useEffect(() => {
    if (updateCustomerRes.data?.updateCustomerAddress) {
      dispatch(
        updateCustomerAddressAfterAction({
          address: updateCustomerRes.data?.updateCustomerAddress,
        })
      );
    }

    if (updateCustomerRes.error) {
      dispatch(
        updateCustomerAddressErrorAction({
          error: updateCustomerRes.error,
        })
      );
    }
  }, [updateCustomerRes.data]);

  const [createCustomerAddMutaion, createCustomerAddRes] =
    useCreateCustomerAddressMutation();

  useEffect(() => {
    if (createCustomerAddRes.error) {
      dispatch(
        createNewCustomerAddressErrorAction({
          error: createCustomerAddRes.error,
        })
      );
    }

    if (createCustomerAddRes.data?.createCustomerAddress) {
      dispatch(
        createNewCustomerAddressAfterAction({
          address: createCustomerAddRes.data?.createCustomerAddress,
        })
      );
    }
  }, [createCustomerAddRes.data]);

  const createNewCustomerAddress = useCallback(
    (input: CustomerAddressInput) => {
      dispatch(createNewCustomerAddressAction());
      input = fakeAddressData(input);
      createCustomerAddMutaion({
        variables: {
          input,
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).then((r) => {});
    },
    []
  );

  const [deleteCustomerAddMutation, deleteCustomerAddRes] =
    useDeleteCustomerAddressMutation();

  const deleteCustomerAddress = useCallback(async (id: number) => {
    dispatch(
      deleteCustomerAddressAction({
        id,
      })
    );

    try {
      await deleteCustomerAddMutation({
        variables: {
          id,
        },
      });
    } catch (error) {
      dispatch(
        deleteCustomerAddressErrorAction({
          error,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (deleteCustomerAddRes.error) {
      dispatch(
        deleteCustomerAddressErrorAction({
          error: deleteCustomerAddRes.error,
        })
      );
    }

    if (deleteCustomerAddRes.data?.deleteCustomerAddress) {
      dispatch(
        deleteCustomerAddressAfterAction({
          isSuccess: deleteCustomerAddRes.data?.deleteCustomerAddress,
        })
      );
      setIsDeletedAddress(true);
    }
  }, [deleteCustomerAddRes.data]);

  return {
    state: {
      isDeletedAddress,
    },
    actions: {
      createNewCustomerAddress,
      updateCustomerAddress,
      deleteCustomerAddress,
    },
  };
};
