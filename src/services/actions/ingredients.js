import { getIngredientsDataFromServer } from '../../utils/api'
//Ingredients
//Actions для загрузки ингридиентов
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';


//
export const getIngredients = () => (dispatch) => {
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