import type { IRootState } from '@src/store/index';
import { fetchJsonData } from '@src/util/fetchJsonData';
import { showMessage } from '@src/util/showMessage';
import { SYMBOL_CACHE_KEY } from '@src/value/analysis.value';
import { createAsyncThunk, createSlice } from '@stock/packages-redux';
import moment from 'moment';

const initialState: {
  symbol: string;
  cors: any[];
  fromDate: string;
  toDate: string;
  prices: any[];
  ticks: any[];
  filterTradeValue: number; // Trade value for each lenh mua hoac ban
  capFilter: number;
  analysis: any[];
  hullma_intra_day?: {
    fromDate: string;
    toDate: string;
    hullma5?: any[];
    hullma15?: any[];
    hullma30?: any[];
  };
} = {
  symbol: '',
  fromDate: moment().utc().subtract(10, 'days').format('YYYY-MM-DD'),
  toDate: moment().utc().format('YYYY-MM-DD'),
  cors: [],
  prices: [],
  ticks: [],
  filterTradeValue: 0,
  capFilter: 0,
  analysis: [],
  hullma_intra_day: undefined,
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(thunkActions.getCors.fulfilled, (state, action) => {
      // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
      // action.payload chứa dữ liệu trả về từ API
      state.cors = action.payload.data;

      return state;
    });
    builder.addCase(thunkActions.getSymbolPrices.fulfilled, (state, action) => {
      // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
      // action.payload chứa dữ liệu trả về từ API
      state.prices = action.payload.prices;

      return state;
    });
    builder.addCase(thunkActions.getSymbolTicks.fulfilled, (state, action) => {
      // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
      // action.payload chứa dữ liệu trả về từ API
      state.ticks = action.payload.ticks;

      return state;
    });
    builder.addCase(thunkActions.getAnalysis.fulfilled, (state, action) => {
      // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
      // action.payload chứa dữ liệu trả về từ API
      state.analysis = action.payload.analysis;

      return state;
    });

    builder.addCase(thunkActions.getHullma5.fulfilled, (state, action) => {
      // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
      // action.payload chứa dữ liệu trả về từ API
      state.hullma_intra_day!.hullma5 = action.payload.hullma_intra_day;

      return state;
    });
    builder.addCase(thunkActions.getHullma15.fulfilled, (state, action) => {
      // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
      // action.payload chứa dữ liệu trả về từ API
      state.hullma_intra_day!.hullma15 = action.payload.hullma_intra_day;

      return state;
    });
    builder.addCase(thunkActions.getHullma30.fulfilled, (state, action) => {
      // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
      // action.payload chứa dữ liệu trả về từ API
      state.hullma_intra_day!.hullma30 = action.payload.hullma_intra_day;

      return state;
    });
  },
});

const thunkActions = {
  getCors: createAsyncThunk('analysis/getCors', async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_DEFAULT_URL}/cor/get-all`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Trả về dữ liệu từ API
      return { data };
    } catch (error) {
      showMessage('getCors: Network response was not ok', 'error');
      throw error;
    }
  }),
  getSymbolPrices: createAsyncThunk(
    'analysis/getSymbolPrices',
    async (arg, { getState }) => {
      // @ts-ignore
      const state: IRootState = getState();
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_DEFAULT_URL}/stock-price/history?code=${state.analysis.symbol}&from=${state.analysis.fromDate}&to=${state.analysis.toDate}`;

      const data = await fetchJsonData(url);

      return {
        prices: data.data,
      };
    },
  ),
  getSymbolTicks: createAsyncThunk(
    'analysis/getSymbolTicks',
    async (arg, { getState }) => {
      // @ts-ignore
      const state: IRootState = getState();
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_DEFAULT_URL}/tick/histories?symbol=${state.analysis.symbol}&from=${state.analysis.fromDate}&to=${state.analysis.toDate}`;

      const data = await fetchJsonData(url);

      return {
        ticks: data.data,
      };
    },
  ),
  getAnalysis: createAsyncThunk('analysis/analysis', async () => {
    // @ts-ignore
    const url = `${process.env.NEXT_PUBLIC_ENDPOINT_DEFAULT_URL}/stock-trading/analysis`;

    const data = await fetchJsonData(url);

    return {
      analysis: data.data,
    };
  }),

  getHullma5: createAsyncThunk(
    'analysis/hullma5',
    async (arg, { getState }) => {
      // @ts-ignore
      const state: IRootState = getState();
      const symbol = state.analysis.symbol;
      const { fromDate, toDate } = state.analysis.hullma_intra_day!;
      // @ts-ignore
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_METASTOCK_URL}/stock-trading/analysis/hullma-intra-day?symbol=${symbol}&resolution=5&from_date=${fromDate}&to_date=${toDate}`;

      const data: any = await fetchJsonData(url);

      if (!data.data.success) {
        throw new Error('Network response was not ok');
      }
      return {
        hullma_intra_day: data.data.data.grouped_ticks,
      };
    },
  ),

  getHullma15: createAsyncThunk(
    'analysis/hullma15',
    async (arg, { getState }) => {
      // @ts-ignore
      const state: IRootState = getState();
      const symbol = state.analysis.symbol;
      const { fromDate, toDate } = state.analysis.hullma_intra_day!;
      // @ts-ignore
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_METASTOCK_URL}/stock-trading/analysis/hullma-intra-day?symbol=${symbol}&resolution=15&from_date=${fromDate}&to_date=${toDate}`;

      const data: any = await fetchJsonData(url);

      if (!data.data.success) {
        throw new Error('Network response was not ok');
      }
      return {
        hullma_intra_day: data.data.data.grouped_ticks,
      };
    },
  ),

  getHullma30: createAsyncThunk(
    'analysis/hullma30',
    async (arg, { getState }) => {
      // @ts-ignore
      const state: IRootState = getState();
      const symbol = state.analysis.symbol;
      const { fromDate, toDate } = state.analysis.hullma_intra_day!;
      // @ts-ignore
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_METASTOCK_URL}/stock-trading/analysis/hullma-intra-day?symbol=${symbol}&resolution=30&from_date=${fromDate}&to_date=${toDate}`;

      const data: any = await fetchJsonData(url);

      if (!data.data.success) {
        throw new Error('Network response was not ok');
      }
      return {
        hullma_intra_day: data.data.data.grouped_ticks,
      };
    },
  ),
};

export const analysisActions = {
  ...analysisSlice.actions,
  ...thunkActions,
};

export default analysisSlice.reducer;
