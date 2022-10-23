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


export const obj: { [key: string]: string } = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};


//Получение всех заказов
const wsUrlAllOrders: string = "wss://norma.nomoreparties.space/orders/all";

//Получение опредленного заказа
const wsUrlUserOrders: string = "wss://norma.nomoreparties.space/orders";

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


export interface IWsActions {
  wsInit?: "ws/wsConnectionOpen"
  wsInitWithToken?: "ws/wsAuthConnectionOpen";
  wsSendMessage: "ws/wsSendOrders" | "ws/wsAuthSendOrders";
  onOpen: "ws/wsConnectionSuccess" | "ws/wsAuthConnectionSuccess";
  onClose: "ws/wsConnectionClosed"| "ws/wsAuthConnectionClosed";
  onError: "ws/wsConnectionError" | "ws/wsAuthConnectionError";
  onMessage: "ws/wsGetOrders" | "ws/wsAuthGetOrders";
}

export { config, wsUrlAllOrders, wsUrlUserOrders, wsActions, wsActionsAuth };
