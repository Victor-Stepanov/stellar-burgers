import { v4 as uuidv4 } from "uuid";
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';
export const RESET_ITEM = 'RESET_ITEM';



//генератор экшенов

export const addItem = (item) => {
   return {
       type:ADD_ITEM,
       payload:{
           ...item,
           id:uuidv4()
       }

   }

}

 export const removeItem = (id) => {
    return {
        type:REMOVE_ITEM,
        id:id
    }
}

export const moveItem = (dragIndex, hoverIndex) => {
    return {
        type:MOVE_ITEM,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex

    }
}