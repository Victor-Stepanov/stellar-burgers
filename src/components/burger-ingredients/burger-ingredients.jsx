import burgerIngredientsStyles from './burger-ingredients.module.css'
import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import {data} from '../../utils/data.js'

function TabsMenu() {
    const [current, setCurrent] = useState('bun')
    return (
        <nav className={burgerIngredientsStyles.nav}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </nav>
    )
}

function IngridientsItem({element, type}) {

    const obj = {
        'bun': 'Булки',
        'sauce': 'Соусы',
        'main': 'Начинки'
    }
    return (
        <article className={`${burgerIngredientsStyles.box}`}>
            <h2 className="text text_type_main-large pt-10">{obj[type]}</h2>
            <ul className={`${burgerIngredientsStyles.list}`}>
                {element.filter((item) => item.type === type)
                    .map((elem) => (
                        <li className={`${burgerIngredientsStyles.item} mt-6 ml-4 mr-6`} key={elem._id}>
                            <img src={elem.image} alt={elem.name}/>
                            <div className={`${burgerIngredientsStyles.price} pt-1 pb-1`}>
                                <p className="text text_type_digits-default mr-2">{elem.price}</p>
                                <CurrencyIcon/>
                            </div>
                            <p className="text text_type_main-default">{elem.name}</p>
                        </li>

                    ))
                }
            </ul>
        </article>
    )
}

const BurgerIngredients = ({ingredients}) => {
    {/* TODO: исправить вызов 3-х IngridientsItem*/}
    return (
        <section className={`${burgerIngredientsStyles.section} pt-10 pr-10`}>
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

