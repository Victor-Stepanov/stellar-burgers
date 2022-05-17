import React from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import getIngredientsDataFromServer from '../../utils/api.js';
import Modal from '../modal/modal.jsx'
import {useState, useEffect} from 'react';


function App() {
    //States
    const [ingredients, setIngredients] = useState({
        data: [],
        isLoading: false,
        hasError: false,
        errorMessage: ''
    })
    const [isIngredientsOpened, setIsIngredientsOpened] = useState(false); //state для modal1
    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); //state для modal2
    //Block api - data
    const getIngredientsData = () => {
        setIngredients({
            ...ingredients,
            isLoading: true,
            hasError: false,
        })
        getIngredientsDataFromServer()
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

    useEffect(() => {
        getIngredientsData();
    }, [])


    //Block modal
    const openDetailsModal = () => setIsOrderDetailsOpened(true); //открыли модальное окно
    //const openIngredientsModal = (data) =>setIsIngredientsOpened(data);

    //Закрыли все модальные окна
    const closeAllModals = () => {
        setIsIngredientsOpened(false);
        setIsOrderDetailsOpened(false);


    }
    //Закрыть модальных окон на Esc
    const handleEscKey = (evt) => {
        evt.key === "Escape" && closeAllModals()
    }

    return (
        <>
            <div className={styles.app}>
                <AppHeader/>
                {/* Отрисовка будет происходит только после получения данных*/}
                {ingredients.data.length > 0 &&
                <main className={styles.main}>
                    <BurgerIngredients ingredients={ingredients.data}/>
                    <BurgerConstructor ingredients={ingredients.data}/>
                </main>
                }
                {

                }

            </div>
        </>
    );
}

export default App;
