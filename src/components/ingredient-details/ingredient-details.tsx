import React from "react";
import IngredientDetailsStyle from "./ingredient-details.module.css";
import { useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router";
import { FC } from "react";
import { IIngredientDetails } from "./ingredient-details.props";


const IngredientDetails: FC<IIngredientDetails> = ({ title }) => {
    const { ingredients } = useAppSelector((store) => store.ingredientsData);
    const { id } = useParams<{ id: string }>();

    const ingredient = ingredients.find((item) => item._id === id);

    return (
        <div className={`mt-30 ${IngredientDetailsStyle.container}`}>
            {ingredient && (
                <div className={IngredientDetailsStyle.box}>
                    <h3
                        className={`${IngredientDetailsStyle.title} text text_type_main-large`}
                    >
                        {title}
                    </h3>
                    <img src={ingredient.image_large} alt={ingredient.name}></img>
                    <h3
                        className={`${IngredientDetailsStyle.subtitle} text text_type_main-medium mt-4 mb-8`}
                    >
                        {ingredient.name}
                    </h3>
                    <ul className={`${IngredientDetailsStyle.items} mb-15`}>
                        <li className={`${IngredientDetailsStyle.item} pr-5`}>
                            <p className="text text_type_main-default text_color_inactive">
                                Калории,ккал
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {ingredient.calories}
                            </p>
                        </li>
                        <li className={`${IngredientDetailsStyle.item} pr-5`}>
                            <p className="text text_type_main-default text_color_inactive">
                                Белки, г
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {ingredient.proteins}
                            </p>
                        </li>
                        <li className={`${IngredientDetailsStyle.item} pr-5`}>
                            <p className="text text_type_main-default text_color_inactive">
                                Жиры, г
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {ingredient.fat}
                            </p>
                        </li>
                        <li className={`${IngredientDetailsStyle.item} pr-5`}>
                            <p className="text text_type_main-default text_color_inactive">
                                Углеводы, г
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {ingredient.carbohydrates}
                            </p>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default IngredientDetails;
