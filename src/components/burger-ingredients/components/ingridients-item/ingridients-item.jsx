import React, { forwardRef } from 'react';
import styles from './ingridients-item.module.css';
import { ingredientPropType } from '../../../../utils/prop-types.js'
import PropTypes from 'prop-types';
import DraggableItem from './draggable-item/draggable-item.jsx'
import { obj } from '../../../../utils/const';


const IngridientsItem = forwardRef(({ element, type, onClick }, ref) => {

    return (
        <article className={`${styles.box}`} ref={ref}>
            <h2 className="text text_type_main-large pt-10" id={type}>{obj[type]}</h2>
            <ul className={`${styles.list}`}>
                {element.map(item => <DraggableItem ingredient={item} key={item._id} onClick={onClick} count={1} />)}
            </ul>
        </article>
    )
})


export default IngridientsItem;