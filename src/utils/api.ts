import { config, TConfig } from "./const";
import {
	TFormValues,
	TIngrediensResponce,
	TUserResponce,
	TSameResponce,
	TOrderRespnoce,
	TTokenUpdate,
} from "../services/types/data";
import { getCookie } from "./utils";

class Api {
	private url: TConfig["baseUrl"];
	private headers: TConfig["headers"];

	constructor(config: TConfig) {
		this.url = config.baseUrl;
		this.headers = config.headers;
	}

	// Проверяем статус запроса
	private checkStatus<T>(res: Response): Promise<T> {
		return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
	}
	//Получаем ингридиенты с сервера
	async getIngredientsDataFromServer() {
		const responce = await fetch(`${this.url}/ingredients`);
		return this.checkStatus<TIngrediensResponce>(responce);
	}
	//Получаем номер заказа
	async getOrderDataFromServer(id: Array<string>|string) {
		const responce = await fetch(`${this.url}/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getCookie("token"),
			},
			body: JSON.stringify({
				ingredients: id,
			}),
		});
		return this.checkStatus<TOrderRespnoce>(responce);
	}

	//Запрос на регистрацию пользователя auth/register
	async sendUserDataToServer(form: TFormValues) {
		const responce = await fetch(`${this.url}/auth/register`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(form),
		});
		return this.checkStatus<TUserResponce>(responce);
	}

	//Запрос на авторизацию пользователя auth/login
	async sendLoginRequestToServer(form: TFormValues) {
		const responce = await fetch(`${this.url}/auth/login`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(form),
		});
		return this.checkStatus<TUserResponce>(responce);
	}

	//Запрос на деавторизацию пользователя auth/logout
	async sendLogoutRequestToServer() {
		const responce = await fetch(`${this.url}/auth/logout`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify({
				token: localStorage.getItem("refreshToken"),
			}),
		});
		return this.checkStatus<TSameResponce>(responce);
	}

	//Запрос на восстановление пароля /password-reset
	async sendForgoutPasswordRequest(form: TFormValues) {
		const responce = await fetch(`${this.url}/password-reset`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(form),
		});
		return this.checkStatus<TSameResponce>(responce);
	}

	//Запрос на сброс пароля /password-reset/reset
	async sendResetPasswordRequest(form: TFormValues) {
		const responce = await fetch(`${this.url}/password-reset/reset`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(form),
		});
		return this.checkStatus<TSameResponce>(responce);
	}

	//Запрос на обновление данных пользователя auth/use
	async sendUpdateProfileData(form: TFormValues) {
		const responce = await fetch(`${this.url}/auth/user`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getCookie("token"),
			},
			body: JSON.stringify(form),
		});
		return this.checkStatus<TUserResponce>(responce);
	}

	//запрос на обновление accessToken
	async updateToken() {
		const responce = await fetch(`${this.url}/auth/token`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify({
				token: localStorage.getItem("refreshToken"),
			}),
		});
		return this.checkStatus<TTokenUpdate>(responce);
	}

	//Запрос на получение данных пользователя auth/user
	async getUserRequest() {
		const responce = await fetch(`${this.url}/auth/user`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getCookie("token"),
			},
		});
		return this.checkStatus<TUserResponce>(responce);
	}
}

export default new Api(config);
