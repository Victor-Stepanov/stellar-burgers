import burgerIngredientsStyles from './burger-ingredients.module.css'
import TabsMenu from '../burger-ingredients/components/tabs-menu/tabs-menu.jsx';
import IngridientsItem from '../burger-ingredients/components/ingridients-item/ingridients-item.jsx';


const BurgerIngredients = ({ingredients}) => {

    return (
        <section className={`${burgerIngredientsStyles.section} mt-10 mr-10`}>
            <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
            <TabsMenu/>
            <div className={burgerIngredientsStyles.scroll}>
                <IngridientsItem element={ingredients} type='bun'/>
                <IngridientsItem element={ingredients} type='sauce'/>
                <IngridientsItem element={ingredients} type='main'/>
            </div>
        </section>
    )

}


export default BurgerIngredients;

