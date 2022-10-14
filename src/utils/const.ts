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
import { TWsActions, TWsAuthActions } from "../services/actions";

export type TConfig = {
  baseUrl: string;
  headers: {
    "Content-Type": string;
  };
};

const config: TConfig = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

type TFillings = {
  bun: string;
  sauce: string;
  main: string;
};

export const obj: TFillings = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

//Получение всех заказов
const wsUrlAllOrders: string = "wss://norma.nomoreparties.space/orders/all";

//Получение опредленного заказа
const wsUrlUserOrders: string = "wss://norma.nomoreparties.space/orders";

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

export interface IWsActions {
  wsInit?: typeof WS_CONNECTION_START;
  wsInitWithToken?: typeof WS_AUTH_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_ORDERS | typeof WS_AUTH_SEND_ORDERS;
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_AUTH_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_AUTH_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR | typeof WS_AUTH_CONNECTION_ERROR;
  onMessage: typeof WS_GET_ORDERS | typeof WS_AUTH_GET_ORDERS;
}

//export type TTypeGuardActions = TWsActions|TWsAuthActions;

export { config, wsUrlAllOrders, wsUrlUserOrders, wsActions, wsActionsAuth };



let onj = {
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere',
  search: '?some=search-string',
  hash: '#howdy',
  state: ''
}