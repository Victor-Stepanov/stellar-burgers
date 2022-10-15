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
import {
	TFormValues,
	TUser,
	TSameResponce,
	TUserResponce,
} from "../types/data";
import { AppThunk, AppDispatch } from "../types/index";

//Union
export type TUserActions =
	| TUserRegisterActions
	| TUserLoginActions
	| TUserLogoutActions
	| TForgoutActions
	| TUpdateUserActions
	| TResetPasswordActions
	| TTokenUpdateActions
	| TUserInfoActions;

//Данные регистрации
interface IUserRegisterRequest {
	readonly type: typeof USER_REGISTER_REQUEST;
}

interface IUserRegisterSuccess {
	readonly type: typeof USER_REGISTER_SUCCESS;
	readonly payload: TUserResponce;
}
interface IUserRegisterFailed {
	readonly type: typeof USER_REGISTER_FAILED;
}

type TUserRegisterActions =
	| IUserRegisterRequest
	| IUserRegisterSuccess
	| IUserRegisterFailed;

export const sendUserData: AppThunk =
	(form: TFormValues) => (dispatch: AppDispatch) => {
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
interface IUserLoginRequest {
	readonly type: typeof USER_LOGIN_REQUEST;
}

interface IUserLoginSuccess {
	readonly type: typeof USER_LOGIN_SUCCESS;
	readonly payload: TUserResponce;
}
interface IUserLoginFailed {
	readonly type: typeof USER_LOGIN_FAILED;
}

type TUserLoginActions =
	| IUserLoginRequest
	| IUserLoginSuccess
	| IUserLoginFailed;

export const sendLoginData: AppThunk =
	(form: TFormValues) => (dispatch: AppDispatch) => {
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
interface IUserLogoutRequest {
	readonly type: typeof USER_LOGOUT_REQUEST;
}
interface IUserLogoutSuccess {
	readonly type: typeof USER_LOGOUT_SUCCESS;
}
interface IUserLogoutFailed {
	readonly type: typeof USER_LOGOUT_FAILED;
}
type TUserLogoutActions =
	| IUserLogoutRequest
	| IUserLogoutSuccess
	| IUserLogoutFailed;

export const sendLogoutData: AppThunk = () => (dispatch: AppDispatch) => {
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

//sendEmailResetValue
interface IForgoutPasswordRequest {
	readonly type: typeof FORGOUT_PASSWORD_REQUEST;
}

interface IForgoutPasswordSuccess {
	readonly type: typeof FORGOUT_PASSWORD_SUCCESS;
	readonly payload: TSameResponce;
}

interface IForgoutPasswordFailed {
	readonly type: typeof FORGOUT_PASSWORD_FAILED;
}

type TForgoutActions =
	| IForgoutPasswordRequest
	| IForgoutPasswordSuccess
	| IForgoutPasswordFailed;

export const sendEmailResetValue: AppThunk =
	(form: TFormValues) => (dispatch: AppDispatch) => {
		dispatch({
			type: FORGOUT_PASSWORD_REQUEST,
		});
		Api.sendForgoutPasswordRequest(form)
			.then((res) => {
				dispatch({
					type: FORGOUT_PASSWORD_SUCCESS,
					payload: res,
				});
			})
			.catch((err) => {
				console.error(err);
				dispatch({
					type: FORGOUT_PASSWORD_FAILED,
				});
			});
	};

//sendUpdateUserData UPDATE_USER_FAILED
interface IUpdateUserRequest {
	readonly type: typeof UPDATE_USER_REQUEST;
}
interface IUpdateUserSuccess {
	readonly type: typeof UPDATE_USER_SUCCESS;
	readonly payload: TUserResponce;
}
interface IUpdateUserFailed {
	readonly type: typeof UPDATE_USER_FAILED;
}

type TUpdateUserActions =
	| IUpdateUserRequest
	| IUpdateUserSuccess
	| IUpdateUserFailed;

export const sendUpdateUserData: AppThunk =
	(form: TFormValues) => (dispatch: AppDispatch) => {
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

//sendNewPassword RESET_PASSWORD_FAILED

interface IResetPasswordRequest {
	readonly type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordSuccess {
	readonly type: typeof RESET_PASSWORD_SUCCESS;
	readonly payload: TSameResponce;
}
interface IResetPasswordFailed {
	readonly type: typeof RESET_PASSWORD_FAILED;
}

type TResetPasswordActions =
	| IResetPasswordRequest
	| IResetPasswordSuccess
	| IResetPasswordFailed;

export const sendNewPassword: AppThunk =
	(form: TFormValues) => (dispatch: AppDispatch) => {
		dispatch({
			type: RESET_PASSWORD_REQUEST,
		});
		Api.sendResetPasswordRequest(form)
			.then((res) => {
				dispatch({
					type: RESET_PASSWORD_SUCCESS,
					payload: res,
				});
			})
			.catch((err) => {
				console.error(err);
				dispatch({
					type: RESET_PASSWORD_FAILED,
				});
			});
	};

//sendUpdateToken TOKEN_UPDATE_FAILED
interface ITokenUpdateRequest {
	readonly type: typeof TOKEN_UPDATE_REQUEST;
}
interface ITokenUpdateSuccess {
	readonly type: typeof TOKEN_UPDATE_SUCCESS;
}
interface ITokenUpdateFailed {
	readonly type: typeof TOKEN_UPDATE_FAILED;
}
type TTokenUpdateActions =
	| ITokenUpdateRequest
	| ITokenUpdateSuccess
	| ITokenUpdateFailed;

export const sendUpdateToken: AppThunk = () => (dispatch: AppDispatch) => {
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

//getUserInfo USER_INFO_REQUEST

interface IUserInfoRequest {
	readonly type: typeof USER_INFO_REQUEST;
}
interface IUserInfoSuccess {
	readonly type: typeof USER_INFO_SUCCESS;
	readonly payload: TUserResponce;
}
interface IUserInfoFailed {
	readonly type: typeof USER_INFO_FAILED;
}

type TUserInfoActions = IUserInfoRequest | IUserInfoSuccess | IUserInfoFailed;

export const getUserInfo: AppThunk = () => (dispatch: AppDispatch) => {
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
