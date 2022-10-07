import Api from "../../utils/api";
import { TIngrediens } from "../types/data";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from "../action-types";
import {AppThunk, AppDispatch} from '../types/index';
//Типизация экшенов
interface IGetIngrediensRequest {
    readonly type:typeof GET_INGREDIENTS_REQUEST;

}

interface IGetIngrediensSuccess {
    readonly type:typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngrediens>;
}

interface IGetIngrediensFailed {
    readonly type:typeof GET_INGREDIENTS_FAILED
}

// --------------------------------------------------------------
// Union
export type TIngrediensActions = IGetIngrediensRequest|IGetIngrediensSuccess|IGetIngrediensFailed;
// --------------------------------------------------------------

// Генераторы экшенов
const getIngrediensAction = ():IGetIngrediensRequest => ({
    type:GET_INGREDIENTS_REQUEST
})

const getIngrediensSuccessAction = (ingredients:ReadonlyArray<TIngrediens>):IGetIngrediensSuccess => ({
    type:GET_INGREDIENTS_SUCCESS,
    ingredients
})

const getIngrediensFailedAction = ():IGetIngrediensFailed => ({
    type:GET_INGREDIENTS_FAILED
})

export const getIngredients:AppThunk = () => (dispatch:AppDispatch) => {
    dispatch(getIngrediensAction());
    Api.getIngredientsDataFromServer()
        .then((res) => {
            dispatch(getIngrediensSuccessAction(res.data));
        })
        .catch((_) => {
            dispatch(getIngrediensFailedAction());
        });
};
