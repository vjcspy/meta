import { setOrdersPageFilter } from '@modules/account/store/customer-order/actions';
import { selectOrdersPageFilter } from '@modules/account/store/customer-order/selector';
import isEmpty from 'lodash/isEmpty';
import { useCallback } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useCustomerOrderPageInfo = () => {
  const dispatch = useDispatch();
  const pageFilter = useSelector(selectOrdersPageFilter);
  const setFilterStatus = useCallback(
    (status: string) => {
      const _f = { ...pageFilter };
      if (pageFilter.status == status || isEmpty(status)) {
        _f.status = 'all';
      } else if (status.includes(',')) {
        _f.status = status.split(',');
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
  return {
    state: { pageFilter },
    actions: {
      setFilterStatus,
    },
  };
};
