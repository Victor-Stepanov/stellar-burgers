import config from './const.js'

const checkStatus = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`); //проверка статуса ответа сервера

const getIngredientsDataFromServer = () => {
    return fetch(`${config.baseUrl}/ingredients`)
        .then(res => checkStatus(res))
}

const getOrderDataFromServer = () => {
    return fetch(`${config.baseUrl}/orders`, {
        method:'POST',
        headers: config.headers,
        body:JSON.stringify({
            ingredients:['60d3b41abdacab0026a733c6'] //просто id булки, "гениальное" решение
        })
    })
        .then(res => checkStatus(res))
}

export {getIngredientsDataFromServer, getOrderDataFromServer};
