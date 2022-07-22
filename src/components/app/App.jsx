import React from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import { useState } from 'react';
import OrderDetails from '../order-details/order-details.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { addIngridientDeatails, RESET_DETAILS_INGRIDIENT } from '../../services/actions/details';
import { RESET_ITEM } from '../../services/actions/constructor'


function App() {
    const [isIngredientsOpened, setIsIngredientsOpened] = useState(false); //state для  Ingredients modal

    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); //state для OrderDetails modal
    const { ingridientDetails } = useSelector(store => store.ingrideientData)
    const {orderRequest } = useSelector(store => store.orderNumberData)
    const dispatch = useDispatch();

    //Block modal
    const openOrderDetailsModal = () => {
        setIsOrderDetailsOpened(true)
    } //открыли модальное окно
    /*Открыли модальное окно с выбранным элементом(item), который передали в
    onClick={() => onClick(elem)} - файл ingridients-item.jsx-(burger-ingridients)*/
    const openIngredientsModal = (item) => {
        dispatch(addIngridientDeatails(item))
        setIsIngredientsOpened(true);
    };

    //Закрыли все модальные окна
    const closeAllModals = () => {
        dispatch({ type: RESET_DETAILS_INGRIDIENT })
        dispatch({ type: RESET_ITEM })
        setIsIngredientsOpened(false);
        setIsOrderDetailsOpened(false);

    }


    return (
        <>
            <div className={styles.app}>
                <AppHeader />
                <main className={styles.main}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients onClick={openIngredientsModal} />
                        <BurgerConstructor openOrderModal={openOrderDetailsModal} />
                    </DndProvider>
                </main>

                {!orderRequest && isOrderDetailsOpened &&
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
                        <IngredientDetails data={ingridientDetails} />
                    </Modal>

                }

            </div>
        </>
    );
}

export default App;
