import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'APP';
const INCREASE_COUNT = 'INCREASE_COUNT';
export const increaseCount = createAction<{ number: number }>(INCREASE_COUNT);

const DECREASE_COUNT = 'DECREASE_COUNT';
export const decreaseCount = createAction<{ number: number }>(DECREASE_COUNT);

const APP_RUN_TIME_ERROR = 'APP_RUN_TIME_ERROR';
export const appRunTimeError = createAction<{
  error: Error;
}>(APP_RUN_TIME_ERROR, PREFIX);

const APP_SHOW_ERROR_MESSAGES = 'APP_SHOW_ERROR_MESSAGE';
export const appShowErrorMessages = createAction<{
  messages: string;
}>(APP_SHOW_ERROR_MESSAGES);

const APP_SAVE_REFER_URL = 'APP_SAVE_REFER_URL';
export const appSaveReferUrl = createAction<{
  url?: any;
}>(APP_SAVE_REFER_URL);

const APP_CHECK_REFER_URL = 'APP_CHECK_REFER_URL';
export const appCheckReferUrl = createAction(APP_CHECK_REFER_URL);

const APP_HAS_REFER_URL = 'APP_HAS_REFER_URL';
export const appHasReferUrl = createAction<{
  url: any;
}>(APP_HAS_REFER_URL);
