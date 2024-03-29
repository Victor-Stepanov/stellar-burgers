import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_SUCCESS,
	WS_GET_ORDERS,
	WS_AUTH_CONNECTION_SUCCESS,
	WS_AUTH_CONNECTION_CLOSED,
	WS_AUTH_CONNECTION_ERROR,
	WS_AUTH_GET_ORDERS,
} from "../action-types";
import { TWsActions, TWsAuthActions } from "../actions";
import { TFeedResponce } from "../types/data";

type TInitialState = {
	wsConnected: boolean;
	orders: TFeedResponce["orders"];
	total: number | null;
	totalToday: number | null;
	wsUserConnected: boolean;
	userOrders: TFeedResponce["orders"];
};

const initialState: TInitialState = {
	wsConnected: false,
	orders: [],
	total: null,
	totalToday: null,

	wsUserConnected: false,
	userOrders: [],
};

export const wsReducer = (
	state = initialState,
	action: TWsActions | TWsAuthActions
): TInitialState => {
	switch (action.type) {
		case WS_CONNECTION_SUCCESS: {
			return {
				...state,
				wsConnected: true,
			};
		}
		case WS_AUTH_CONNECTION_SUCCESS: {
			return {
				...state,
				wsUserConnected: true,
			};
		}
		case WS_CONNECTION_CLOSED: {
			return {
				...state,
				wsConnected: false,
			};
		}
		case WS_AUTH_CONNECTION_CLOSED: {
			return {
				...state,
				wsUserConnected: false,
			};
		}
		case WS_CONNECTION_ERROR:
			return {
				...state,
				wsConnected: false,
			};
		case WS_AUTH_CONNECTION_ERROR: {
			return {
				...state,
				wsUserConnected: false,
			};
		}
		case WS_GET_ORDERS: {
			return {
				...state,
				orders: action.payload.orders,
				total: action.payload.total,
				totalToday: action.payload.totalToday,
			};
		}
		case WS_AUTH_GET_ORDERS: {
			return {
				...state,
				userOrders: action.payload.orders,
			};
		}
		default:
			return state;
	}
};
