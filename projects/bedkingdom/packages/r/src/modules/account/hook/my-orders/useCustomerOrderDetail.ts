import {
  getCustomerOrderDetailAction,
  getCustomerOrderDetailAfterAction,
  getCustomerOrderDetailErrorAction,
} from '@modules/account/store/customer-order/actions';
import { selectOrderDetail } from '@modules/account/store/customer-order/selector';
import { useGetCustomerOrdersLazyQuery } from '@vjcspy/apollo';
import first from 'lodash/first';
import isArray from 'lodash/isArray';
import size from 'lodash/size';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useCustomerOrderDetail = () => {
  const orderDetail = useSelector(selectOrderDetail);
  const [getOrderDetailQuery, getOrderDetailRes] =
    useGetCustomerOrdersLazyQuery();
  const dispatch = useDispatch();

  const getOrderDetail = useCallback((order_id: any) => {
    dispatch(
      getCustomerOrderDetailAction({
        orderId: order_id,
      })
    );
    getOrderDetailQuery({
      variables: {
        filter: {
          number: {
            eq: order_id,
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (getOrderDetailRes.error) {
      console.warn(getOrderDetailRes.error);
      dispatch(
        getCustomerOrderDetailErrorAction({
          error: getOrderDetailRes.error,
        })
      );
    }
    if (
      isArray(getOrderDetailRes.data?.customer?.orders?.items) &&
      size(getOrderDetailRes.data?.customer?.orders?.items) === 1
    ) {
      const order = first(getOrderDetailRes.data?.customer?.orders?.items);
      dispatch(
        getCustomerOrderDetailAfterAction({
          order,
        })
      );
    }
  }, [getOrderDetailRes.data, getOrderDetailRes.error]);

  return {
    actions: {
      getOrderDetail,
    },
    state: {
      orderDetail,
      loading: getOrderDetailRes.loading,
    },
  };
};
