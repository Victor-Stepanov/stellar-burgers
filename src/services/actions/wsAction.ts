import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_ORDERS,
	WS_SEND_ORDERS,
} from "../action-types";
import { TFeedResponce } from "../types/data";

export type TWsActions =
	| IWsConnectionOpen
	| IWsConnectionSuccess
	| IWsConnectionError
	| IWsConnectionClosed
	| IWsGetOrders
	| IWsSendOrders;

interface IWsConnectionOpen {
	readonly type: typeof WS_CONNECTION_START;
}

interface IWsConnectionSuccess {
	readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWsConnectionError {
	readonly type: typeof WS_CONNECTION_ERROR;
}

interface IWsConnectionClosed {
	readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWsGetOrders {
	readonly type: typeof WS_GET_ORDERS;
	readonly payload: TFeedResponce;
}

interface IWsSendOrders {
	readonly type: typeof WS_SEND_ORDERS;
	readonly payload: TFeedResponce;
}

export const wsConnectionOpen = (): IWsConnectionOpen => {
	return {
		type: WS_CONNECTION_START,
	};
};

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
	return {
		type: WS_CONNECTION_SUCCESS,
	};
};

export const wsConnectionError = (): IWsConnectionError => {
	return {
		type: WS_CONNECTION_ERROR,
	};
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
	return {
		type: WS_CONNECTION_CLOSED,
	};
};

export const wsGetOrders = (order: TFeedResponce): IWsGetOrders => {
	return {
		type: WS_GET_ORDERS,
		payload: order,
	};
};

export const wsSendOrders = (order: TFeedResponce): IWsSendOrders => {
	return {
		type: WS_SEND_ORDERS,
		payload: order,
	};
};
