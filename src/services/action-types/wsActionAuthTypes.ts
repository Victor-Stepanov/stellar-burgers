import {TFeedResponce} from '../types/data';

export const WS_AUTH_CONNECTION_START:'WS_AUTH_CONNECTION_START' = "WS_AUTH_CONNECTION_START"; //для создания объекта класса WebSocket
export const WS_AUTH_CONNECTION_SUCCESS:'WS_AUTH_CONNECTION_SUCCESS' = "WS_AUTH_CONNECTION_SUCCESS"; //при успешном соединении
export const WS_AUTH_CONNECTION_ERROR:'WS_AUTH_CONNECTION_ERROR' = "WS_AUTH_CONNECTION_ERROR"; //в случае ошибки соединения
export const WS_AUTH_CONNECTION_CLOSED:'WS_AUTH_CONNECTION_CLOSED' = "WS_AUTH_CONNECTION_CLOSED"; //при закрытии соединения
export const WS_AUTH_GET_ORDERS:'WS_AUTH_GET_ORDERS' = "WS_AUTH_GET_ORDERS"; //при получении сообщения от сервера
export const WS_AUTH_SEND_ORDERS:'WS_AUTH_SEND_ORDERS' = "WS_AUTH_SEND_ORDERS";


