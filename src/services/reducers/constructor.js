import {ADD_BUN, ADD_ITEM, REMOVE_ITEM, RESET_ITEM} from '../actions/constructor'


const initialConstructorState = {
    bun: null,
    ingredients: []
}


export const constructorReducer = (state = initialConstructorState, action) => {
    switch (action.type){
        case ADD_BUN: {
            return {
                ...state,
                bun: action.payload
            }
        }

        case ADD_ITEM:{
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        }
        case REMOVE_ITEM:{
            return {
                ...state,
                ingredients: [...state.ingredients].filter(item => item.id !== action.action.payload.id)
            }
        }
        case RESET_ITEM:{
            return {
                ...state,
                bun:null,
                ingredients: []
            }
        }
        default:
            return state;

    }
}