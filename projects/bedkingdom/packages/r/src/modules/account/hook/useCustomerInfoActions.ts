import {
  updateCustomerInfoAction,
  updateCustomerInfoAfterAction,
  updateCustomerInfoErrorAction,
} from '@modules/account/store/customer-info/customer.info.actions';
import {
  CustomerUpdateInput,
  useUpdateCustomerInfoMutation,
} from '@vjcspy/apollo';
import { useCallback, useEffect } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useCustomerInfoActions = () => {
  const dispatch = useDispatch();
  const [updateCustomerMutation, updateCustomerRes] =
    useUpdateCustomerInfoMutation();

  const updateCustomerInfo = useCallback(async (info: CustomerUpdateInput) => {
    dispatch(
      updateCustomerInfoAction({
        info,
      })
    );
    try {
      await updateCustomerMutation({
        variables: {
          input: info,
        },
      });
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (updateCustomerRes.error) {
      dispatch(
        updateCustomerInfoErrorAction({
          error: updateCustomerRes.error,
        })
      );
    }

    if (updateCustomerRes?.data?.updateCustomerV2?.customer) {
      dispatch(
        updateCustomerInfoAfterAction({
          customer: updateCustomerRes?.data?.updateCustomerV2?.customer,
        })
      );
    }
  }, [
    updateCustomerRes.data?.updateCustomerV2?.customer,
    updateCustomerRes.error,
  ]);

  return {
    actions: { updateCustomerInfo },
  };
};
