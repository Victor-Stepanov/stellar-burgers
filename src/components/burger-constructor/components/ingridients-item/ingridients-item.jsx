import React, { useRef } from 'react';
import IngridientsItemStyles from './ingridients-item.module.css';
import {DragIcon, ConstructorElement, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../../../utils/prop-types.js'
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd'
import {moveItem} from '../../../../services/actions/constructor';
import {useSelector, useDispatch} from 'react-redux';


const IngridientsItem = ({item, removeItem, index}) => {
    const { id } = item;
    const dispatch = useDispatch();
    const ref = useRef(null)

    const [{ isDragging }, dragRef] = useDrag({
        type: 'element',
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{ handlerId }, drop] = useDrop({
        accept: 'element',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover: (item, monitor) => {
            if(!ref.current) return;
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            dispatch(moveItem(dragIndex, hoverIndex))
            item.index = hoverIndex
        },
    })

    const dragDropRef = dragRef(drop(ref))
    return (
        <ul className={IngridientsItemStyles.list}>
            <li className={IngridientsItemStyles.item} ref={dragDropRef}>
                <DragIcon/>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={removeItem}
                />
            </li>
        </ul>
    )

}

IngridientsItem.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType)
}

export default IngridientsItem;
