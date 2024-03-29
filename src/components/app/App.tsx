import React, { useEffect } from "react";
import styles from "./app.module.css";
import { Location } from "history";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useState } from "react";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
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
import { ProtectedRoute } from "../protected-route/protected-route";
import { getCookie } from "../../utils/utils";
import { getIngredients } from "../../services/actions/ingredients";
import { sendUpdateToken, getUserInfo } from "../../services/actions/auth";
import OrderInfo from "../order-info/order-info";
import OrdersHistory from "../../pages/profile/orders-history/orders-history";

function App():JSX.Element {
    const [isIngredientsOpened, setIsIngredientsOpened] = useState<boolean>(false);
    const [isOrderInfoOpened, setIsOrderInfoOpened] = useState<boolean>(false);
    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState<boolean>(false);
    const { orderRequest } = useAppSelector((store) => store.orderNumberData);
    const dispatch = useAppDispatch();
    const { name, email } = useAppSelector((store) => store.userData.user);
    const token = getCookie("token");
    const refreshToken = localStorage.getItem("refreshToken"); // token - для обновления токена, если он умер
    const location = useLocation<{ background: Location }>();
    const history = useHistory();

    const openOrderDetailsModal = (): void =>
        name.length > 0 && email.length > 0
            ? setIsOrderDetailsOpened(true)
            : history.replace("/login");

    const openIngredientsModal = (): void => {
        setIsIngredientsOpened(true);
    };

    //Закрыли все модальные окна
    const closeAllModals = (): void => {
        dispatch({ type: RESET_DETAILS_INGRIDIENT });
        dispatch({ type: RESET_ITEM });
        setIsIngredientsOpened(false);
        setIsOrderDetailsOpened(false);
        setIsOrderInfoOpened(false);
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
                    <ProtectedRoute exact={true} path="/profile/orders">
                        <OrdersHistory />
                    </ProtectedRoute>
                    <ProtectedRoute exact={true} path="/profile/orders/:id">
                        <OrderInfo />
                    </ProtectedRoute>
                    <Route exact={true} path="/ingredients/:id">
                        <IngredientDetails title={"Детали ингредиента"} />
                    </Route>
                    <Route exact={true} path="/feed">
                        <FeedPage />
                    </Route>
                    <Route exact={true} path="/feed/:id">
                        <OrderInfo />
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
                {background && (
                    <Route exact={true} path="/feed/:id">
                        <Modal title="" onClose={closeAllModals}>
                            <OrderInfo />
                        </Modal>
                    </Route>
                )}
                {background && (
                    <ProtectedRoute exact={true} path="/profile/orders/:id">
                        <Modal title="" onClose={closeAllModals}>
                            <OrderInfo />
                        </Modal>
                    </ProtectedRoute>
                )}
            </div>
        </>
    );
}

export default App;
