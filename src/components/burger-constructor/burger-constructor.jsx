import burgerConstructorStyles from './burger-constructor.module.css'
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsItem from '../burger-constructor/components/ingridients-item/ingridients-item.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { addItem, removeItem } from '../../services/actions/constructor';
import { getOrder } from '../../services/actions/order'



const BurgerConstructor = ({ openOrderModal }) => {
    const dispatch = useDispatch()
    const { element, bun } = useSelector((state) => state.constructorData) // получаем элементы из хранилища

    const [total, setTotal] = useState(0);
    useEffect(() => {
        const price = element.reduce((sum, item) => sum + item.price, bun.price)
        setTotal(price)
    }, [element, bun])

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (item) => {
            dispatch(addItem(item));
        }

    });

    const handlerDeleteItem = (id) => {
        dispatch(removeItem(id))
    }


    const handlerSendOrder = () => {
        openOrderModal();
        const id = [bun._id, ...element.map((item) => item._id)];
        dispatch(getOrder(id))

    }

    return (
        <section className={`${burgerConstructorStyles.section} mt-25 `}>
            <div className={`${burgerConstructorStyles.box} ml-4`} ref={dropTarget}>
                {Object.keys(bun).length > 0 ? (<div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}

                    />
                </div>) : (
                    <div className={burgerConstructorStyles.empty_top}>
                        <p className='text text_type_main-default'>Добавьте булку</p>
                    </div>

                )}
                {/*Блок массив-элементов*/}
                {bun.length !== 0 && element.length !== 0 ? (
                    element.map((item, index) => <IngridientsItem item={item} key={item.id} index={index}
                        removeItem={() => handlerDeleteItem(item.id)} />)
                ) : (
                    <div className={burgerConstructorStyles.empty_ing}>
                        <p className='text text_type_main-default'>Добавьте начинку</p>
                    </div>
                )}

                {Object.keys(bun).length > 0 ? (<div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}

                    />
                </div>) : (
                    <div className={burgerConstructorStyles.empty_bottom}>
                        <p className='text text_type_main-default'>Добавьте булку</p>
                    </div>

                )}
            </div>
            {bun.length !== 0 && element.length !== 0 && <div className={`${burgerConstructorStyles.order} pt-10`}>
                <div className={`${burgerConstructorStyles.order} `}>
                    <p><span className="text text_type_digits-medium pr-2">{total}</span></p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" onClick={handlerSendOrder}>Оформить заказ</Button>
            </div>}
        </section>

    )
}

BurgerConstructor.propTypes = {
    onclick: PropTypes.func
}


export default BurgerConstructor;