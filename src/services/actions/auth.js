import Api from '../../utils/api';
import { setCookie, deleteCookie } from "../../utils/utils";
//Регистрация пользователя
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';

//Авторизация пользователя на сайте
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

//Выход пользователя с сайта
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

//Отправка email на сброс пароля
export const FORGOUT_PASSWORD_REQUEST = 'FORGOUT_PASSWORD_REQUEST';
export const FORGOUT_PASSWORD_SUCCESS = 'FORGOUT_PASSWORD_SUCCESS';
export const FORGOUT_PASSWORD_FAILED = 'FORGOUT_PASSWORD_FAILED';

//Отправка нового пароля и токена
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

//Отправка данных пользователя

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

//Получение данных о пользователе
export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILED = 'USER_INFO_FAILED';

//Обновление токена
export const TOKEN_UPDATE_REQUEST = 'TOKEN_UPDATE_REQUEST';
export const TOKEN_UPDATE_SUCCESS = 'TOKEN_UPDATE_SUCCESS';
export const TOKEN_UPDATE_FAILED = 'TOKEN_UPDATE_FAILED';

//Данные регистрации
export const sendUserData = (email, password, name) => (dispatch) => {
	dispatch({
		type: USER_REGISTER_REQUEST
	})
	Api
	.sendUserDataToServer(email, password, name)
		.then(res => {
			const authToken = res.accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken);
			dispatch({
				type: USER_REGISTER_SUCCESS,
				payload: res.user
			})
		})
		.catch(err => {
			console.error(err)
			dispatch({
				type: USER_REGISTER_FAILED

			})
		})
}

//Данные авторизации
export const sendLoginData = (email, password) => (dispatch) => {
	dispatch({
		type: USER_LOGIN_REQUEST
	})
	Api
	.sendLoginRequestToServer(email, password)
		.then(res => {
			const authToken = res.accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken);
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: res
			})
		})
		.catch(err => {
			dispatch({
				type: USER_LOGIN_FAILED
			})
		})

}

//Выход с учетной записи
export const sendLogoutData = () => (dispatch) => {
	dispatch({
		type: USER_LOGOUT_REQUEST
	})
	Api
	.sendLogoutRequestToServer()
		.then(_ => {
			localStorage.removeItem("refreshToken")
			deleteCookie("token")
			dispatch({
				type: USER_LOGOUT_SUCCESS
			})

		})
		.catch(err => {
			console.error(err)
			dispatch({
				type: USER_LOGOUT_FAILED
			})
		})

}

export const sendEmailResetValue = (email) => (dispatch) => {
	dispatch({
		type: FORGOUT_PASSWORD_REQUEST
	})
	Api
	.sendForgoutPasswordRequest(email)
		.then(res => {
			dispatch({
				type: FORGOUT_PASSWORD_SUCCESS,
				success: res.success
			})

		})
		.catch(err => {
			console.error(err)
			dispatch({
				type: FORGOUT_PASSWORD_FAILED
			})
		})
}

export const sendUpdateUserData = (email, password, name) => (dispatch) => {
	dispatch({
		type: UPDATE_USER_REQUEST
	})
	Api
	.sendUpdateProfileData(email, password, name)
		.then(res => {
			const authToken = res.accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken);
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: res
			})

		})
		.catch(err => {
			console.error(err)
			dispatch({
				type: UPDATE_USER_FAILED
			})
		})
}

export const sendNewPassword = (password, token) => (dispatch) => {
	dispatch({
		type: RESET_PASSWORD_REQUEST
	})
	Api
	.sendResetPasswordRequest(password, token)
		.then(res => {
			dispatch({
				type: RESET_PASSWORD_SUCCESS,
				success: res.success
			})
		})
		.catch(err => {
			console.error(err)
			dispatch({
				type: RESET_PASSWORD_FAILED
			})
		})
}

export const sendUpdateToken = () => (dispatch) => {
	dispatch({
		type: TOKEN_UPDATE_REQUEST
	})
	Api
	.updateToken()
		.then(res => {
			const authToken = res.accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken);
			dispatch({
				type: TOKEN_UPDATE_SUCCESS
			})

		})
		.catch(err => {
			console.error(err)
			dispatch({
				type: TOKEN_UPDATE_FAILED
			})
		})
}

export const getUserInfo = () => (dispatch) => {
	dispatch({
		type: USER_INFO_REQUEST
	})
	Api
	.getUserRequest()
		.then(res => {
			const authToken = res.accessToken.split("Bearer ")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken)
			dispatch({
				type: USER_INFO_SUCCESS,
				payload: res.user
			})
		})
		.catch(err => {
			dispatch({
				type: USER_INFO_FAILED
			})
		})

}