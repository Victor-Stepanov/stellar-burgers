import React, {forwardRef} from 'react';
import styles from './ingridients-item.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../../../utils/prop-types.js'
import PropTypes from 'prop-types';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const IngridientsItem = forwardRef(({element, type, onClick},ref) => {

    const obj = {
        'bun': 'Булки',
        'sauce': 'Соусы',
        'main': 'Начинки'
    }
    return (
        <article className={`${styles.box}`} ref={ref}>
            <h2 className="text text_type_main-large pt-10"  id={type}>{obj[type]}</h2>
            <ul className={`${styles.list}`}>
                {element.filter((item) => item.type === type)
                    .map((elem) => (
                        <li className={`${styles.item} mt-6 ml-4 mr-6`} key={elem._id} onClick={() => onClick(elem)}>
                            <img src={elem.image} alt={elem.name}/>
                            <div className={`${styles.price} pt-1 pb-1`}>
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
})

IngridientsItem.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType),
    type: PropTypes.string,
    onclick: PropTypes.func
}

export default IngridientsItem;