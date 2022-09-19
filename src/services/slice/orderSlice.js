import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	order: {
        number: null,
    },
    orderRequest: false,
    orderError: false,
}
const orderNumberSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		orderRequest(state) {
			state.orderRequest = true;
		},
		orderSuccessed(state, action) {
			state.orderRequest = false;
			state.order = action.payload;
			state.orderError = false;
		},
		orderError(state) {
			state.orderError = true;
		}
	}
})

export const { orderRequest, orderSuccessed, orderError } = orderNumberSlice.actions;
export default orderNumberSlice.reducer;