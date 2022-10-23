
import { rootReducer } from "../slice";
import {store} from "../store";

export type RootState = ReturnType<typeof rootReducer>;
//Типизация всех экшенов приложения


//Dispatch
export type  AppDispatch = typeof store.dispatch