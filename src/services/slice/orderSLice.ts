import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getOrder = createAsyncThunk(
    'order/getOrder',
    (id:Array<string>|string) => api.getOrderDataFromServer(id)
)
type TInitialState = {
    order: {
        number: number | null;
    };
    orderRequest: boolean;
    orderError: boolean;
};

const initialState:TInitialState = {
    order: {
        number: null,
    },
    orderRequest: false,
    orderError: false,
}
const orderNumberSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.pending, state => {
                state.orderRequest = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                const { order } = action.payload;
                state.orderRequest = false;
                state.order = order;
                state.orderError = false;
            })
            .addCase(getOrder.rejected, state => {
                state.orderRequest = false;
                state.orderError = true;
            })
    }
})

export default orderNumberSlice.reducer;