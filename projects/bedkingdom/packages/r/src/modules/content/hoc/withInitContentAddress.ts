import { getContentAddressDataAction } from '@modules/content/store/address/actions';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const withInitContentAddress = createUiHOC((props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContentAddressDataAction());
  });

  return {};
}, 'withInitContentAddress');
