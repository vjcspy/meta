import type { IRootState } from '@src/store/index';
import { useSelector } from '@stock/packages-redux';

export const useSelectFromState = (selectFn: (state: IRootState) => any) => {
  return useSelector(selectFn);
};
