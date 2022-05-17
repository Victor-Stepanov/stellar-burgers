const URL = 'https://norma.nomoreparties.space/api';

const checkStatus = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

function getIngredientsDataFromServer () {
    return fetch(`${URL}/ingredients`)
        .then(res => checkStatus(res))
}

export default getIngredientsDataFromServer;