import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_ORDERS,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_GET_ORDERS,
  WS_AUTH_SEND_ORDERS
} from "../services/action-types";

const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const obj = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

//Получение всех заказов
const wsUrlAllOrders = "wss://norma.nomoreparties.space/orders/all";

//Получение опредленного заказа
const wsUrlUserOrders = "wss://norma.nomoreparties.space/orders";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

 const wsActionsAuth = {
  wsInitWithToken: WS_AUTH_CONNECTION_START,
  wsSendMessage: WS_AUTH_SEND_ORDERS,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_AUTH_GET_ORDERS,
};

export { config, wsUrlAllOrders, wsUrlUserOrders,wsActions, wsActionsAuth };
