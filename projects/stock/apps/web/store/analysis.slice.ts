import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { showMessage } from '@/util/showMessage';
import { SYMBOL_CACHE_KEY } from '@/value/analysis.value';

const initialState: {
    symbol: string;
    cors: any[];
} = {
    symbol: '',
    cors: [],
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
    },
    extraReducers: (builder) => {
        builder.addCase(thunkActions.getCors.fulfilled, (state, action) => {
            // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
            // action.payload chứa dữ liệu trả về từ API
            state.cors = action.payload.data;

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
};

export const analysisActions = {
    ...analysisSlice.actions,
    ...thunkActions,
};

export default analysisSlice.reducer;
