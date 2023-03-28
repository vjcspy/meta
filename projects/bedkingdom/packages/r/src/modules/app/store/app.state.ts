export interface AppState {
  version: string;
  error?: any;
  count: number;

  referUrl?: any;
}

export const AppStateFactory: () => AppState = () => ({
  version: '1.0.0',
  error: null,
  count: 99,
});
