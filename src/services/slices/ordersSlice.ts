import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

type TOrdersState = {
  data: TOrder[];
  isLoading: boolean;
  error: SerializedError | null;
  currentOrder: TOrder | null;
};

const initialState: TOrdersState = {
  data: [],
  isLoading: false,
  error: null,
  currentOrder: null
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () =>
  getOrdersApi()
);

export const orderBurger = createAsyncThunk(
  'orders/orderBurger',
  async (data: string[], { rejectWithValue }) => {
    try {
      const res = await orderBurgerApi(data);
      return res.order;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const res = await getOrderByNumberApi(number);
      return res.orders[0];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //get orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      //post order
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      //get order by number
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const { clearCurrentOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
