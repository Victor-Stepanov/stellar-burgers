import React from "react";
import IngredientDetailsStyle from "./ingredient-details.module.css";
import { useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router";
import { FC } from "react";
import { IIngredientDetails } from "./ingredient-details.props";

const IngredientDetails: FC<IIngredientDetails> = ({ title }): JSX.Element => {
    const { ingredients } = useAppSelector((store) => store.ingredientsData);
    const { id } = useParams<{ id: string }>();

    const ingredient: any = ingredients.find((item) => item._id === id);
    const categories = ["calories", "proteins", "fat", "carbohydrates"];

    const obj: any = {
        calories: "Калории,ккал",
        proteins: "Белки, г",
        fat: "Жиры, г",
        carbohydrates: "Углеводы, г",
    };

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
                        {categories.map((item, index) => {
                            if (item in ingredient) {
                                return (
                                    <li
                                        className={`${IngredientDetailsStyle.item} pr-5`}
                                        key={index}
                                    >
                                        <p className="text text_type_main-default text_color_inactive">
                                            {obj[item]}
                                        </p>
                                        <p className="text text_type_main-default text_color_inactive">
                                            {ingredient[item]}
                                        </p>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default IngredientDetails;
