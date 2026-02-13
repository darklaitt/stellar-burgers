import { getFeedsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type TFeedsState = {
  data: TOrdersData;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: TFeedsState = {
  data: {
    orders: [],
    total: NaN,
    totalToday: NaN
  },
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('orders/fetchFeeds', async () =>
  getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default feedsSlice.reducer;
