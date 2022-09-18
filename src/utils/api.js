import { config } from "./const.js";
import { getCookie } from "./utils";

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
		const responce = await fetch(`${this._url}/ingredients`);
		return this._checkStatus(responce);
	}
	//Получаем номер заказа
	async getOrderDataFromServer(id) {
		const responce = await fetch(`${this._url}/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getCookie("token"),
			},
			body: JSON.stringify({
				ingredients: id,
			}),
		});
		return this._checkStatus(responce);
	}

	//Запрос на регистрацию пользователя auth/register
	async sendUserDataToServer(form) {
		const responce = await fetch(`${this._url}/auth/register`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify(form),
		});
		return this._checkStatus(responce);
	}

	//Запрос на авторизацию пользователя auth/login
	async sendLoginRequestToServer(form) {
		const responce = await fetch(`${this._url}/auth/login`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify(form),
		});
		return this._checkStatus(responce);
	}

	//Запрос на деавторизацию пользователя auth/logout
	async sendLogoutRequestToServer() {
		const responce = await fetch(`${this._url}/auth/logout`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				token: localStorage.getItem("refreshToken"),
			}),
		});
		return this._checkStatus(responce);
	}

	//Запрос на восстановление пароля /password-reset
	async sendForgoutPasswordRequest(form) {
		const responce = await fetch(`${this._url}/password-reset`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify(form),
		});
		return this._checkStatus(responce);
	}

	//Запрос на сброс пароля /password-reset/reset
	async sendResetPasswordRequest(form) {
		const responce = await fetch(`${this._url}/password-reset/reset`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify(form),
		});
		return this._checkStatus(responce);
	}

	//Запрос на обновление данных пользователя auth/use
	async sendUpdateProfileData(form) {
		const responce = await fetch(`${this._url}/auth/user`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getCookie("token"),
			},
			body: JSON.stringify(form),
		});
		return this._checkStatus(responce);
	}

	//запрос на обновление accessToken
	async updateToken() {
		const responce = await fetch(`${this._url}/auth/token`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				token: localStorage.getItem("refreshToken"),
			}),
		});
		return this._checkStatus(responce);
	}

	//Запрос на получение данных пользователя auth/user
	async getUserRequest() {
		const responce = await fetch(`${this._url}/auth/user`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getCookie("token"),
			},
		});
		return this._checkStatus(responce);
	}
}

export default new Api(config);
