import React, {useContext} from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import TabsMenu from '../burger-ingredients/components/tabs-menu/tabs-menu.jsx';
import IngridientsItem from '../burger-ingredients/components/ingridients-item/ingridients-item.jsx';
import {ingredientPropType} from '../../utils/prop-types.js'
import PropTypes from 'prop-types';
import BurgerIngredientsContext from '../../context/burger-ingredients-context.jsx';


const BurgerIngredients = ({ onClick}) => {
    const ingredients = useContext(BurgerIngredientsContext);
    return (
        <section className={`${burgerIngredientsStyles.section} mt-10 mr-10`}>
            <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
            <TabsMenu/>
            <div className={burgerIngredientsStyles.scroll}>
                <IngridientsItem element={ingredients} type='bun' onClick={onClick}/>
                <IngridientsItem element={ingredients} type='sauce' onClick={onClick}/>
                <IngridientsItem element={ingredients} type='main' onClick={onClick}/>
            </div>
        </section>
    )

}


BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType),
    onclick: PropTypes.func
}


export default BurgerIngredients;

