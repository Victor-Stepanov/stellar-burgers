import Api from "../../utils/api";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
} from "../action-types";

export const getOrder = (id) => (dispatch) => {
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
