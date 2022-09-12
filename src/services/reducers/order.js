import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
} from "../action-types";

const orderState = {
    order: {
        number: null,
    },
    orderRequest: false,
    orderError: false,
};

export const orderNumberReducer = (state = orderState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                orderLoading: true,
                orderRequest: false,
            };
        }
        case CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                orderLoading: false,
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
                orderLoading: false,
            };
        }
        default:
            return state;
    }
};
