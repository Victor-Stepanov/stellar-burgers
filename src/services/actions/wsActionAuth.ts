import { WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_SUCCESS, WS_AUTH_CONNECTION_ERROR, WS_AUTH_CONNECTION_CLOSED, WS_AUTH_GET_ORDERS, WS_AUTH_SEND_ORDERS } from "../action-types";
import { TFeedResponce } from "../types/data";

export type TWsAuthActions = IWsAuthConnectionOpen|IWsAuthConnectionSuccess|IWsAuthConnectionError|IWsAuthConnectionClosed|IWsAuthGetOrders|IWsAuthSendOrders;

interface IWsAuthConnectionOpen {
	readonly type:typeof WS_AUTH_CONNECTION_START;
}

interface IWsAuthConnectionSuccess {
	readonly type:typeof WS_AUTH_CONNECTION_SUCCESS;
}

interface IWsAuthConnectionError {
	readonly type:typeof WS_AUTH_CONNECTION_ERROR;
}

interface IWsAuthConnectionClosed {
	readonly type:typeof WS_AUTH_CONNECTION_CLOSED;
}

interface IWsAuthGetOrders {
	readonly type:typeof WS_AUTH_GET_ORDERS;
	readonly payload:TFeedResponce;
}

interface IWsAuthSendOrders{
	readonly type:typeof WS_AUTH_SEND_ORDERS;
	readonly payload:TFeedResponce;
}

export const wsAuthConnectionOpen = ():IWsAuthConnectionOpen => {
	return {
		type: WS_AUTH_CONNECTION_START,
	};
};

export const wsAuthConnectionSuccess = ():IWsAuthConnectionSuccess => {
	return {
		type: WS_AUTH_CONNECTION_SUCCESS,
	};
};

export const wsAuthConnectionError = ():IWsAuthConnectionError => {
	return {
		type: WS_AUTH_CONNECTION_ERROR,
	};
};

export const wsAuthConnectionClosed = ():IWsAuthConnectionClosed => {
	return {
		type: WS_AUTH_CONNECTION_CLOSED,
	};
};

export const wsAuthGetOrders = (order:TFeedResponce):IWsAuthGetOrders => {
	return {
		type: WS_AUTH_GET_ORDERS,
		payload: order,
	};
};

export const wsAuthSendOrders = (order:TFeedResponce):IWsAuthSendOrders => {
	return {
		type: WS_AUTH_SEND_ORDERS,
		payload: order,
	};
};