import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderNumberReducer } from './order';
import { constructorReducer } from './constructor';
import { detailsIngrideientReducer } from './details';
import { userReducer } from './auth';


export const rootReducer = combineReducers({
    ingredientsData: ingredientsReducer,
    orderNumberData: orderNumberReducer,
    constructorData: constructorReducer,
    ingrideientData: detailsIngrideientReducer,
    userData:userReducer
})