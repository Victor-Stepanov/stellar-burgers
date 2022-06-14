import React from 'react';
import IngridientsItemStyles from './ingridients-item.module.css';
import {DragIcon,ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../../../utils/prop-types.js'
import PropTypes from 'prop-types';

const IngridientsItem = ({ingredients}) => (
    <ul className={IngridientsItemStyles.list}>
        {
            ingredients.filter((item) => item.type !== 'bun')
                .map((element, index) => (
                    <li className={IngridientsItemStyles.item} key={index}>
                        <DragIcon/>
                        <ConstructorElement
                            text={element.name}
                            price={element.price}
                            thumbnail={element.image}
                        />
                    </li>
                ))
        }
    </ul>

)

IngridientsItem.propTypes = {
    ingredients:PropTypes.arrayOf(ingredientPropType)
}

export default IngridientsItem;
