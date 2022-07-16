import config from './const.js'

const checkStatus = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`); //проверка статуса ответа сервера

const getIngredientsDataFromServer = () => {
    return fetch(`${config.baseUrl}/ingredients`)
        .then(res => checkStatus(res))
}

const getOrderDataFromServer = (id) => {
    return fetch(`${config.baseUrl}/orders`, {
        method:'POST',
        headers: config.headers,
        body:JSON.stringify({
            ingredients:id
        })
    })
        .then(res => checkStatus(res))
}

export {getIngredientsDataFromServer, getOrderDataFromServer};
