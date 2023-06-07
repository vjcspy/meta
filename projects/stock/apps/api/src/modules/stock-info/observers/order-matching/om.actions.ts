import type { OrderMatchingType } from '@modules/stock-info/model/OrderMatching';
import { actionFactory } from '@nest/base/dist/util/event-manager-rx/event-rx.factory';

export const SYNC_ORDER_MATCHING = actionFactory<{
  code: string;
  type: OrderMatchingType;
  resolve?: any;
  force?: boolean;
}>('SYNC_ORDER_MATCHING');

export const SYNC_ORDER_MATCHING_ERROR = actionFactory<{
  code: string;
  type: OrderMatchingType;
  error?: Error;
}>('SYNC_ORDER_MATCHING_ERROR');

export const SYNC_ORDER_MATCHING_MAX_RETRY = actionFactory<{
  code: string;
  type: OrderMatchingType;
}>('SYNC_ORDER_MATCHING_MAX_RETRY');

export const SYNC_ORDER_MATCHING_FINISH = actionFactory<{
  code: string;
  type: OrderMatchingType;
}>('SYNC_ORDER_MATCHING_FINISH');

export const SYNC_ORDER_MATCHING_LOAD_PAGE = actionFactory<{
  code: string;
  type: OrderMatchingType;
  page?: number;
  data?: {
    headIndex: number;
  };
}>('SYNC_ORDER_MATCHING_LOAD_PAGE');

export const SYNC_ORDER_MATCHING_LOAD_PAGE_AFTER = actionFactory<{
  code: string;
  type: OrderMatchingType;
  page: number;
  data: any;
}>('SYNC_ORDER_MATCHING_LOAD_PAGE_AFTER');

export const ORDER_MATCHING_LOAD_LAST_PAGE = actionFactory<{
  code: string;
  type: OrderMatchingType;
  page: number;
}>('ORDER_MATCHING_LOAD_LAST_PAGE');

export const ORDER_MATCHING_NO_TRANSACTION = actionFactory<{
  code: string;
  type: OrderMatchingType;
  data: any;
}>('ORDER_MATCHING_NO_TRANSACTION');

export const SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR = actionFactory<{
  code: string;
  type: OrderMatchingType;
  page?: number;
  error: any;
}>('SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR');

export const ORDER_MATCHING_SAVE_SUCCESS = actionFactory<{
  code: string;
  type: OrderMatchingType;
  page: number;
  data: {
    headIndex: number;
  };
}>('ORDER_MATCHING_SAVE_SUCCESS');
export const ORDER_MATCHING_SAVE_ERROR = actionFactory<{
  code: string;
  type: OrderMatchingType;
  error: any;
}>('ORDER_MATCHING_SAVE_ERROR');
