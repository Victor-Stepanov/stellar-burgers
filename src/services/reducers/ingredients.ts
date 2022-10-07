import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from "../action-types";
import { TIngrediensActions } from "../actions/ingredients";

import {TIngrediens} from '../types/data';

//
type TInitialState = {
    ingredients:ReadonlyArray<TIngrediens>;
    ingredientsRequest:boolean;
    ingredientsFailed:boolean;
}
const initialState:TInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};
//
export const ingredientsReducer = (state = initialState, action:TIngrediensActions):TInitialState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false,
            };
        }
        default: {
            return state;
        }
    }
};
