import {TFeedResponce} from "./data";

type TInitialState = {
    status:string|null;
    wsConnected: boolean;
    orders: TFeedResponce["orders"];
    total: number | null;
    totalToday: number | null;
    wsUserConnected: boolean;
    userOrders: TFeedResponce["orders"];
};

export const initialState:TInitialState = {
    status:null,
    wsConnected: false,
    orders: [],
    total: null,
    totalToday: null,

    wsUserConnected: false,
    userOrders: [],
};