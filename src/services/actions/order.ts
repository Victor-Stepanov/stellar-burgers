import Api from "../../utils/api";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
} from "../action-types";
import {AppThunk, AppDispatch} from '../types/index';

interface ICreateOrderRequest {
    readonly type:typeof CREATE_ORDER_REQUEST;
}
interface ICreateOrderSuccess {
    readonly type:typeof CREATE_ORDER_SUCCESS;
    readonly payload:number;
    
}
interface ICreateOrderFailed {
    readonly type:typeof CREATE_ORDER_FAILED;
}

export type TOrdersActions = ICreateOrderRequest|ICreateOrderSuccess|ICreateOrderFailed;

//getIngrediensAction

const createOrderRequestAction = ():ICreateOrderRequest => ({
    type:CREATE_ORDER_REQUEST
})

const createOrderSuccessAction = (orderNumber:number):ICreateOrderSuccess => ({
    type:CREATE_ORDER_SUCCESS,
    payload:orderNumber
})

const createOrderSuccessFailed = ():ICreateOrderFailed => ({
    type:CREATE_ORDER_FAILED
})

export const getOrder:AppThunk = (id:string) => (dispatch:AppDispatch) => {
    dispatch(createOrderRequestAction());
    Api.getOrderDataFromServer(id)
        .then((res) => dispatch(createOrderSuccessAction(res.order.number)))
        .catch((_) => dispatch(createOrderSuccessFailed()));
};
