import Api from "../../utils/api";
import {
    ingredientsRequest,
    ingredientsSuccessed,
    ingredientsFailed,
} from "../slice/ingredientsSlice";

export const getIngredients = () => (dispatch) => {
    dispatch(ingredientsRequest());
    Api.getIngredientsDataFromServer()
        .then((response) => dispatch(ingredientsSuccessed(response.data)))
        .catch((_) => dispatch(ingredientsFailed()));
};
