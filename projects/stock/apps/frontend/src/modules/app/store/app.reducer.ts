import type { ApiResponseDto } from '@src/modules/app/dto/api-response.dto';
import { appInitialState } from '@src/modules/app/store/app.state';
import type { PayloadAction } from '@stock/packages-redux';
import { createSlice } from '@stock/packages-redux';

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    fetchApiError: (state, action: PayloadAction<ApiResponseDto>) => {
      console.error(`fetchApiError path: '${action?.payload?.path}'`);
      return state;
    },
  },
});
