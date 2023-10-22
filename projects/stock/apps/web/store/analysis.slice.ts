import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import type { IRootState } from '@/store/index';
import { fetchJsonData } from '@/util/fetchJsonData';
import { showMessage } from '@/util/showMessage';
import { SYMBOL_CACHE_KEY } from '@/value/analysis.value';

const initialState: {
    symbol: string;
    cors: any[];
    fromDate: string;
    toDate: string;
    prices: any[];
    ticks: any[];
    filterTradeValue: number; // Trade value for each lenh mua hoac ban
    analysis: any[];
} = {
    symbol: '',
    fromDate: moment().utc().subtract(10, 'days').format('YYYY-MM-DD'),
    toDate: moment().utc().format('YYYY-MM-DD'),
    cors: [],
    prices: [],
    ticks: [],
    filterTradeValue: 0,
    analysis: [],
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
    },
    extraReducers: (builder) => {
        builder.addCase(thunkActions.getCors.fulfilled, (state, action) => {
            // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
            // action.payload chứa dữ liệu trả về từ API
            state.cors = action.payload.data;

            return state;
        });
        builder.addCase(
            thunkActions.getSymbolPrices.fulfilled,
            (state, action) => {
                // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
                // action.payload chứa dữ liệu trả về từ API
                state.prices = action.payload.prices;

                return state;
            },
        );
        builder.addCase(
            thunkActions.getSymbolTicks.fulfilled,
            (state, action) => {
                // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
                // action.payload chứa dữ liệu trả về từ API
                state.ticks = action.payload.ticks;

                return state;
            },
        );
        builder.addCase(thunkActions.getAnalysis.fulfilled, (state, action) => {
            // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
            // action.payload chứa dữ liệu trả về từ API
            state.analysis = action.payload.analysis;

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
};

export const analysisActions = {
    ...analysisSlice.actions,
    ...thunkActions,
};

export default analysisSlice.reducer;
