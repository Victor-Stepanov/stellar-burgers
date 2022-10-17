import { TIngrediens } from "../../../../services/types/data";

export interface IIngridientsItem {
    item:TIngrediens;
    removeItem:() => void;
    index:number;
}