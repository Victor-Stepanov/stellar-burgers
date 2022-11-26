import { TIngrediens } from "../../../../services/types/data";

export interface IIngridientsItem {
    element: Array<TIngrediens>;
    type: string;
    onClick: () => void;
}
