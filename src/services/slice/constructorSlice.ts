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
	reducers: {
		addItem(state, action) {
			if (action.payload.type === "bun") {
				return {
					...state,
					bun: action.payload,
				};
			}
			return {
				...state,
				element: [...state.element, action.payload],
			};
		},
		removeItem(state, action) {
			state.element = state.element.filter(
				(item) => item.id !== action.payload
			);
		},
		moveItem(state, action) {
			state.element = update(state.element, {
				$splice: [
					[action.payload.dragIndex, 1],
					[
						action.payload.hoverIndex,
						0,
						state.element[action.payload.dragIndex],
					],
				],
			});
		},
		resetItem(state) {
			state.bun = null;
			state.element = [];
		},
	},
})

export const { addItem, removeItem, moveItem, resetItem } =
    constructorSlice.actions;
export default constructorSlice.reducer;