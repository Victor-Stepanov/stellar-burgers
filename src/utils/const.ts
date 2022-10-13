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
  WS_AUTH_SEND_ORDERS,
} from "../services/action-types";
import { TWebSocketActions } from "../services/types/data";

export type TConfig = {
  baseUrl:string;
  headers:{
    "Content-Type":string;
  }
}

const config:TConfig = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

type TFillings = {
  bun:string;
  sauce:string;
  main:string;
}

export const obj:TFillings = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

//Получение всех заказов
const wsUrlAllOrders:string = "wss://norma.nomoreparties.space/orders/all";

//Получение опредленного заказа
const wsUrlUserOrders:string = "wss://norma.nomoreparties.space/orders";

const wsActions:TWebSocketActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

const wsActionsAuth:TWebSocketActions = {
  wsInitWithToken: WS_AUTH_CONNECTION_START,
  wsSendMessage: WS_AUTH_SEND_ORDERS,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_AUTH_GET_ORDERS,
};

export { config, wsUrlAllOrders, wsUrlUserOrders, wsActions, wsActionsAuth };
