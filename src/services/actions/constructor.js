import { v4 as uuidv4 } from 'uuid';

export const ADD_BUN = 'ADD_BUN';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const RESET_ITEM = 'RESET_ITEM';



//генератор экшенов

const addItem = (item) => {
   return {
       type:ADD_ITEM,
       payload:{
           ...item,
           id:uuidv4()
       }

   }

}

const removeItem = (id) => {
    return {
        type:REMOVE_ITEM,
        id:id
    }
}