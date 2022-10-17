import { TIngrediens } from "../../../../../services/types/data";


export interface IDraggableItem {
    ingredient:TIngrediens;
    onClick:() => void;
}