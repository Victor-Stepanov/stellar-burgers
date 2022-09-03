import { GET_DETAILS_INGRIDIENT, RESET_DETAILS_INGRIDIENT } from '../action-types';

const initialState = {
	ingridientDetails: {}
}

export const detailsIngrideientReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DETAILS_INGRIDIENT: {
			return {
				...state,
				ingridientDetails: action.item

			}
		}
		case RESET_DETAILS_INGRIDIENT: {
			return {
				...state,
				ingridientDetails:{}
			}
		}
		default:
			return state;

	}
}
