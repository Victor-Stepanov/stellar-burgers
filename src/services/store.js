import { compose, createStore, applyMiddleware } from "redux";
import { socketMiddleware } from "./middleware";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import {
    wsUrlAllOrders,
    wsUrlUserOrders,
    wsActions,
    wsActionsAuth,
} from "../utils/const";

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        socketMiddleware(wsUrlAllOrders, wsActions),
        socketMiddleware(wsUrlUserOrders, wsActionsAuth)
    )
);
export const store = createStore(rootReducer, enhancer);
