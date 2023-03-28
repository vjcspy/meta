import { setIsOpenPopup } from '@extensions/bed-kingdom/store/content/content.content.actions';
import { selectIsPopupOpening } from '@extensions/bed-kingdom/store/content/content.content.selector';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const withBedStatusPopupData = createUiHOC(() => {
  const dispatch = useDispatch();
  const isOpenPopup = useSelector(selectIsPopupOpening);
  const setIsOpenPopupActions = useCallback((value: any) => {
    dispatch(setIsOpenPopup({ value }));
  }, []);
  return {
    state: {
      isOpenPopup,
    },
    actions: { setIsOpenPopupActions },
  };
}, 'withBedStatusPopupData');
