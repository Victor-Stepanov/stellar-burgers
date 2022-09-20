import React, {useMemo } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import TabsMenu from '../burger-ingredients/components/tabs-menu/tabs-menu.jsx';
import IngridientsItem from '../burger-ingredients/components/ingridients-item/ingridients-item.jsx';
import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';


const BurgerIngredients = ({ onClick }) => {
    const { ingredients, ingredientsRequest } = useSelector(state => state.ingredientsData)

    const bun = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]) // Булки
    const sauce = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]) // Соусы
    const main = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]) // Начинка


    const [bunRef, inViewBuns] = useInView({ threshold: 0.9 });
    const [sauceRef, inViewSauces] = useInView({ threshold: 0.6 });
    const [mainRef, inViewFilling] = useInView({ threshold: 0.1 });
    return (
        <>
            {!ingredientsRequest && ingredients &&
                <section className={`${burgerIngredientsStyles.section} mt-10 mr-10`}>
                    <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
                    <TabsMenu inViewBuns={inViewBuns} inViewSauces={inViewSauces} inViewFilling={inViewFilling} />
                    <div className={burgerIngredientsStyles.scroll}>
                        <IngridientsItem element={bun} ref={bunRef} type='bun' onClick={onClick} />
                        <IngridientsItem element={sauce} ref={sauceRef} type='sauce' onClick={onClick} />
                        <IngridientsItem element={main} ref={mainRef} type='main' onClick={onClick} />
                    </div>
                </section>
            }
        </>

    )

}


BurgerIngredients.propTypes = {
    onClick: PropTypes.func.isRequired
}


export default BurgerIngredients;

