import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	wsConnected: false,
	orders: [],
	total: null,
	totalToday: null,

	wsUserConnected: false,
	userOrders: [],
};

const wsSlice = createSlice({
	name: 'ws',
	
})