export const GET_DETAILS_INGRIDIENT = 'GET_DETAILS_INGRIDIENT';
export const RESET_DETAILS_INGRIDIENT = 'RESET_DETAILS_INGRIDIENT';


export const addIngridientDeatails = (item) => {
	return {
		type: GET_DETAILS_INGRIDIENT,
		item
	}

}