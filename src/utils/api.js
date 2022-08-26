import config from './const.js';
import { getCookie } from './utils';

class Api {
	constructor(config) {
		this._url = config.baseUrl;
		this._headers = config.headers;
	}

    // Проверяем статус запроса
	_checkStatus(res) {
		return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
	}
    //Получаем ингридиенты с сервера
	async getIngredientsDataFromServer() {
		const res = await fetch(`${this._url}/ingredients`);
		return this._checkStatus(res);

    }
    //Получаем номер заказа
	async getOrderDataFromServer(id) {
		const res = await fetch(`${this._url}/orders`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				ingredients: id
			})
		});
		return this._checkStatus(res);
    }
    
    //Запрос на регистрацию пользователя auth/register
	async sendUserDataToServer(email, password, name) {
		const res = await fetch(`${this._url}/auth/register`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email: email,
				password: password,
				name: name
			})
		});
		return this._checkStatus(res);
    }
    
    //Запрос на авторизацию пользователя auth/login
	async sendLoginRequestToServer(email, password) {
		const res = await fetch(`${this._url}/auth/login`, {
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify({
				email: email,
				password: password
			})
		});
		return this._checkStatus(res);
    }
    
    //Запрос на деавторизацию пользователя auth/logout
	async sendLogoutRequestToServer() {
		const res = await fetch(`${this._url}/auth/logout`, {
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken')
			})
		});
		return this._checkStatus(res);
    }
    
    //Запрос на восстановление пароля /password-reset
	async sendForgoutPasswordRequest(email) {
		const res = await fetch(`${this._url}/password-reset`, {
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify({
				email: email
			})
		});
		return this._checkStatus(res);
	}

    //Запрос на сброс пароля /password-reset/reset
	async sendResetPasswordRequest(password, token) {
		const res = await fetch(`${this._url}/password-reset/reset`, {
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify({
				password: password,
				token: token
			})
		});
		return this._checkStatus(res);
    }
    
    //Запрос на обновление данных пользователя auth/use
	async sendUpdateProfileData(email, password, name) {
		const res = await fetch(`${this._url}/auth/user`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getCookie('token')
			},
			body: JSON.stringify({
				email: email,
				password: password,
				name: name
			})
		});
		return this._checkStatus(res);
    }
    
    //запрос на обновление accessToken
	async updateToken() {
		const res = await fetch(`${this._url}/auth/token`, {
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken')
			})
		});
		return this._checkStatus(res);
    }
    
    //Запрос на получение данных пользователя auth/user
	async getUserRequest() {
		const res = await fetch(`${this._url}/auth/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getCookie('token')
			}
		});
		return this._checkStatus(res);
	}
}


export default new Api(config);