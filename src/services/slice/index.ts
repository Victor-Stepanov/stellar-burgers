import {combineReducers} from "redux";
import constructorSlice from "./constructorSlice";


export const rootReducer = combineReducers({
    constructorData: constructorSlice,
})