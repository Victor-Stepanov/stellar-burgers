import Api from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/utils";
import {
	USER_INFO_FAILED,
	USER_INFO_REQUEST,
	USER_INFO_SUCCESS,
	USER_LOGIN_FAILED,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT_FAILED,
	USER_LOGOUT_REQUEST,
	USER_LOGOUT_SUCCESS,
	USER_REGISTER_FAILED,
	USER_REGISTER_REQUEST,
	UPDATE_USER_FAILED,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	TOKEN_UPDATE_FAILED,
	TOKEN_UPDATE_REQUEST,
	TOKEN_UPDATE_SUCCESS,
	FORGOUT_PASSWORD_FAILED,
	FORGOUT_PASSWORD_REQUEST,
	FORGOUT_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	USER_REGISTER_SUCCESS,
} from "../action-types";

//Данные регистрации
export const sendUserData = (form) => (dispatch) => {
	dispatch({
		type: USER_REGISTER_REQUEST,
	});
	Api.sendUserDataToServer(form)
		.then((res) => {
			const authToken = res.accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken);
			dispatch({
				type: USER_REGISTER_SUCCESS,
				payload: res,
			});
		})
		.catch((err) => {
			console.error(err);
			dispatch({
				type: USER_REGISTER_FAILED,
			});
		});
};

//Данные авторизации
export const sendLoginData = (form) => (dispatch) => {
	dispatch({
		type: USER_LOGIN_REQUEST,
	});
	Api.sendLoginRequestToServer(form)
		.then((res) => {
			const authToken = res.accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken);
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: res,
			});
		})
		.catch((err) => {
			dispatch({
				type: USER_LOGIN_FAILED,
			});
		});
};

//Выход с учетной записи
export const sendLogoutData = () => (dispatch) => {
	dispatch({
		type: USER_LOGOUT_REQUEST,
	});
	Api.sendLogoutRequestToServer()
		.then((_) => {
			localStorage.removeItem("refreshToken");
			deleteCookie("token");
			dispatch({
				type: USER_LOGOUT_SUCCESS,
			});
		})
		.catch((err) => {
			console.error(err);
			dispatch({
				type: USER_LOGOUT_FAILED,
			});
		});
};

export const sendEmailResetValue = (form) => (dispatch) => {
	dispatch({
		type: FORGOUT_PASSWORD_REQUEST,
	});
	Api.sendForgoutPasswordRequest(form)
		.then((res) => {
			dispatch({
				type: FORGOUT_PASSWORD_SUCCESS,
				success: res.success,
			});
		})
		.catch((err) => {
			console.error(err);
			dispatch({
				type: FORGOUT_PASSWORD_FAILED,
			});
		});
};

export const sendUpdateUserData = (form) => (dispatch) => {
	dispatch({
		type: UPDATE_USER_REQUEST,
	});
	Api.sendUpdateProfileData(form)
		.then((res) => {
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: res,
			});
		})
		.catch((err) => {
			console.error(err);
			dispatch({
				type: UPDATE_USER_FAILED,
			});
		});
};

export const sendNewPassword = (form) => (dispatch) => {
	dispatch({
		type: RESET_PASSWORD_REQUEST,
	});
	Api.sendResetPasswordRequest(form)
		.then((res) => {
			dispatch({
				type: RESET_PASSWORD_SUCCESS,
				success: res.success,
			});
		})
		.catch((err) => {
			console.error(err);
			dispatch({
				type: RESET_PASSWORD_FAILED,
			});
		});
};

export const sendUpdateToken = () => (dispatch) => {
	dispatch({
		type: TOKEN_UPDATE_REQUEST,
	});
	Api.updateToken()
		.then((res) => {
			const authToken = res.accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken);
			dispatch({
				type: TOKEN_UPDATE_SUCCESS,
			});
		})
		.catch((err) => {
			dispatch({
				type: TOKEN_UPDATE_FAILED,
			});
		});
};

export const getUserInfo = () => (dispatch) => {
	dispatch({
		type: USER_INFO_REQUEST,
	});
	Api.getUserRequest()
		.then((res) => {
			dispatch({
				type: USER_INFO_SUCCESS,
				payload: res,
			});
		})
		.catch((err) => {
			dispatch({
				type: USER_INFO_FAILED,
			});
		});
};
