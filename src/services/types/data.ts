export type TIngrediens = {
     _id: string;
     name: string;
     type: "bun" | "main" | "sauce";
     proteins: number;
     fat: number;
     carbohydrates: number;
     calories: number;
     price: number;
     image: string;
     image_mobile: string;
     image_large: string;
     __v: number;
    id?: string;
};

export type TIngrediensResponce = {
    readonly success: boolean;
    readonly data: Array<TIngrediens>;
};

export type TOrderRespnoce = {
    readonly name: string;
    readonly success: boolean;
    readonly order: {
        number: number;
    };
};

export type TFormValues = {
    readonly name: string;
    readonly email: string;
    readonly password?: string;
    readonly token?: string;
};

export type TUser = {
    readonly email: string;
    readonly name: string;
};

export type TUserResponce = {
    readonly success: boolean;
    readonly user: TUser;
    readonly accessToken: string;
    readonly refreshToken: string;
};

export type TSameResponce = {
    readonly success: boolean;
    readonly message: string;
};

export type TTokenUpdate = {
    readonly success: boolean;
    readonly accessToken: string;
    readonly refreshToken: string;
};

export type TFeed = {
    readonly ingredients: Array<string>;
    readonly _id: string;
    readonly status: string;
    readonly number: number;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly name?: string;
};

export type TFeedResponce = {
    readonly success: boolean;
    readonly orders: Array<TFeed>;
    readonly total: number;
    readonly totalToday: number;
};

