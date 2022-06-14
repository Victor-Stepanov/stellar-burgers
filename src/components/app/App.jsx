import React from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import {getIngredientsDataFromServer, getOrderDataFromServer} from '../../utils/api.js';
import {useState, useEffect} from 'react';
import OrderDetails from '../order-details/order-details.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';


function App() {
    const [isIngredientsOpened, setIsIngredientsOpened] = useState(false); //state для  Ingredients modal
    const [cardIngredient, setCardIngredient] = useState({}); //state для выбранной карточки
    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); //state для OrderDetails modal
    const [orderData, setOrderData] = useState({
        name: '',
        order: {
            number: ''
        },
        success: false
    });


    const getOrderData = (ingredientsID) => {
        getOrderDataFromServer(ingredientsID)
            .then((res) => setOrderData(res))
            .catch(err => alert(`Ошибка: ${err}`))
    }


    //Block modal //PS - получился какой-то костыль
    const openOrderDetailsModal = (id) => {
        setIsOrderDetailsOpened(true);
    } //открыли модальное окно
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

                <main className={styles.main}>
                    <BurgerIngredients onClick={openIngredientsModal}/>
                </main>

                {isOrderDetailsOpened && orderData.success !== false &&
                <Modal
                    title=''
                    onClose={closeAllModals}
                >
                    <OrderDetails props={orderData}/>
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
