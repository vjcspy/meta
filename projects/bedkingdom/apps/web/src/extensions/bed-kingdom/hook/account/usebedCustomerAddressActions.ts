import { useDispatch, useSelector } from '@main/packages-web-redux';
import type { CustomerAddressInput } from '@vjcspy/apollo';
import { useDeleteCustomerAddressMutation } from '@vjcspy/apollo';
import {
  useCreateBedKingdomCustomerAddressMutation,
  useUpdateBedKingdomCustomerAddMutation,
} from '@vjcspy/apollo-bed-kingdom';
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
} from '@vjcspy/r/build/modules/account/store/customer-address/actions';
import { selectIsUpdatingAddress } from '@vjcspy/r/build/modules/checkout/store/cart/cart.selector';
import { useCallback, useEffect, useState } from 'react';

export const useBedCustomerAddressActions = () => {
  const [isDeletedAddress, setIsDeletedAddress] = useState(false);
  const [isActionsDone, setIsActionsDone] = useState(false);
  const dispatch = useDispatch();
  const isUpdatingAddress = useSelector(selectIsUpdatingAddress);

  const [createCustomerAddMutaion, createCustomerAddRes] =
    useCreateBedKingdomCustomerAddressMutation();

  const [updateCustomerAddQuery, updateCustomerRes] =
    useUpdateBedKingdomCustomerAddMutation();

  const [deleteCustomerAddMutation, deleteCustomerAddRes] =
    useDeleteCustomerAddressMutation();

  const updateCustomerAddress = useCallback(
    (id: number, input: CustomerAddressInput) => {
      dispatch(updateCustomerAddressAction());
      updateCustomerAddQuery({
        variables: {
          id,
          input,
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).catch((error: any) => {
        console.log('error', error.message);
        dispatch(
          updateCustomerAddressErrorAction({
            error: error,
          })
        );
      });
    },
    []
  );

  useEffect(() => {
    if (updateCustomerRes.data?.updateCustomerAddress) {
      setIsActionsDone(true);
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
      setIsActionsDone(true);
    }
  }, [updateCustomerRes.data]);

  useEffect(() => {
    if (createCustomerAddRes.error) {
      setIsActionsDone(true);
      dispatch(
        createNewCustomerAddressErrorAction({
          error: createCustomerAddRes.error,
        })
      );
    }

    if (createCustomerAddRes.data?.createCustomerAddress) {
      setIsActionsDone(true);
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

      createCustomerAddMutaion({
        variables: {
          input,
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      });
    },
    []
  );

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
      isUpdatingAddress,
      isActionsDone,
    },
    actions: {
      createNewCustomerAddress,
      updateCustomerAddress,
      deleteCustomerAddress,
      setIsActionsDone,
    },
  };
};
