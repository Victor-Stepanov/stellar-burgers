import React from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import {data} from '../../utils/data.js'

function App() {
    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients ingredients={data}/>
                <BurgerConstructor ingredients={data}/>
            </main>
        </div>
    );
}

export default App;
