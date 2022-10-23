import { createSlice } from "@reduxjs/toolkit";
import {initialState} from "../types/wsTypes";


const wsSlice = createSlice({
    name: "ws",
    initialState,
    reducers: {
        wsConnectionOpen(state) {
            state.status = 'init';
        },
        wsAuthConnectionOpen(state) {
            state.status = 'init';
        },
        wsConnectionSuccess(state) {
            state.wsConnected = true;
            state.status = ''
        },
        wsAuthConnectionSuccess(state) {
            state.wsUserConnected = true;
            state.status = ''
        },
        wsConnectionError(state) {
            state.wsConnected = false;
        },
        wsAuthConnectionError(state) {
            state.wsUserConnected = false;
        },
        wsConnectionClosed(state) {
            state.wsConnected = false;
        },
        wsAuthConnectionClosed(state) {
            state.wsUserConnected = false;
        },
        wsGetOrders(state, action) {
            const { orders, total, totalToday } = action.payload;
            state.orders = orders;
            state.total = total;
            state.totalToday = totalToday;

        },
        wsAuthGetOrders(state, action) {
            const { orders } = action.payload;
            state.userOrders = orders;
        },
        wsSendOrders(state, action) {},
        wsAuthSendOrders(state, action) { },
    },
});

export const {
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
} = wsSlice.actions;

export default wsSlice.reducer;