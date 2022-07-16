import React from 'react';
import styles from './ingridients-item.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";
import {useSelector} from 'react-redux';

const DraggableItem = ({ingredient, onClick}) => {
    //let id = ingredient._id

    const [{isDrag}, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    });



    return (
        <li ref={dragRef} className={`${styles.item} mt-6 ml-4 mr-6`} key={ingredient._id}
            onClick={() => onClick(ingredient)}
            draggable>
            {
                !isDrag && (
                    <>
                        <img src={ingredient.image} alt={ingredient.name}/>
                        <div className={`${styles.price} pt-1 pb-1`}>
                            <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                            <CurrencyIcon/>
                        </div>
                        <p className="text text_type_main-default">{ingredient.name}</p>
                    </>
                )
            }
        </li>
    )
}


export default DraggableItem;