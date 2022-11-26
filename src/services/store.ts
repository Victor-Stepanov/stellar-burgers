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

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrlAllOrders, wsActions),
    socketMiddleware(wsUrlUserOrders, wsActionsAuth)
  )
);
export const store = createStore(rootReducer, enhancer);
