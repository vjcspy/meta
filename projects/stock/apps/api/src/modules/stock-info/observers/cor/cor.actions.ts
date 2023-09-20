import { actionFactory } from '@nest/base';

export const COR_START_SYNC_ACTION = actionFactory('COR_START_SYNC_ACTION');
export const COR_LOAD_NEXT_PAGE = actionFactory('COR_LOAD_NEXT_PAGE');
export const COR_LOAD_NEXT_PAGE_ERROR = actionFactory(
  'COR_LOAD_NEXT_PAGE_ERROR',
);
export const COR_SYNC_FINISH = actionFactory('COR_SYNC_FINISH');
