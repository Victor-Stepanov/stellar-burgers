import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients'
import {orderNumberReducer} from './order'
import {constructorReducer} from './constructor'


export const rootReducer = combineReducers({
    ingredientsData: ingredientsReducer,
    orderNumber: orderNumberReducer,
    constructorData:constructorReducer
})