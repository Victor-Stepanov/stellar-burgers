import Api from "../../utils/api";
import { orderRequest, orderSuccessed, orderError } from "../slice/orderSlice";

export const getOrder = (id) => (dispatch) => {
    dispatch(orderRequest());
    Api.getOrderDataFromServer(id)
        .then((response) => dispatch(orderSuccessed(response.order)))
        .catch((_) => dispatch(orderError()));
};
