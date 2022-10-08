import { ThunkAction } from "redux-thunk";
import { TIngrediensActions } from "../actions/ingredients";
import {TConstructorActions} from "../actions/constructor";
import {TOrdersActions} from '../actions/order';
import { Action, ActionCreator, Dispatch  } from "redux";
import { store } from "../store";

export type RootState = ReturnType<typeof store.getState>;
//Типизация всех экшенов приложения
type TApplicationActions = TIngrediensActions|TConstructorActions|TOrdersActions;

// Типизация thunk 
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

//Dispatch

export type AppDispatch = Dispatch<TApplicationActions>;