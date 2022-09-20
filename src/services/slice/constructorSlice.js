import { createSlice } from "@reduxjs/toolkit";
import update from "immutability-helper";

const initialState = {
	bun: [],
    element: [],
}

const constructorSlice = createSlice({
	name: 'constructor',
	initialState,
	reducers: {
		addItem(state, action) {
			console.log(action.payload.type)
			if (action.payload.type === "bun") {
				if (state.bun) {
					state.bun = action.payload;
				}
			}
			else {
				state.element.push(action.payload);
			}
		},
		removeItem(state, action) {
			state.element = state.element.filter((item) => item.id !== action.payload);
		
		 },
		moveItem(state, action) {
			state.element = update(state.element, {
				$splice: [
					[action.payload.dragIndex, 1],
					[action.payload.hoverIndex, 0, state.element[action.payload.dragIndex]],
				],
			})
		},
		resetItem(state) {
			state.bun = [];
			state.element = [];
		}
		
	}
})

export const { addItem, removeItem, moveItem, resetItem } = constructorSlice.actions;
export default constructorSlice.reducer;