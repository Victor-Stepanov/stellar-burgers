import {
    GET_DETAILS_INGRIDIENT,
    RESET_DETAILS_INGRIDIENT,
} from "../action-types/index";
import { TIngrediens } from "../types/data";

interface IGetDetailsIngridient {
    readonly type: typeof GET_DETAILS_INGRIDIENT;
    readonly item: TIngrediens;
}

interface IResetDetailsIngridient {
    readonly type: typeof RESET_DETAILS_INGRIDIENT;
}

export type TDetailsActions = IGetDetailsIngridient | IResetDetailsIngridient;
