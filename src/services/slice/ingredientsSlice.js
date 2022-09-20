import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../utils/const";


export const getIngredients = createAsyncThunk(
	'ingredients/getIngredients',
	async function (_, { rejectWithValue }) {
		try {
			const responce = await fetch(`${config.baseUrl}/ingredients`);
			if (!responce.ok) {
				throw new Error('Loadin error');
			}
			const {data} = await responce.json();
			return data;
		
		} catch (error) {
			return rejectWithValue(error.message);
			
		}
	}
)


const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: null,
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	extraReducers: {
		[getIngredients.pending]: (state) => {
			state.ingredientsRequest = true;
			
		},
		[getIngredients.fulfilled]: (state, action) => {
			state.ingredientsRequest = false;
			state.ingredientsFailed = null;
			state.ingredients = action.payload;
		},
		[getIngredients.rejected]: (state, action) => {
			state.ingredientsRequest = false;
			state.ingredientsFailed = action.payload;
		}
		
	}
	
})

export default ingredientsSlice.reducer;