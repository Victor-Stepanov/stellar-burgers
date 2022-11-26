import Api from "../../utils/api";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
} from "../action-types";
import { AppThunk, AppDispatch } from "../types/index";

interface ICreateOrderRequest {
    readonly type: typeof CREATE_ORDER_REQUEST;
}
interface ICreateOrderSuccess {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly payload: number;
}
interface ICreateOrderFailed {
    readonly type: typeof CREATE_ORDER_FAILED;
}

export type TOrdersActions =
    | ICreateOrderRequest
    | ICreateOrderSuccess
    | ICreateOrderFailed;

//getIngrediensAction

export const getOrder: AppThunk = (id: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: CREATE_ORDER_REQUEST,
    });
    Api.getOrderDataFromServer(id)
        .then((res) => {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: res.order.number,
            });
        })
        .catch((_) => {
            dispatch({
                type: CREATE_ORDER_FAILED,
            });
        });
};
