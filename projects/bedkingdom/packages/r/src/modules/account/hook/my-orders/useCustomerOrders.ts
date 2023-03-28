import { useDispatch, useSelector } from '@main/packages-web-redux';
import {
  gotCustomerOrders,
  setOrdersPageFilter,
} from '@modules/account/store/customer-order/actions';
import {
  selectOrders,
  selectOrdersPageFilter,
} from '@modules/account/store/customer-order/selector';
import type { SearchResultPageInfo } from '@vjcspy/apollo';
import { useGetCustomerOrdersLazyQuery } from '@vjcspy/apollo';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useCustomerOrders = () => {
  const dispatch = useDispatch();
  const pageFilter = useSelector(selectOrdersPageFilter);
  const orders = useSelector(selectOrders);
  const [pageInfoRes, setPageInfoRes] = useState<SearchResultPageInfo>();

  const [getOrdersQuery, getOrdersRes] = useGetCustomerOrdersLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const setFilterStatus = useCallback(
    (status: string) => {
      const _f = { ...pageFilter };
      if (pageFilter.status == status || isEmpty(status)) {
        _f.status = 'all';
      } else {
        _f.status = status;
      }
      _f.currentPage = 1;
      dispatch(
        setOrdersPageFilter({
          pageFilter: _f,
        })
      );
    },
    [pageFilter]
  );

  const debounceRunQueryGetList = useMemo(() => {
    return debounce((variables) => {
      getOrdersQuery({ variables });
    }, 250);
  }, []);

  const debounceLoadMorePage = useMemo(() => {
    return debounce(() => {
      const _f = { ...pageFilter };
      _f.currentPage = _f.currentPage + 1;
      dispatch(
        setOrdersPageFilter({
          pageFilter: _f,
        })
      );
    }, 250);
  }, [pageFilter]);

  const handleLoadMorePage = useCallback(() => {
    if (
      !pageInfoRes?.total_pages ||
      pageFilter?.currentPage < pageInfoRes?.total_pages
    ) {
      if (!getOrdersRes.loading) {
        debounceLoadMorePage();
      }
    }
  }, [pageFilter, pageInfoRes, getOrdersRes.loading, debounceLoadMorePage]);

  useEffect(() => {
    let filters: any = undefined;
    if (Array.isArray(pageFilter?.status)) {
      filters = {
        status: {
          in: pageFilter.status,
        },
      };
    } else if (pageFilter?.status !== 'all') {
      filters = {
        status: {
          eq: pageFilter.status,
        },
      };
    }

    debounceRunQueryGetList({
      pageSize: 10,
      currentPage: pageFilter?.currentPage,
      filter: filters,
    });
  }, [pageFilter]);

  useEffect(() => {
    if (getOrdersRes.error) {
      console.warn('Could not query getCustomerOrders');
    }
    if (getOrdersRes.data) {
      try {
        if (getOrdersRes.data?.customer?.orders) {
          if (getOrdersRes.data?.customer?.orders?.page_info) {
            setPageInfoRes(getOrdersRes.data.customer.orders.page_info);
          }
          dispatch(
            gotCustomerOrders({
              orders: getOrdersRes.data.customer.orders.items,
              mergeWithExisting: true,
              pageInfo: getOrdersRes.data.customer.orders.page_info!,
            })
          );
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
    },
    actions: {
      handleLoadMorePage,
      setFilterStatus,
    },
  };
};
