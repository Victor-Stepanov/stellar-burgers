import {CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED} from '../actions/order';

const orderState = {
    orderNumber:[],
    orderNumberRequest: false,
    orderNumberFailed: false,
}

export const orderNumberReducer = (state = orderState, action) => {
    switch (action.type){
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                orderNumberRequest: true
            }
        }
        case CREATE_ORDER_SUCCESS:{
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderNumberRequest: false,
                orderNumberFailed: false
            }
        }
        case CREATE_ORDER_FAILED:{
            return {
                ...state,
                orderNumberRequest: false,
                orderNumberFailed: true
            }
        }
        default:
            return state;
    }
}