import { analysisInitialState } from '@src/modules/analysis/store/analysis.state';
import type { ApiResponseDto } from '@src/modules/app/dto/api-response.dto';
import { SYMBOL_CACHE_KEY } from '@src/value/analysis.value';
import type { PayloadAction } from '@stock/packages-redux';
import { createSlice } from '@stock/packages-redux';

export const analysisSlice = createSlice({
  name: 'analysis',
  initialState: analysisInitialState,
  reducers: {
    loadCors: () => undefined,
    loadCorsSuccess: (state, action: PayloadAction<ApiResponseDto>) => {
      state.cors = action.payload.data.cors;

      return state;
    },
    setSymbol(state, { payload }) {
      const { symbol } = payload;
      localStorage.setItem(SYMBOL_CACHE_KEY, symbol);
      state.symbol = symbol;
      return state;
    },
    setFromDate(state, action) {
      state.fromDate = action.payload.fromDate;

      return state;
    },
    setToDate(state, action) {
      state.toDate = action.payload.toDate;

      return state;
    },
    setFilterTradeValue(state, action) {
      state.filterTradeValue = action.payload?.filterTradeValue;

      return state;
    },
    setCapFilter(state, action) {
      state.capFilter = action.payload?.capFilter;
    },
    setHullmaDate(state, action) {
      const { fromDate, toDate } = action.payload;

      state.hullma_intra_day = {
        fromDate,
        toDate,
      };

      return state;
    },
  },
});
