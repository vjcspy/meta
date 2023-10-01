import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { showMessage } from '@/util/showMessage';

const initialState: {
    data: any[];
} = {
    data: [],
};

const alertPriceSlice = createSlice({
    name: 'alert_price',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(thunkActions.getAlerts.fulfilled, (state, action) => {
            // Xử lý dữ liệu sau khi lấy được thông tin từ API thành công
            // action.payload chứa dữ liệu trả về từ API
            state.data = action.payload.data;

            return state;
        });
    },
});

const thunkActions = {
    getAlerts: createAsyncThunk('alert_price/getAlerts', async () => {
        // eslint-disable-next-line no-useless-catch
        try {
            const url = `${process.env.NEXT_PUBLIC_ENDPOINT_DEFAULT_URL}/stock-trading/alerts`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Trả về dữ liệu từ API
            return { data };
        } catch (error) {
            showMessage('getAlerts: Network response was not ok', 'error');
            throw error;
        }
    }),
    upsertAlert: createAsyncThunk('alert_price/upsert', async (body: any) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const url = `${process.env.NEXT_PUBLIC_ENDPOINT_DEFAULT_URL}/stock-trading/alert`;
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', // Đặt loại dữ liệu bạn gửi
                    // Các tiêu đề khác nếu cần thiết, ví dụ: 'Authorization' cho xác thực.
                },
                body: JSON.stringify(body), // Chuyển đổi dữ liệu thành chuỗi JSON
            });

            if (!response.ok || response.status != 200) {
                showMessage('Network response was not ok', 'error');
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Trả về dữ liệu từ API
            return { data };
        } catch (error) {
            showMessage('upsertAlert: Network response was not ok', 'error');
            throw error;
        }
    }),
    deleteAlert: createAsyncThunk('alert_price/upsert', async (id: any) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const url = `${process.env.NEXT_PUBLIC_ENDPOINT_DEFAULT_URL}/stock-trading/alert/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // Đặt loại dữ liệu bạn gửi
                    // Các tiêu đề khác nếu cần thiết, ví dụ: 'Authorization' cho xác thực.
                },
            });

            if (!response.ok || response.status != 200) {
                showMessage('Network response was not ok', 'error');
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Trả về dữ liệu từ API
            return { data };
        } catch (error) {
            showMessage('deleteAlert: Network response was not ok', 'error');
            throw error;
        }
    }),
};

export const alertPriceActions = {
    ...alertPriceSlice.actions,
    ...thunkActions,
};

export default alertPriceSlice.reducer;
