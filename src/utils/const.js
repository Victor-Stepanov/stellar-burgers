
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
  wsInit: "ws/wsConnectionOpen",
  wsSendMessage: "ws/wsSendOrders",
  onOpen: "ws/wsConnectionSuccess",
  onClose: "ws/wsConnectionClosed",
  onError: "ws/wsConnectionError",
  onMessage: "ws/wsGetOrders",
};

const wsActionsAuth = {
  wsInitWithToken: "ws/wsAuthConnectionOpen",
  wsSendMessage: "ws/wsAuthSendOrders",
  onOpen: "ws/wsAuthConnectionSuccess",
  onClose: "ws/wsAuthConnectionClosed",
  onError: "ws/wsAuthConnectionError",
  onMessage: "ws/wsAuthGetOrders",
};

export { config, wsUrlAllOrders, wsUrlUserOrders, wsActions, wsActionsAuth };
