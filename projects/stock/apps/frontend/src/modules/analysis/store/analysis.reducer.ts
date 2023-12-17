import type { MarketSymbolCategory } from '@modules/analysis/types';
import type { ApiResponse } from '@modules/app/type/api-response';
import { analysisInitialState } from '@src/modules/analysis/store/analysis.state';
import {
  MARKET_TICK_SELECTED_CATEGORY_KEY,
  SYMBOL_CACHE_KEY,
} from '@src/value/analysis.value';
import type { PayloadAction } from '@stock/packages-redux';
import { createSlice } from '@stock/packages-redux';
import { filter } from 'lodash-es';

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
    loadTickIntraDay: (_, __: PayloadAction<{ symbol?: string }>) => undefined,
    refreshTickIntraDay: () => undefined,
    loadTickIntraDaySuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.tickIntraDay = action.payload.data;

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

    loadMarketCat: () => undefined,
    loadMarketCatSuccess: (state, action: PayloadAction<ApiResponse>) => {
      if (Array.isArray(action.payload.data)) {
        state.marketCategories = action.payload.data;
      }
    },
    selectMarketCat: (
      state,
      action: PayloadAction<{ cat: MarketSymbolCategory }>,
    ) => {
      // const isExist = find(
      //     state.marketCategories,
      //     (c) => c.key === action.payload.cat.key,
      // );
      // if (isExist && isExist.key !== state?.selectedMarketCat?.key) {
      //   state.selectedMarketCat = isExist;
      // }
      if (action.payload.cat?.key) {
        state.selectedMarketCat = action.payload.cat;
        localStorage.setItem(
          MARKET_TICK_SELECTED_CATEGORY_KEY,
          action.payload.cat.key,
        );
      }
    },
    toggleSelectedCatSymbol: (
      state,
      action: PayloadAction<{ symbol: string }>,
    ) => {
      if (state.selectedMarketCat) {
        if (
          state?.selectedMarketCat?.symbols.indexOf(action.payload.symbol) > -1
        ) {
          state.selectedMarketCat.symbols = filter(
            state?.selectedMarketCat?.symbols,
            (a) => a !== action.payload.symbol,
          );
        } else {
          state.selectedMarketCat.symbols.push(action.payload.symbol);
        }
      }
    },
    saveMarketCat: (
      state,
      action: PayloadAction<{ cat: MarketSymbolCategory }>,
    ) => {
      state.selectedMarketCat = action.payload.cat;
    },
    saveMarketCatSuccess: (_, __: PayloadAction<ApiResponse>) => {},
    setMarketFromDate: (state, action: PayloadAction<{ fromDate: string }>) => {
      state.marketFromDate = action.payload.fromDate;
    },
    setMarketToDate: (state, action: PayloadAction<{ toDate: string }>) => {
      state.marketToDate = action.payload.toDate;
    },

    /* ____________________________________ Load Market Ticks ____________________________________ */
    loadMarketTicks: () => undefined, // it is safe for call every time you want
    loadMarketSymbolTick: (_, __: PayloadAction<{ symbol: string }>) =>
      undefined, // not call directly from action dispatcher
    loadMarketSymbolTickSuccess: (
      _,
      __: PayloadAction<{ symbol: string; data: ApiResponse }>,
    ) => undefined,

    /* ____________________________________ Load Market Intra-day ____________________________________ */
    loadMarketIntraDayTicks: () => undefined, // it is safe for call every time you want
    loadMarketIntraDayTick: (_, __: PayloadAction<{ symbol: string }>) =>
      undefined, // not call directly from action dispatcher
    loadMarketIntraDayTickSuccess: (
      _,
      __: PayloadAction<{ symbol: string; data: ApiResponse }>,
    ) => undefined,
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
