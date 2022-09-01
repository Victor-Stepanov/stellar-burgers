import Api from '../../utils/api';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const getOrder = (id) => (dispatch) => {
    dispatch({
        type: CREATE_ORDER_REQUEST
    })
    Api
    .getOrderDataFromServer(id)
        .then(res => {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: res.order.number
            });
        })
        .catch(_ => {
            dispatch({
                type: CREATE_ORDER_FAILED
            })
        })
}