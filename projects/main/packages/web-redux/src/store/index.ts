import { createReducer } from '@reduxjs/toolkit';

import { createStoreManager } from '../util/createStoreManager';

export const storeManager = createStoreManager(
  {
    empty: createReducer({}, () => {}),
  },
  []
);
export const middleware = () => [];
