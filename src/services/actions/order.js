import {getOrderDataFromServer} from '../../utils/api'

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';


export const orderBurger = (orderData) => (dispatch) => {
    dispatch({
        type:CREATE_ORDER_REQUEST
    })
    getOrderDataFromServer()
        .then(res => {
            dispatch({
                type:CREATE_ORDER_SUCCESS,
                playload:res
            })
        })
        .catch(err => {
            dispatch({
                type:CREATE_ORDER_FAILED
            })
        })
}