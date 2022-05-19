const URL = 'https://norma.nomoreparties.space/api';

const checkStatus = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`); //проверка статуса ответа сервера

const getIngredientsDataFromServer = () => { // запрос на сервер
    return fetch(`${URL}/ingredients`)
        .then(res => checkStatus(res))
}

export default getIngredientsDataFromServer;