import { useGetCustomerOrdersLazyQuery } from '@vjcspy/apollo';
import { useCallback, useEffect, useState } from 'react';

export const useMyOrdersPaging = () => {
  const [filters, setFilters] = useState({
    currentPage: '1',
    status: 'all',
    pageSize: 5,
  });
  const [orders, setOrders] = useState<any>();

  const [getOrdersQuery, getOrdersRes] = useGetCustomerOrdersLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getOrdersQuery({
      variables: {
        currentPage: parseInt(filters.currentPage),
        pageSize: filters.pageSize,
        filter:
          filters?.status === 'all'
            ? undefined
            : {
                status: {
                  eq: filters.status,
                },
              },
      },
    });
  }, [filters]);

  useEffect(() => {
    if (getOrdersRes.data?.customer?.orders) {
      setOrders(getOrdersRes.data!.customer!.orders);
    }
  }, [getOrdersRes.data?.customer?.orders]);

  const setCurrentPage = useCallback(
    (currentPage: any) => {
      const _f = { ...filters };
      _f.currentPage = currentPage + '';
      setFilters(_f);
    },
    [filters]
  );

  const setFilterStatus = useCallback(
    (status: string) => {
      const _f = { ...filters };
      if (filters.status == status) {
        _f.status = 'all';
      } else {
        _f.status = status;
      }
      _f.currentPage = '1';
      setFilters(_f);
    },
    [filters]
  );

  return {
    state: {
      orders,
      currentPage: filters.currentPage,
      currentStatus: filters.status,
      isLoading: getOrdersRes.loading,
    },
    actions: {
      setCurrentPage,
      setFilterStatus,
    },
  };
};
