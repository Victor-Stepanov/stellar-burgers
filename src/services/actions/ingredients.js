import Api from "../../utils/api";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from "../action-types";

export const getIngredients = () => (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST,
    });
    Api.getIngredientsDataFromServer()
        .then((res) => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: res.data,
            });
        })
        .catch((_) => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
            });
        });
};
