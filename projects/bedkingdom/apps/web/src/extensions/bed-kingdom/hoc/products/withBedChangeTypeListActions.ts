import { bedChangeTypeListProduct } from '@extensions/bed-kingdom/store/content/content.content.actions';
import { selectTypeLisData } from '@extensions/bed-kingdom/store/content/content.content.selector';
import { useDispatch, useSelector } from '@main/packages-web-redux';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';

export const withBedChangeTypeListActions = createUiHOC(() => {
  const dispatch = useDispatch();
  const selectedType = useSelector(selectTypeLisData);
  const changeTypeListProduct = useCallback((type: string) => {
    dispatch(bedChangeTypeListProduct({ type }));
  }, []);
  return {
    selectedType: selectedType,
    changeTypeListProduct: changeTypeListProduct,
  };
}, 'withBedChangeTypeListActions');
