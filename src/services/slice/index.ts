import { combineReducers } from "redux";
import ingredientsSlice from "./ingredientsSlice";
import orderNumberSlice from "./orderSLice"
import constructorSlice from "./constructorSlice";
import userSlice from "./userSlice";
import wsSlice from "./wsSlice";

export const rootReducer = combineReducers({
    ingredientsData: ingredientsSlice,
    orderNumberData: orderNumberSlice,
    constructorData: constructorSlice,
    userData: userSlice,
    ws: wsSlice,
});
