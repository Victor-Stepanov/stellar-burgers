import { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/utils";
import { AppDispatch, RootState } from "../types";
import { TWebSocketActions } from "../types/data";

export const socketMiddleware = (wsUrl:string, wsActions:TWebSocketActions):Middleware<{},RootState, AppDispatch> => {
	return (store:MiddlewareAPI) => {
		let socket:WebSocket|null = null;

		return next => action => {
			const { dispatch } = store;
			const { type, payload } = action;
			const token = getCookie('token');
			const { wsInit, wsInitWithToken, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

			if (type === wsInit) {
				socket = new WebSocket(wsUrl);
			}
			if (type === wsInitWithToken) {
				socket = new WebSocket(`${wsUrl}?token=${token}`)
			}

			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = event => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;

					dispatch({ type: onMessage, payload: restParsedData });
				};

				socket.onclose = event => {
					dispatch({ type: onClose, payload: event });
				};

				if (type === wsSendMessage) {
					const orders = { ...payload };
					socket.send(JSON.stringify(orders));
				}
			}

			next(action);
		};
	};
};