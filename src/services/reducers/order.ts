import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
} from "../action-types";

import { TOrdersActions } from "../actions/order";

type TInitialState = {
    order: {
        number: number | null;
    };
    orderRequest: boolean;
    orderError: boolean;
};

const orderState: TInitialState = {
    order: {
        number: null,
    },
    orderRequest: false,
    orderError: false,
};

export const orderNumberReducer = (
    state = orderState,
    action: TOrdersActions
): TInitialState => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: false,
            };
        }
        case CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                orderError: false,
                order: {
                    ...state.order,
                    number: action.payload,
                },
            };
        }
        case CREATE_ORDER_FAILED: {
            return {
                ...state,
                orderError: true,
            };
        }
        default:
            return state;
    }
};
