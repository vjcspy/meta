import { AppState } from './app.state';

export const selectReferUrl = (state: { app: AppState }) =>
  state?.app?.referUrl;
