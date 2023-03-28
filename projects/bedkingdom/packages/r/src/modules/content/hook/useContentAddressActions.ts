import { getContentAddressDataAction } from '@modules/content/store/address/actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useContentAddressActions = () => {
  const dispatch = useDispatch();
  const getProvinceDistrictWardData = useCallback(() => {
    dispatch(getContentAddressDataAction());
  }, []);

  return {
    actions: { getProvinceDistrictWardData },
  };
};
