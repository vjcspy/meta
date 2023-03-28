import { SearchResultPageInfo } from '@vjcspy/apollo';
import { useGetBedKingdomCustomerOrdersLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { gotCustomerOrders } from '@vjcspy/r/build/modules/account/store/customer-order/actions';
import { selectOrders } from '@vjcspy/r/build/modules/account/store/customer-order/selector';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useBedCustomerOrders = () => {
  const dispatch = useDispatch();
  const [pageFilter, setPageFilter] = useState<any>({
    currentPage: 1,
    pageSize: 10,
    status: 'all',
  });
  const orders = useSelector(selectOrders);
  const [pageInfoRes, setPageInfoRes] = useState<SearchResultPageInfo>();
  const [totalCount, setTotalCount] = useState(0);

  const [getOrdersQuery, getOrdersRes] =
    useGetBedKingdomCustomerOrdersLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

  const setPageSizeAction = useCallback((data: number) => {
    if (data) {
      setPageFilter((prevState: any) => ({
        ...prevState,
        pageSize: data,
        currentPage: 1,
      }));
    }
  }, []);
  const setPageCurrentAction = useCallback((data: number) => {
    if (data) {
      setPageFilter((prevState: any) => ({ ...prevState, currentPage: data }));
    }
  }, []);

  useEffect(() => {
    getOrdersQuery({
      variables: {
        pageSize: parseInt(pageFilter?.pageSize),
        currentPage: pageFilter?.currentPage,
      },
    });
  }, [pageFilter]);

  useEffect(() => {
    if (getOrdersRes.error) {
      console.warn('Could not query getCustomerOrders');
    }
    if (getOrdersRes.data) {
      try {
        if (!!getOrdersRes.data?.customer?.orders) {
          if (getOrdersRes.data?.customer?.orders?.page_info) {
            setPageInfoRes(getOrdersRes.data.customer.orders.page_info);
          }
          dispatch(
            gotCustomerOrders({
              orders: getOrdersRes.data.customer.orders.items,
              mergeWithExisting: false,
              pageInfo: getOrdersRes.data.customer.orders.page_info!,
            })
          );
          if (getOrdersRes.data.customer.orders?.total_count) {
            setTotalCount(getOrdersRes.data.customer.orders?.total_count);
          }
        }
      } catch (e) {}
    }
  }, [getOrdersRes.data, getOrdersRes.error]);

  return {
    state: {
      orders,
      pageFilter,
      pageInfoRes,
      isLoading: getOrdersRes.loading,
      totalCount: totalCount,
    },
    actions: {
      setPageSizeAction,
      setPageCurrentAction,
    },
  };
};
