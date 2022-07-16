import { GET_DETAILS_INGRIDIENT, RESET_DETAILS_INGRIDIENT } from '../actions/details';

const initialState = {
	ingridientDetails:{}
}

export const detailsIngrideientReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DETAILS_INGRIDIENT: {
			return {
				...state,
				ingridientDetails:action.item

			}
		}
		case RESET_DETAILS_INGRIDIENT:{
			return {
				...state,
			}
		}
		default:
			return state;

	}
}
