import React, {useEffect, forwardRef} from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import TabsMenu from '../burger-ingredients/components/tabs-menu/tabs-menu.jsx';
import IngridientsItem from '../burger-ingredients/components/ingridients-item/ingridients-item.jsx';
import {ingredientPropType} from '../../utils/prop-types.js'
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {getIngredients} from '../../services/actions/ingredients';
import {useInView} from 'react-intersection-observer';


const BurgerIngredients = ({onClick}) => {
    const dispatch = useDispatch()
    const {ingredients, ingredientsRequest} = useSelector(state => state.ingredientsData)
    useEffect(
        () => {
            dispatch(getIngredients());
        },
        [dispatch]
    );

    const [bunRef, inViewBuns] = useInView({threshold: 0.9});
    const [sauceRef, inViewSauces] = useInView({threshold: 0.6});
    const [mainRef, inViewFilling] = useInView({threshold: 0.1});
    return (
        <>
            {!ingredientsRequest && ingredients &&
            <section className={`${burgerIngredientsStyles.section} mt-10 mr-10`}>
                <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
                <TabsMenu inViewBuns={inViewBuns} inViewSauces={inViewSauces} inViewFilling={inViewFilling}/>
                <div className={burgerIngredientsStyles.scroll}>
                    <IngridientsItem element={ingredients} ref={bunRef} type='bun' onClick={onClick}/>
                    <IngridientsItem element={ingredients} ref={sauceRef} type='sauce' onClick={onClick}/>
                    <IngridientsItem element={ingredients} ref={mainRef} type='main' onClick={onClick}/>
                </div>
            </section>
            }
        </>

    )

}


BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType),
    onclick: PropTypes.func
}


export default BurgerIngredients;

