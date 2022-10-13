import { v4 as uuidv4 } from "uuid";
import { ADD_ITEM, REMOVE_ITEM, MOVE_ITEM, RESET_ITEM } from "../action-types";
import { TIngrediens } from '../types/data';
//Типизация экшенов
interface IAddItem {
    readonly type: typeof ADD_ITEM;
    readonly payload: TIngrediens;
}
interface IRemoveItem {
    readonly type: typeof REMOVE_ITEM;
    readonly id: string | undefined;
}
interface IMoveItem {
    readonly type: typeof MOVE_ITEM;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}
interface IResetItem {
    readonly type: typeof RESET_ITEM;
}

export type TConstructorActions = IAddItem | IRemoveItem | IMoveItem | IResetItem;

export const addItem = (item: TIngrediens): IAddItem => {
    return {
        type: ADD_ITEM,
        payload: {
            ...item,
            id: uuidv4(),
        },
    };
};

export const removeItem = (id: string | undefined): IRemoveItem => {
    return {
        type: REMOVE_ITEM,
        id: id,
    };
};

export const moveItem = (dragIndex: number, hoverIndex: number): IMoveItem => {
    return {
        type: MOVE_ITEM,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
    };
};
