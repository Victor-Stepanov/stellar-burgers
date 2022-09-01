import Api from '../../utils/api';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';


export const getIngredients = () => (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    })
    Api
        .getIngredientsDataFromServer()
        .then(res => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: res.data
            });
        })
        .catch(_ => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })

}