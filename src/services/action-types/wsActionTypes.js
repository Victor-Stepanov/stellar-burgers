export const WS_CONNECTION_START = "WS_CONNECTION_START"; //для создания объекта класса WebSocket
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS"; //при успешном соединении
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR"; //в случае ошибки соединения
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED"; //при закрытии соединения
export const WS_GET_ORDERS = "WS_GET_ORDERS"; //при получении сообщения от сервера
export const WS_SEND_ORDERS = "WS_SEND_ORDERS";

export const wsConnectionOpen = () => {
	return {
		type: WS_CONNECTION_START,
	};
};

export const wsConnectionSuccess = () => {
	return {
		type: WS_CONNECTION_SUCCESS,
	};
};

export const wsConnectionError = () => {
	return {
		type: WS_CONNECTION_ERROR,
	};
};

export const wsConnectionClosed = () => {
	return {
		type: WS_CONNECTION_CLOSED,
	};
};

export const wsGetOrders = (order) => {
	return {
		type: WS_GET_ORDERS,
		payload: order,
	};
};

export const wsSendOrders = (order) => {
	return {
		type: WS_SEND_ORDERS,
		payload: order,
	};
};
