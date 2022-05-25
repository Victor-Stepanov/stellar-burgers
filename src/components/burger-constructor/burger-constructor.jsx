import burgerConstructorStyles from './burger-constructor.module.css'
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsItem from '../burger-constructor/components/ingridients-item/ingridients-item.jsx';

import PropTypes from 'prop-types';
import {useEffect, useState, useContext, useMemo} from 'react';
import BurgerIngredientsContext from '../../context/burger-ingredients-context.jsx';


const BurgerConstructor = ({onClick}) => {
    const ingredients = useContext(BurgerIngredientsContext); //Context
    const bun = useMemo(()=> ingredients.find((element) => element.type === 'bun'), [ingredients]) // нахожу первую булку в массиве
    const [total, setTotal] = useState(0);
    const res = [];
    ingredients.map((item) => {
        if (item.type !== 'bun') res.push(item)
    })
    useEffect(() => {
        const price = res.reduce((sum, item) => sum + item.price, bun.price)
        setTotal(price)
    }, [ingredients])
    return (
        <section className={`${burgerConstructorStyles.section} mt-25 `}>
            <div className={`${burgerConstructorStyles.box} ml-4`}>
                <div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}

                    />
                </div>
                <IngridientsItem ingredients={ingredients}/>
                <div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}

                    />
                </div>
            </div>
            <div className={`${burgerConstructorStyles.order} pt-10`}>
                <div className={`${burgerConstructorStyles.order} `}>
                    <p><span className="text text_type_digits-medium pr-2">{total}</span></p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" onClick={onClick}>Оформить заказ</Button>
            </div>
        </section>

    )
}

BurgerConstructor.propTypes = {
    onclick: PropTypes.func
}


export default BurgerConstructor;