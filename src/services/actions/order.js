import {getOrderDataFromServer} from '../../utils/api'

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const getOrder = (id) => (dispatch) => {
    dispatch({
        type:CREATE_ORDER_REQUEST
    })
    getOrderDataFromServer(id)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    payload: res.order.number
                });
            }

        })
        .catch(err => {
            dispatch({
                type:CREATE_ORDER_FAILED
            })
        })
}