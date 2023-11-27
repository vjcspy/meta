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
    loadCors: () => undefined,
    loadCorsSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.cors = action.payload.data.cors;

      return state;
    },
    loadTickIntraDay: (_, __: PayloadAction<{ toDate?: string }>) => undefined,
    loadTickIntraDaySuccess: (state, action: PayloadAction<ApiResponse>) => {
      const tickIntraDay = action.payload.data;
      if (Array.isArray(tickIntraDay['meta'])) {
        const date = moment().utc(tickIntraDay['date']);
        tickIntraDay.meta = map(tickIntraDay.meta, (d) => {
          const timeString = d['time'];
          date.set({
            hour: moment(timeString, 'HH:mm:ss').hour(),
            minute: moment(timeString, 'HH:mm:ss').minute(),
            second: moment(timeString, 'HH:mm:ss').second(),
          });
          return { ...d, ts: date.unix() };
        });
        tickIntraDay.meta = sortBy(tickIntraDay.meta, (d) => -d.tsz);
      }
      state.tickIntraDay = tickIntraDay;

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
