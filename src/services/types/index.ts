import { ThunkAction } from "redux-thunk";
import { TIngrediensActions, TConstructorActions, TOrdersActions, TDetailsActions, TUserActions, TWsActions, TWsAuthActions} from "../actions";
import { Action, ActionCreator, Dispatch  } from "redux";

import { rootReducer } from "../reducers";

export type RootState = ReturnType<typeof rootReducer>;
//Типизация всех экшенов приложения
type TApplicationActions = TIngrediensActions|TConstructorActions|TOrdersActions|TDetailsActions|TUserActions|TWsActions|TWsAuthActions;

// Типизация thunk 
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

//Dispatch
export type AppDispatch = Dispatch<TApplicationActions>;