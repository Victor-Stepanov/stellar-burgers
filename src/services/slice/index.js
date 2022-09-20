import { combineReducers } from "redux";
import ingredientsSlice from "./ingredientsSlice";
import orderNumberSlice from "./orderSlice";
import constructorSlice from "./constructorSlice";
import userSlice from "./userSlice";
import { wsReducer } from "../reducers/wsReducer";

export const rootReducer = combineReducers({
    ingredientsData: ingredientsSlice,
    orderNumberData: orderNumberSlice,
    constructorData: constructorSlice,
    userData: userSlice,
    ws: wsReducer,
});
