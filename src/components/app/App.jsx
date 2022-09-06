import React, { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import { useState } from "react";
import OrderDetails from "../order-details/order-details.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import Modal from "../modal/modal.jsx";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { RESET_DETAILS_INGRIDIENT } from "../../services/action-types/detailsTypes";
import { RESET_ITEM } from "../../services/action-types";
import {
    LoginPage,
    ProfilePage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    FeedPage,
    NotFound404,
} from "../../pages/index";
import { ProtectedRoute } from "../../components/protected-route/protected-route";
import { getCookie } from "../../utils/utils";
import { getIngredients } from "../../services/actions/ingredients";
import { sendUpdateToken, getUserInfo } from "../../services/actions/auth";
import  OrderInfo  from '../order-info/order-info';



function App() {
    const [isIngredientsOpened, setIsIngredientsOpened] = useState(false); //state для  Ingredients modal
    const [isOrderInfoOpened, setIsOrderInfoOpened] = useState(false);
    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); //state для OrderDetails modal
    const { orderRequest } = useSelector((store) => store.orderNumberData);
    const { user } = useSelector((state) => state.userData); // получили user
    const dispatch = useDispatch();
    const token = getCookie("token");
    const refreshToken = localStorage.getItem("refreshToken"); // token - для обновления токена, если он умер
    const location = useLocation();
    const history = useHistory();

    const openOrderDetailsModal = () =>
        user ? setIsOrderDetailsOpened(true) : history.replace("/login");

    const openIngredientsModal = () => {
        setIsIngredientsOpened(true);
    };

    const openOrderInfoModal = () => {
        setIsOrderInfoOpened(true);
    }
    //Закрыли все модальные окна
    const closeAllModals = () => {
        dispatch({ type: RESET_DETAILS_INGRIDIENT });
        dispatch({ type: RESET_ITEM });
        setIsIngredientsOpened(false);
        setIsOrderDetailsOpened(false);
        setIsOrderInfoOpened(false)
        history.goBack();
    };

    useEffect(() => {
        dispatch(getIngredients());
        if (!token && refreshToken) {
            dispatch(sendUpdateToken());
        }
        if (token) {
            dispatch(getUserInfo());
        }
    }, [dispatch, token, refreshToken]);

    const background = location.state && location.state.background;

    return (
        <>
            <div className={styles.app}>
                <AppHeader />
                <Switch location={background || location}>
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
                        <RegisterPage />
                    </Route>
                    <Route exact={true} path="/forgot-password">
                        <ForgotPasswordPage />
                    </Route>
                    <Route exact={true} path="/reset-password">
                        <ResetPasswordPage />
                    </Route>
                    <ProtectedRoute exact={true} path="/profile">
                        <ProfilePage />
                    </ProtectedRoute>
                    <Route exact={true} path="/ingredients/:id">
                        <IngredientDetails title={"Детали ингредиента"} />
                    </Route>
                    <Route exact={true} path="/feed">
                        <FeedPage />
                    </Route>
                    <Route>
                        <NotFound404 />
                    </Route>
                </Switch>

                {!orderRequest && isOrderDetailsOpened && (
                    <Modal title="" onClose={closeAllModals}>
                        <OrderDetails />
                    </Modal>
                )}
                {background && (
                    <Route exact={true} path="/ingredients/:id">
                        <Modal title="Детали ингредиента" onClose={closeAllModals}>
                            <IngredientDetails />
                        </Modal>
                    </Route>
                )}
                {
                    <Route exact={true} path="/feed/:id">
                        <Modal title="" onClose={closeAllModals}>
                            <OrderInfo />
                        </Modal>
                    </Route>
                }
            </div>
        </>
    );
}

export default App;
