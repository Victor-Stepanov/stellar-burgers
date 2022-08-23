import React, { useEffect } from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import { useState } from 'react';
import OrderDetails from '../order-details/order-details.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import {Switch, Route} from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { addIngridientDeatails, RESET_DETAILS_INGRIDIENT } from '../../services/actions/details';
import { RESET_ITEM } from '../../services/actions/constructor';
import { LoginPage, ProfilePage, IngredientsPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFound404 } from '../../pages/index';
import { ProtectedRoute } from '../../components/protected-route/protected-route';
import { getCookie } from '../../utils/utils';
import { getUserRequest, updateToken } from '../../utils/api';
import { sendUpdateToken } from '../../services/actions/auth';


function App() {
    const { log } = console;
    const [isIngredientsOpened, setIsIngredientsOpened] = useState(false); //state для  Ingredients modal

    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); //state для OrderDetails modal
    const { ingridientDetails } = useSelector(store => store.ingrideientData)
    const { orderRequest } = useSelector(store => store.orderNumberData)
    const dispatch = useDispatch();
    const token = getCookie('token')
    const refreshToken = localStorage.getItem('refreshToken'); // token - для обновления токена, если он умер
    
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
    useEffect(() => {
        if (!token && refreshToken) {
            dispatch(sendUpdateToken())
        }
    },[dispatch, token, refreshToken])

    
    return (
        <>
            <div className={styles.app}>
                <AppHeader />
                    <Switch>
                        <Route exact={true} path="/">
                            <main className={styles.main}>
                                <DndProvider backend={HTML5Backend}>
                                    <BurgerIngredients onClick={openIngredientsModal} />
                                    <BurgerConstructor openOrderModal={openOrderDetailsModal} />
                                </DndProvider>
                            </main>
                        </Route>
                        <Route exact={true} path="/login">
                            <LoginPage />
                        </Route>
                        <Route exact={true} path="/register">
                            <RegisterPage/>
                        </Route>
                        <Route exact={true} path="/forgot-password">
                            <ForgotPasswordPage />
                        </Route>
                        <Route exact={true} path="/reset-password">
                            <ResetPasswordPage />
                        </Route>
                        <ProtectedRoute anonymous={false} exact={true} path="/profile">
                            <ProfilePage />
                        </ProtectedRoute>
                        <Route exact={true} path="/ingredients/:id"></Route>
                        <Route>
                            <NotFound404/>
                        </Route>
                    </Switch>


                {!orderRequest && isOrderDetailsOpened &&
                    <Modal
                        title=''
                        onClose={closeAllModals}
                    >
                        <OrderDetails />
                    </Modal>

                }
                {isIngredientsOpened && Object.keys(ingridientDetails).length > 0 &&
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
