import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";


export const getIngredients = createAsyncThunk(
	'ingredients/getIngredients',
	async () => api.getIngredientsDataFromServer()
)


const initialState = {
	ingredients: [],
	ingredientsRequest: false,
	ingredientsFailed: null,
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getIngredients.pending, (state) => {
				state.ingredientsRequest = true;
			})
			.addCase(getIngredients.fulfilled, (state, action) => {
				const { data } = action.payload;
				state.ingredientsRequest = false;
				state.ingredientsFailed = null;
				state.ingredients = data;
			})
			.addCase(getIngredients.rejected, (state) => {
				state.ingredientsRequest = false;
			})

	}

})

export default ingredientsSlice.reducer;