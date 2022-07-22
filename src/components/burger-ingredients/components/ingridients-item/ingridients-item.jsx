import React, { forwardRef } from 'react';
import styles from './ingridients-item.module.css';
import PropTypes from 'prop-types';
import DraggableItem from './draggable-item/draggable-item.jsx'
import { obj } from '../../../../utils/const';


const IngridientsItem = forwardRef(({ element, type, onClick }, ref) => {

    return (
        <article className={`${styles.box}`} ref={ref}>
            <h2 className="text text_type_main-large pt-10" id={type}>{obj[type]}</h2>
            <ul className={`${styles.list}`}>
                {element.map(item => <DraggableItem key={item._id} ingredient={item} onClick={onClick}/>)}
            </ul>
        </article>
    )
})

IngridientsItem.propTypes = {
    element:PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,

}

export default IngridientsItem;