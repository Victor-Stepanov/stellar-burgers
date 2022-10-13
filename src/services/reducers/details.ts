import {
	GET_DETAILS_INGRIDIENT,
	RESET_DETAILS_INGRIDIENT,
} from "../action-types";
import { TDetailsActions } from "../actions";
import { TIngrediens } from "../types/data";

type TInitialState = {
	ingridientDetails: TIngrediens | {};
};

const initialState: TInitialState = {
	ingridientDetails: {},
};

export const detailsIngrideientReducer = (
	state = initialState,
	action: TDetailsActions
): TInitialState => {
	switch (action.type) {
		case GET_DETAILS_INGRIDIENT: {
			return {
				...state,
				ingridientDetails: action.item,
			};
		}
		case RESET_DETAILS_INGRIDIENT: {
			return {
				...state,
				ingridientDetails: {},
			};
		}
		default:
			return state;
	}
};
