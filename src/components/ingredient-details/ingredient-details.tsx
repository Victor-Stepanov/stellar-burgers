import React from "react";
import IngredientDetailsStyle from "./ingredient-details.module.css";
import { useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router";
import { FC } from "react";
import { IIngredientDetails } from "./ingredient-details.props";
import { isNotEmptyValue } from "../../utils/utils";


const IngredientDetails: FC<IIngredientDetails> = ({ title }) => {
    const { ingredients } = useAppSelector((store) => store.ingredientsData);
    const { id } = useParams<{ id: string }>();

  
    const ingredient = ingredients.find((item) => item._id === id);
    const categories:Array<string> = ["calories", "proteins", "fat", "carbohydrates"];

    const obj: { [key: string]: string } = {
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
                        {categories.map((item:string, index:number) => {
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
