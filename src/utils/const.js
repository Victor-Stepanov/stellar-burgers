
import {
  wsConnectionOpen,
  wsAuthConnectionOpen,
  wsConnectionSuccess,
  wsAuthConnectionSuccess,
  wsConnectionError,
  wsAuthConnectionError,
  wsConnectionClosed,
  wsAuthConnectionClosed,
  wsGetOrders,
  wsAuthGetOrders,
  wsSendOrders,
  wsAuthSendOrders,
} from '../services/slice/wsSlice';

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
  wsInit: wsConnectionOpen,
  wsSendMessage: wsSendOrders,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetOrders,
};

const wsActionsAuth = {
  wsInitWithToken: wsAuthConnectionOpen,
  wsSendMessage: wsAuthSendOrders,
  onOpen: wsAuthConnectionSuccess,
  onClose: wsAuthConnectionClosed,
  onError: wsAuthConnectionError,
  onMessage: wsAuthGetOrders,
};

export { config, wsUrlAllOrders, wsUrlUserOrders, wsActions, wsActionsAuth };
