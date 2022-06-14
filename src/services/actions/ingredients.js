import { getIngredientsDataFromServer } from '../../utils/api'
//Ingredients
//Actions для загрузки ингридиентов
export const GET_INGREDIENTS_REQUEST = 'LOADING_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'ADD_INGRIDIENTS';
export const GET_INGREDIENTS_FAILED = 'ERORR_LOADING_INGREDIENTS';


//
export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        getIngredientsDataFromServer()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data
                    });
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }

            })
            .catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })

    }
}