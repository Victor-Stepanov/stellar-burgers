import { useSelector } from "react-redux";
import React, { useMemo } from "react";
import styles from "../ingridients-item.module.css";
import { ingredientPropType } from '../../../../../utils/prop-types.js';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

const DraggableItem = ({ ingredient, onClick }) => {
    const { element, bun } = useSelector((state) => state.constructorData)
    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    }, [element, bun]);

    //Счетчик кол-ва элементов
    let count = useMemo(() => {
        //Проверяем какой тип ингредиента 
        if (ingredient.type === 'bun') {
            return bun && bun._id === ingredient._id ? 2 : 0; //получаем нужную булку по ид и ставим ей значение 2
        } else {
            return element && element.filter((item) => item._id === ingredient._id).length; //получаем массив item с нужными id элементов, затем кол-во эл-ов
        }
    }, [bun, ingredient._id, ingredient.type, element]);


    return (
        <li
            ref={dragRef}
            className={`${styles.item} mt-6 ml-4 mr-6`}
            onClick={() => onClick(ingredient)}
            draggable
        >
            {!isDrag && (
                <>
                    {count > 0 && <Counter count={count} size='default' />}
                    <img src={ingredient.image} alt={ingredient.name} />
                    <div className={`${styles.price} pt-1 pb-1`}>
                        <p className="text text_type_digits-default mr-2">
                            {ingredient.price}
                        </p>
                        <CurrencyIcon />
                    </div>
                    <p className="text text_type_main-default">{ingredient.name}</p>
                </>
            )}
        </li>
    );
};

DraggableItem.propTypes = {
    ingredient:ingredientPropType.isRequired,
    onClick: PropTypes.func.isRequired,

}

export default DraggableItem;
