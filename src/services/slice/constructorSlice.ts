import {createSlice} from "@reduxjs/toolkit";
import update from "immutability-helper";
import {TIngrediens} from "../types/data";


type TInitialState = {
    bun: TIngrediens | null;
    element: Array<TIngrediens> | [];
};
const initialState: TInitialState = {
    bun: null,
    element: [],
};

const constructorSlice = createSlice({
    name:'constructor',
    initialState,
    reducers:{
        addItem(state, action){},
        removeItem(state, action){},
        moveItem(state, action){},
        resetItem(state){}

    }
})

export const { addItem, removeItem, moveItem, resetItem } =
    constructorSlice.actions;
export default constructorSlice.reducer;