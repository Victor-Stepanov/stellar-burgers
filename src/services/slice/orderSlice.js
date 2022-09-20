import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/utils";
import { config } from "../../utils/const";

export const getOrder = createAsyncThunk(
	'order/getOrder',
	async function (id, { rejectWithValue }) {
		try {
			const responce = await fetch(`${config.baseUrl}/orders`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + getCookie("token"),
				},
				body: JSON.stringify({
					ingredients: id,
				}),
			})
			if (!responce.ok) {
				throw new Error('An error occurred while receiving the order number');
			}
			const { order } = await responce.json();
			return order;

		} catch (error) {
			return rejectWithValue(error.message);

		}
	}
)
const initialState = {
	order: {
		number: null,
	},
	orderRequest: false,
	orderError: null,
}
const orderNumberSlice = createSlice({
	name: 'order',
	initialState,
	extraReducers: {
		[getOrder.pending]: (state) => {
			state.orderRequest = true;
		},
		[getOrder.fulfilled]: (state, action) => {
			state.orderRequest = false;
			state.order = action.payload;
			state.orderError = null;
		},
		[getOrder.rejected]: (state, action) => {
			state.orderRequest = false;
			state.orderError = action.payload;
		}
	}
})

export default orderNumberSlice.reducer;