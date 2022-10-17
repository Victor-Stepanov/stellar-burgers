import burgerConstructorStyles from "./burger-constructor.module.css";
import {
    ConstructorElement,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsItem from "./components/ingridients-item/ingridients-item";
import React, { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { useDrop } from "react-dnd";
import { addItem, removeItem } from "../../services/actions/constructor";
import { getOrder } from "../../services/actions/order";
import { IBurgerConstructor } from "./burger-constructor.props";
import { TIngrediens } from "../../services/types/data";

const BurgerConstructor: FC<IBurgerConstructor> = ({
    openOrderModal,
}): JSX.Element => {
    const dispatch = useAppDispatch();
    const { element, bun } = useAppSelector((state) => state.constructorData); // получаем элементы из хранилища

    //Стремное решение, но старое решение с использованием Array.reduce выдавало ошибку
    const [total, setTotal] = useState(0);

    const totalSumIngredients = (bun: TIngrediens, arr: Array<TIngrediens>) => {
        let sum = 0;
        if (Array.isArray(arr)) {
            arr.forEach((item) => {
                if (item?.price) {
                    sum += item.price;
                }
            });
        }
        return sum + bun.price;
    };

    useEffect(() => {
        if (bun !== null) {
            setTotal(totalSumIngredients(bun, element));
        }
    }, [bun, element]);

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (item: TIngrediens) => {
            dispatch(addItem(item));
        },
    });

    const handlerDeleteItem = (id: string | undefined) => {
        dispatch(removeItem(id));
    };

    const handlerSendOrder = () => {
        openOrderModal();
        if (bun !== null) {
            const id = [bun._id, ...element.map((item) => item._id)];
            dispatch(getOrder(id));
        }
    };

    return (
        <section className={`${burgerConstructorStyles.section} mt-25 `}>
            <div className={`${burgerConstructorStyles.box} ml-4`} ref={dropTarget}>
                {bun !== null ? (
                    <div>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                ) : (
                    <div className={burgerConstructorStyles.empty_top}>
                        <p className="text text_type_main-default">Добавьте булку</p>
                    </div>
                )}
                {/*Блок массив-элементов*/}
                {bun !== null && element.length !== 0 ? (
                    element.map((item, index) => (
                        <IngridientsItem
                            item={item}
                            key={item.id}
                            index={index}
                            removeItem={() => handlerDeleteItem(item.id)}
                        />
                    ))
                ) : (
                    <div className={burgerConstructorStyles.empty_ing}>
                        <p className="text text_type_main-default">Добавьте начинку</p>
                    </div>
                )}

                {bun !== null ? (
                    <div>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                ) : (
                    <div className={burgerConstructorStyles.empty_bottom}>
                        <p className="text text_type_main-default">Добавьте булку</p>
                    </div>
                )}
            </div>
            {bun !== null && element.length !== 0 && (
                <div className={`${burgerConstructorStyles.order} pt-10`}>
                    <div className={`${burgerConstructorStyles.order} `}>
                        <p>
                            <span className="text text_type_digits-medium pr-2">{total}</span>
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" onClick={handlerSendOrder}>
                        Оформить заказ
                    </Button>
                </div>
            )}
        </section>
    );
};

export default BurgerConstructor;
