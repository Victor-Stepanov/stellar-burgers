import { ADD_ITEM, REMOVE_ITEM, MOVE_ITEM, RESET_ITEM } from "../action-types";
import { TConstructorActions } from "../actions";
import { TIngrediens } from "../types/data";
import update from "immutability-helper";

type TInitialState = {
    bun: TIngrediens | null;
    element: Array<TIngrediens> | [];
};
const initialConstructorState: TInitialState = {
    bun: null,
    element: [],
};

export const constructorReducer = (
    state = initialConstructorState,
    action: TConstructorActions
): TInitialState => {
    switch (action.type) {
        case ADD_ITEM: {
            if (action.payload.type === "bun") {
                return {
                    ...state,
                    bun: action.payload,
                };
            }
            return {
                ...state,
                element: [...state.element, action.payload],
            };
        }
        case REMOVE_ITEM: {
            return {
                ...state,
                element: [...state.element].filter((item) => item.id !== action.id),
            };
        }
        case MOVE_ITEM: {
            return {
                ...state,
                element: update(state.element, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, state.element[action.dragIndex]],
                    ],
                }),
            };
        }
        case RESET_ITEM: {
            return {
                ...state,
                bun: null,
                element: [],
            };
        }
        default:
            return state;
    }
};
