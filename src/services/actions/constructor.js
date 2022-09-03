import { v4 as uuidv4 } from "uuid";
import { ADD_ITEM, REMOVE_ITEM, MOVE_ITEM } from "../action-types";

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: {
            ...item,
            id: uuidv4(),
        },
    };
};

export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id: id,
    };
};

export const moveItem = (dragIndex, hoverIndex) => {
    return {
        type: MOVE_ITEM,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
    };
};
