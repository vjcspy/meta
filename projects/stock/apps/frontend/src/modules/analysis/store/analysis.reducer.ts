import type { ApiResponse } from '@modules/app/type/api-response';
import { analysisInitialState } from '@src/modules/analysis/store/analysis.state';
import { SYMBOL_CACHE_KEY } from '@src/value/analysis.value';
import type { PayloadAction } from '@stock/packages-redux';
import { createSlice } from '@stock/packages-redux';
import { map, sortBy } from 'lodash';
import moment from 'moment/moment';

export const analysisSlice = createSlice({
  name: 'analysis',
  initialState: analysisInitialState,
  reducers: {
    /* ____________________________________ Load Cors ____________________________________*/
    loadCors: () => undefined,
    loadCorsSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.cors = action.payload.data.cors;

      return state;
    },

    /* ____________________________________ Load tick intra-day ____________________________________*/
    loadTickIntraDay: (_, __: PayloadAction<{ toDate?: string }>) => undefined,
    refreshTickIntraDay: () => undefined,
    loadTickIntraDaySuccess: (state, action: PayloadAction<ApiResponse>) => {
      const tickIntraDay = action.payload.data;
      if (Array.isArray(tickIntraDay['meta'])) {
        const date = moment(tickIntraDay['date']);
        tickIntraDay.meta = map(tickIntraDay.meta, (d) => {
          const timeString = d['time'];
          date.utc().set({
            hour: moment(timeString, 'HH:mm:ss').hour(),
            minute: moment(timeString, 'HH:mm:ss').minute(),
            second: moment(timeString, 'HH:mm:ss').second(),
          });
          return { ...d, ts: date.utc().unix() };
        });
        tickIntraDay.meta = sortBy(tickIntraDay.meta, (d) => -d.ts);
      }
      state.tickIntraDay = tickIntraDay;

      return state;
    },

    /* ____________________________________ load tick multiple days ____________________________________*/
    loadTicks: () => undefined,
    loadTicksSuccess: (state, action: PayloadAction<ApiResponse>) => {
      if (Array.isArray(action.payload.data)) {
        state.ticks = action.payload.data;
      }
    },

    /* ____________________________________ load price history ____________________________________*/
    loadPrices: () => undefined,
    loadPricesSuccess: (state, action: PayloadAction<ApiResponse>) => {
      if (Array.isArray(action.payload.data)) {
        state.prices = action.payload.data;
      }
    },

    /* ____________________________________ load analysis table data ____________________________________*/
    loadAnalysisTableData: () => undefined,
    loadAnalysisTableDataSuccess: (
      state,
      action: PayloadAction<ApiResponse>,
    ) => {
      if (Array.isArray(action.payload.data)) {
        state.analysisTableData = action.payload.data;
      }
    },

    /* ____________________________________ general ____________________________________ */
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
    setTradeValueFilter(state, action) {
      state.tradeValueFilter = action.payload?.tradeValueFilter;

      return state;
    },
    setCapFilter(state, action) {
      state.capFilter = action.payload?.capFilter;
    },
  },
});
