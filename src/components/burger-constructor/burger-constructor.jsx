import burgerConstructorStyles from './burger-constructor.module.css'
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsItem from '../burger-constructor/components/ingridients-item/ingridients-item.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import {useEffect, useState, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';

const {log} = console;


const BurgerConstructor = ({onClick, getOrderData}) => {
    const dispatch = useDispatch()
    const { ingredients, bun } = useSelector(store => store.constructorData) //

    //let id = useMemo(() => ingredients.map((item) => item._id))
    //const bun = useMemo(()=> ingredients.find((element) => element.type === 'bun'), [ingredients])// нахожу первую булку в массиве
    //const [total, setTotal] = useState(0);
    //const res = useMemo(() => ingredients.filter((item) => item.type !== 'bun'), [ingredients])
    //useEffect(() => {
    //    const price = res.reduce((sum, item) => sum + item.price, bun.price)
    //    setTotal(price)
    //}, [ingredients])


    return (
        <section className={`${burgerConstructorStyles.section} mt-25 `}>
            <div className={`${burgerConstructorStyles.box} ml-4`}>
                { bun !== null && <div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}

                    />
                </div>}
                {ingredients.length > 0  && <IngridientsItem ingredients={ingredients}/>}
                {  bun !== null && <div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}

                    />
                </div>}
            </div>
            <div className={`${burgerConstructorStyles.order} pt-10`}>
                <div className={`${burgerConstructorStyles.order} `}>
                    <p><span className="text text_type_digits-medium pr-2">{12}</span></p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" onClick={()=> {
                    onClick();
                    //getOrderData(id)
                }}>Оформить заказ</Button>
            </div>
        </section>

    )
}

BurgerConstructor.propTypes = {
    onclick: PropTypes.func
}


export default BurgerConstructor;