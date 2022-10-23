
import { configureStore } from "@reduxjs/toolkit";
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
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(
      socketMiddleware(wsUrlAllOrders, wsActions),
      socketMiddleware(wsUrlUserOrders, wsActionsAuth)
  )
})