import type { ApiResponse } from '@modules/app/type/api-response';
import { appInitialState } from '@src/modules/app/store/app.state';
import type { PayloadAction } from '@stock/packages-redux';
import { createSlice } from '@stock/packages-redux';

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    fetchApiError: (state, action: PayloadAction<ApiResponse>) => {
      console.error(`fetchApiError path: '${action?.payload?.path}'`);
      return state;
    },
  },
});
