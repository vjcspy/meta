import { useGetCustomerOrdersLazyQuery } from '@vjcspy/apollo';
import {
  useGetBedKingdomCustomerOrdersDetailsLazyQuery,
  useGetBedKingdomCustomerOrdersLazyQuery,
  useGetBedKingdomCustomerOrdersQuery,
} from '@vjcspy/apollo-bed-kingdom';
import {
  getCustomerOrderDetailAction,
  getCustomerOrderDetailAfterAction,
  getCustomerOrderDetailErrorAction,
} from '@vjcspy/r/build/modules/account/store/customer-order/actions';
import { selectOrderDetail } from '@vjcspy/r/build/modules/account/store/customer-order/selector';
import first from 'lodash/first';
import isArray from 'lodash/isArray';
import size from 'lodash/size';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useBedKingdomCustomerOrderDetail = () => {
  const orderDetail = useSelector(selectOrderDetail);
  const [getOrderDetailQuery, getOrderDetailRes] =
    useGetBedKingdomCustomerOrdersDetailsLazyQuery();
  const dispatch = useDispatch();

  const getOrderDetail = useCallback((order_number: any) => {
    dispatch(
      getCustomerOrderDetailAction({
        orderId: order_number,
      })
    );
    getOrderDetailQuery({
      variables: {
        filter: {
          number: {
            eq: order_number,
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
