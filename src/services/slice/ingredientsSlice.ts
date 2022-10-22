import {TIngrediens} from "../types/data";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utils/api";

type TInitialState = {
    ingredients: ReadonlyArray<TIngrediens>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
};
const initialState: TInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    api.getIngredientsDataFromServer

)


const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.ingredientsRequest = true;
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.ingredientsRequest = false;
                state.ingredientsFailed = false;
                state.ingredients = data;
            })
            .addCase(getIngredients.rejected, (state) => {
                state.ingredientsRequest = false;
                state.ingredientsFailed = true;
            })

    }
})