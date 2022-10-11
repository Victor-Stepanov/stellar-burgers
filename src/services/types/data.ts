export type TIngrediens = {
    readonly _id: string;
    readonly name: string;
    readonly type: 'bun' | 'main' | 'sauce';
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: number;
    readonly image_mobile: number;
    readonly image_large: number;
    readonly __v: number;
    id?: string;
}

export type TFormValues = {
    readonly name?: string;
    readonly email?: string;
    readonly password?: string;
}

export type TUser = {
    readonly success: boolean;
    readonly user?: {
        readonly email: string,
        readonly name: string
    };
    readonly accessToken?: string;
    readonly refreshToken?: string;
}

export type TSameResponce = {
    readonly success: boolean;
    readonly message: string;
}