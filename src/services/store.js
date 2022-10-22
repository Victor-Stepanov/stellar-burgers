import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware";
import { rootReducer } from "./slice";
import {
    wsUrlAllOrders,
    wsUrlUserOrders,
    wsActions,
    wsActionsAuth,
} from "../utils/const";


export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk,
        socketMiddleware(wsUrlAllOrders, wsActions),
        socketMiddleware(wsUrlUserOrders, wsActionsAuth)]
})
