import { combineReducers } from "redux";
//import { ingredientsReducer } from "./ingredients";
import ingredientsSlice from "./ingredientsSlice";
import orderNumberSlice from "./orderSlice";
import constructorSlice from "./constructorSlice";
//import { orderNumberReducer } from "../reducers/order";
//import { constructorReducer } from "../reducers/constructor";
import { detailsIngrideientReducer } from "../reducers/details";
import { userReducer } from "../reducers/auth";
import { wsReducer } from "../reducers/wsReducer";

export const rootReducer = combineReducers({
    ingredientsData: ingredientsSlice,
    orderNumberData: orderNumberSlice,
    constructorData: constructorSlice,
    ingrideientData: detailsIngrideientReducer,
    userData: userReducer,
    ws: wsReducer,
});
