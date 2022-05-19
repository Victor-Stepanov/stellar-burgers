import React from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import getIngredientsDataFromServer from '../../utils/api.js';
import {useState, useEffect} from 'react';
import OrderDetails from '../order-details/order-details.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx'

function App() {
    //States
    const [ingredients, setIngredients] = useState({
        data: [],
        isLoading: false,
        hasError: false,
        errorMessage: ''
    })
    const [isIngredientsOpened, setIsIngredientsOpened] = useState(false); //state для  Ingredients modal
    const [cardIngredient, setCardIngredient] = useState({}); //state для выбранной карточки
    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); //state для OrderDetails modal

    //Block api - data
    const getIngredientsData = () => {
        setIngredients({
            ...ingredients,
            isLoading: true,
            hasError: false,
        })
        getIngredientsDataFromServer() // запрос на сервер
            .then(res => setIngredients({
                ...ingredients,
                data: res.data,
                isLoading: false
            }))
            .catch(err => setIngredients({
                ...ingredients,
                isLoading: false,
                hasError: true,
                errorMessage: err.message

            }))


    }

    useEffect(getIngredientsData, [])

    //Block modal
    const openOrderDetailsModal = () => setIsOrderDetailsOpened(true); //открыли модальное окно
    /*Открыли модальное окно с выбранным элементом(item), который передали в
    onClick={() => onClick(elem)} - файл ingridients-item.jsx-(burger-ingridients)*/
    const openIngredientsModal = (item) => {
        setCardIngredient(item);
        setIsIngredientsOpened(true);
    };

    //Закрыли все модальные окна
    const closeAllModals = () => {
        setIsIngredientsOpened(false);
        setIsOrderDetailsOpened(false);

    }

    return (
        <>
            <div className={styles.app}>
                <AppHeader/>
                {/* Отрисовка будет происходит только после получения данных*/}
                {ingredients.data.length > 0 &&
                <main className={styles.main}>
                    <BurgerIngredients ingredients={ingredients.data} onClick={openIngredientsModal}/>
                    <BurgerConstructor ingredients={ingredients.data} onClick={openOrderDetailsModal}/>
                </main>
                }
                {isOrderDetailsOpened &&
                <Modal
                    title=''
                    onClose={closeAllModals}
                >
                    <OrderDetails/>
                </Modal>

                }
                {isIngredientsOpened &&
                <Modal
                    title="Детали ингредиента"
                    onClose={closeAllModals}
                >
                    <IngredientDetails data={cardIngredient}/>
                </Modal>

                }

            </div>
        </>
    );
}

export default App;
