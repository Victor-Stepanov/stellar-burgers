import { ADD_ITEM, REMOVE_ITEM, MOVE_ITEM, RESET_ITEM } from "../action-types";

import update from 'immutability-helper';

const initialConstructorState = {
    bun: [],
    element: []
}


export const constructorReducer = (state = initialConstructorState, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            if (action.payload.type === "bun") {
                if (state.bun) {
                    return {
                        ...state,
                        bun: action.payload
                    };
                }
            }
            return {
                ...state,
                element: [...state.element, action.payload]
            }
        }
        case REMOVE_ITEM: {
            return {
                ...state,
                element: [...state.element].filter((item) => item.id !== action.id)

            }
        }
        case MOVE_ITEM: {
            return {
                ...state,
                element: update(state.element, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, state.element[action.dragIndex]]
                    ]
                })
            }
        }
        case RESET_ITEM: {
            return {
                ...state,
                bun: [],
                element: []
            }
        }
        default:
            return state;

    }
}