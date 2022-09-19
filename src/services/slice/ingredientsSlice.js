import { createSlice } from "@reduxjs/toolkit";

//

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		ingredientsRequest(state) {
			state.ingredientsRequest = true;
		 },
		ingredientsSuccessed(state, action) {
			state.ingredientsRequest = false;
			state.ingredients = action.payload;
			state.ingredientsFailed = false;
		 },
		ingredientsFailed(state) {
			state.ingredientsFailed = true;
		}
	}
	
})

export const { ingredientsRequest, ingredientsSuccessed, ingredientsFailed } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;