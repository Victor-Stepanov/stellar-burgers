import React, {forwardRef} from 'react';
import styles from './ingridients-item.module.css';
import {ingredientPropType} from '../../../../utils/prop-types.js'
import PropTypes from 'prop-types';
import DraggableItem from './draggable-item.jsx'
import {useDrag} from "react-dnd";

const IngridientsItem = forwardRef(({element, type, onClick}, ref) => {

    const obj = {
        'bun': 'Булки',
        'sauce': 'Соусы',
        'main': 'Начинки'
    }

    return (
        <article className={`${styles.box}`} ref={ref}>
            <h2 className="text text_type_main-large pt-10" id={type}>{obj[type]}</h2>
            <ul className={`${styles.list}`}>
                {element.map(item => <DraggableItem key={item._id} ingredient={item} onClick={onClick}/>)}
            </ul>
        </article>
    )
})


export default IngridientsItem;