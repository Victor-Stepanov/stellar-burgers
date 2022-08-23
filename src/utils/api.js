import config from './const.js';
import { getCookie } from './utils';

//Проверка статуса ответа
const checkStatus = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`); //проверка статуса ответа сервера


//Получение ингридиентов с сервера
const getIngredientsDataFromServer = async () =>
    await fetch(`${config.baseUrl}/ingredients`)
        .then(res => checkStatus(res))


//Создание заказа
const getOrderDataFromServer = async (id) =>
    await fetch(`${config.baseUrl}/orders`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            ingredients: id
        })
    })
        .then(res => checkStatus(res))


//Регистрация пользователя
const sendUserDataToServer = async (email, password, name) =>
    await fetch(`${config.baseUrl}/auth/register`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
    })
        .then(res => checkStatus(res))

//Авторизация пользователя на сайте
const sendLoginRequestToServer = async (email, password) =>
    await fetch(`${config.baseUrl}/auth/login`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(res => checkStatus(res))


//Выход с учетной записи пользователя
const sendLogoutRequestToServer = async () =>
    await fetch(`${config.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
//Запрос обновления токена ()
const updateToken = async () => 
    await (fetch(`${config.baseUrl}/auth/token`, {
        method: 'POST',
        headers:config.headers,
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    }))

//Получение данных о пользователе
const getUserRequest = async () => 
    await fetch(`${config.baseUrl}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        }

    })
    .then(res => checkStatus(res))

export { getIngredientsDataFromServer, getOrderDataFromServer, sendUserDataToServer, sendLoginRequestToServer, getUserRequest, updateToken };
