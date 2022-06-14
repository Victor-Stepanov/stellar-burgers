import burgerConstructorStyles from './burger-constructor.module.css'
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsItem from '../burger-constructor/components/ingridients-item/ingridients-item.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import {useEffect, useState, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getIngredients} from '../../services/actions/ingredients'

const BurgerConstructor = ({onClick, getOrderData}) => {
    const dispatch = useDispatch()
    const { ingredients } = useSelector(store => store.ingredientsData)
    console.log(ingredients)
    let id = useMemo(() => ingredients.map((item) => item._id))
    const bun = useMemo(()=> ingredients.find((element) => element.type === 'bun'), [ingredients])// нахожу первую булку в массиве
    const [total, setTotal] = useState(0);
    const res = useMemo(() => ingredients.filter((item) => item.type !== 'bun'), [ingredients])
    useEffect(() => {
        const price = res.reduce((sum, item) => sum + item.price, bun.price)
        setTotal(price)
    }, [ingredients])

    useEffect(
        () => {
            dispatch(getIngredients());
        },
        [dispatch]
    );
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
                <Button type="primary" onClick={()=> {
                    onClick();
                    getOrderData(id)
                }}>Оформить заказ</Button>
            </div>
        </section>

    )
}

BurgerConstructor.propTypes = {
    onclick: PropTypes.func
}


export default BurgerConstructor;