import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, getCookie } from "../../utils/utils";
import { config } from "../../utils/const";

export const sendUserData = createAsyncThunk(
	"user/sendUserData",
	async function (form, { rejectWithValue }) {
		try {
			const responce = await fetch(`${config.baseUrl}/auth/register`, {
				method: "POST",
				headers: config.headers,
				body: JSON.stringify(form),
			});

			if (!responce.ok) {
				throw new Error("An error occurred during user registration");
			}

			const data = await responce.json();
			return data;
			
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const sendLoginData = createAsyncThunk(
	"user/sendLoginData",
	async function (form, { rejectWithValue }) {
		try {
			const responce = await fetch(`${config.baseUrl}/auth/login`, {
				method: "POST",
				headers: config.headers,
				body: JSON.stringify(form),
			});
			if (!responce.ok) {
				throw new Error("An error occurred during authorization");
			}
			const data = await responce.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const sendLogoutData = createAsyncThunk(
	"user/sendLogoutData",
	async function (_, { rejectWithValue }) {
		try {
			const responce = await fetch(`${config.baseUrl}/auth/logout`, {
				method: "POST",
				headers: config.headers,
				body: JSON.stringify({
					token: localStorage.getItem("refreshToken"),
				}),
			});
			if (!responce.ok) {
				throw new Error("An error occurred during deauthorization");
			}
			const data = await responce.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const sendEmailResetValue = createAsyncThunk(
	"user/sendEmailResetValue",
	async function (form, { rejectWithValue }) {
		try {
			const responce = await fetch(`${config.baseUrl}/password-reset`, {
				method: "POST",
				headers: config.headers,
				body: JSON.stringify(form),
			});
			if (!responce.ok) {
				throw new Error("An error occurred while restoring the password");
			}
			const data = await responce.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const sendNewPassword = createAsyncThunk(
	"user/sendNewPassword",
	async function (form, { rejectWithValue }) {
		try {
			const responce = await fetch(`${config.baseUrl}/password-reset/reset`, {
				method: "POST",
				headers: config.headers,
				body: JSON.stringify(form),
			});
			if (!responce.ok) {
				throw new Error("An error occurred while restoring the password");
			}
			const data = await responce.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const sendUpdateUserData = createAsyncThunk(
	"user/sendUpdateUserData",
	async function (form, { rejectWithValue }) {
		try {
			const responce = await fetch(`${config.baseUrl}/auth/user`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + getCookie("token"),
				},
				body: JSON.stringify(form),
			});
			if (!responce.ok) {
				throw new Error("An error occurred while updating user data");
			}
			const data = await responce.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const sendUpdateToken = createAsyncThunk(
	"user/sendUpdateToken",
	async function (_, { rejectWithValue }) {
		try {
			const responce = await fetch(`${config.baseUrl}/auth/token`, {
				method: "POST",
				headers: config.headers,
				body: JSON.stringify({
					token: localStorage.getItem("refreshToken"),
				}),
			});
			if (!responce.ok) {
				throw new Error("An error occurred while updating the token");
			}
			const data = await responce.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const getUserInfo = createAsyncThunk(
	"user/getUserInfo",
	async function (_, { rejectWithValue }) {
		try {
			const responce = await fetch(`${config.baseUrl}/auth/user`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + getCookie("token"),
				},
			});
			if (!responce.ok) {
				throw new Error("An error occurred while receiving user data");
			}
			const data = await responce.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
const initialState = {
	user: null,
	userRequest: false,
	userError: null,

	loginRequest: false,
	loginFailed: null,

	logoutRequest: false,
	logoutSuccess: false,
	logoutFailed: null,

	forgoutRequest: false,
	forgoutSuccess: false,
	forgoutFailed: null,

	resetRequest: false,
	resetSuccess: false,
	resetFailed: null,

	userInfoRequest: false,
	userInfoSuccess: false,
	userInfoFailed: null,

	tokenRequest: false,
	tokenSuccess: false,
	tokenFailed: null,

	userUpdateRequest: false,
	userUpdateSuccess: false,
	userUpdateFailed: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	extraReducers: {
		[sendUserData.pending]: (state) => {
			state.userRequest = true;
			state.userError = null;
		},
		[sendUserData.fulfilled]: (state, action) => {
			const { accessToken, refreshToken, user } = action.payload;
			const authToken = accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			localStorage.setItem("refreshToken", refreshToken);
			state.userRequest = false;
			state.user = user;
		},
		[sendUserData.rejected]: (state, action) => {
			state.userRequest = false;
			state.userError = action.payload;
		},
		[sendLoginData.pending]: (state) => {
			state.loginRequest = true;
			state.loginFailed = null;
		},
		[sendLoginData.fulfilled]: (state, action) => {
			const { accessToken, refreshToken, user } = action.payload;
			const authToken = accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			localStorage.setItem("refreshToken", refreshToken);
			state.user = user;
		},
		[sendLoginData.rejected]: (state, action) => {
			state.loginRequest = false;
			state.loginFailed = action.payload;
		},
		[sendLogoutData.pending]: (state) => {
			state.logoutRequest = true;
			state.logoutFailed = null;
		},
		[sendLogoutData.fulfilled]: (state) => {
			localStorage.removeItem("refreshToken"); //проверить работает ли
			deleteCookie("token");
			state.logoutRequest = false;
			state.logoutSuccess = true;
			state.logoutFailed = null;
			state.user = null;
		},
		[sendLogoutData.rejected]: (state, action) => {
			state.logoutRequest = false;
			state.logoutSuccess = false;
			state.logoutFailed = action.payload;
		},
		[sendEmailResetValue.pending]: (state) => {
			state.forgoutRequest = true;
			state.forgoutFailed = null;
		},
		[sendEmailResetValue.fulfilled]: (state) => {
			state.forgoutRequest = false;
			state.forgoutSuccess = true;
			state.forgoutFailed = null;
		},
		[sendEmailResetValue.rejected]: (state, action) => {
			state.forgoutRequest = false;
			state.forgoutSuccess = false;
			state.forgoutFailed = action.payload;
		},
		[sendNewPassword.pending]: (state) => {
			state.resetRequest = true;
			state.resetSuccess = false;
			state.resetFailed = null;
		},
		[sendNewPassword.fulfilled]: (state) => {
			state.resetRequest = false;
			state.resetSuccess = true;
			state.resetFailed = null;
		},
		[sendNewPassword.rejected]: (state, action) => {
			state.resetRequest = false;
			state.resetSuccess = true;
			state.resetFailed = action.payload;
		},
		[sendUpdateUserData.pending]: (state) => {
			state.userUpdateRequest = true;
			state.userUpdateFailed = null;
		},
		[sendUpdateUserData.fulfilled]: (state, action) => {
			const { user } = action.payload;
			state.userUpdateRequest = false;
			state.userUpdateSuccess = true;
			state.user = user;
			state.userUpdateFailed = null;
		},
		[sendUpdateUserData.rejected]: (state, action) => {
			state.userUpdateRequest = false;
			state.userUpdateSuccess = false;
			state.userUpdateFailed = action.payload;
		},
		[sendUpdateToken.pending]: (state) => {
			state.tokenRequest = true;
			state.tokenFailed = null;
		},
		[sendUpdateToken.fulfilled]: (state, action) => {
			const { accessToken, refreshToken } = action.payload;
			const authToken = accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			localStorage.setItem("refreshToken", refreshToken);
			state.tokenRequest = false;
			state.tokenSuccess = true;
			state.tokenFailed = false;
		},
		[sendUpdateToken.rejected]: (state, action) => {
			state.tokenRequest = false;
			state.tokenSuccess = false;
			state.tokenFailed = action.payload;
		},
		[getUserInfo.pending]: (state) => {
			state.userInfoRequest = true;
			state.userInfoFailed = null;
		},
		[getUserInfo.fulfilled]: (state, action) => {
			const { user } = action.payload;
			state.userInfoSuccess = true;
			state.user = user;
			state.userInfoRequest = false;
			state.userInfoFailed = null;
		},
		[getUserInfo.rejected]: (state, action) => {
			state.userInfoSuccess = false;
			state.userInfoRequest = false;
			state.userInfoFailed = action.payload;
		},
	},
});

export default userSlice.reducer;
