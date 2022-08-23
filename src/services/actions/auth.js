import { sendUserDataToServer, sendLoginRequestToServer, updateToken } from '../../utils/api'
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

//Получение данных о пользователе
export const USER_INFO_REQUEST = '';
export const USER_INFO_SUCCESS = '';
export const USER_INFO_FAILED = '';

//Обновление токена
export const TOKEN_UPDATE_REQUEST = 'TOKEN_UPDATE_REQUEST';
export const TOKEN_UPDATE_SUCCESS = 'TOKEN_UPDATE_SUCCESS';
export const TOKEN_UPDATE_FAILED = 'TOKEN_UPDATE_FAILED';

export const sendUserData = (email, password, name) => (dispatch) => {
	dispatch({
		type: USER_REGISTER_REQUEST
	})
	sendUserDataToServer(email, password, name)
		.then(res => {
			const authToken = res.accessToken.split("Bearer")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken);
			dispatch({
				type: USER_REGISTER_SUCCESS,
				payload: res
			})
		})
		.catch(err => {
			console.error(err)
			dispatch({
				type: USER_REGISTER_FAILED

			})
		})
}

export const sendLoginData = (email, password) => (dispatch) => {
	dispatch({
		type: USER_LOGIN_REQUEST
	})
	sendLoginRequestToServer(email, password)
		.then(res => {
			const authToken = res.accessToken.split("Bearer")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken);
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload:res
			})
		})
		.catch(err => {
			dispatch({
				type: USER_LOGIN_FAILED
			})
		})

}

export const sendUpdateToken = () => (dispatch) => {
	dispatch({
		type:TOKEN_UPDATE_REQUEST
	})
	updateToken()
		.then(res => {
			const authToken = res.accessToken.split("Bearer")[1];
			setCookie("token", authToken);
			const refreshToken = res.refreshToken;
			localStorage.setItem("refreshToken", refreshToken);
			dispatch({
				type:TOKEN_UPDATE_SUCCESS
			})
		
		})
		.catch(err => {
			console.error(err)
			dispatch({
			type:TOKEN_UPDATE_FAILED
		})
	})
}
