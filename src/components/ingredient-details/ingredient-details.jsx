import React from 'react';
import IngredientDetailsStyle from './ingredient-details.module.css';
import { ingredientPropType } from '../../utils/prop-types.js'
import PropTypes from 'prop-types';

const IngredientDetails = ({ data }) => {
    const categories = ['calories', 'proteins', 'fat', 'carbohydrates'];
    const obj = {
        'calories': 'Калории,ккал',
        'proteins': 'Белки, г',
        'fat': 'Жиры, г',
        'carbohydrates': 'Углеводы, г'
    }

    return (
        <>
            <img src={data.image_large} alt={data.name}></img>
            <h3 className={`${IngredientDetailsStyle.subtitle} text text_type_main-default mt-4 mb-8`}>{data.name}</h3>
            <ul className={`${IngredientDetailsStyle.items} mb-15`}>
                {categories.map((item, index) => {
                    if (item in data) {
                        return (
                            <li className={`${IngredientDetailsStyle.item} pr-5`} key={index}>
                                <p className="text text_type_main-default text_color_inactive">{obj[item]}</p>
                                <p className="text text_type_main-default text_color_inactive">{data[item]}</p>
                            </li>
                        )
                    }
                })}
            </ul>
        </>

    )

}

IngredientDetails.propTypes = {
    data: ingredientPropType,
}

export default IngredientDetails;