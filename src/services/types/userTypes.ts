import {TUser} from "./data";

type TInitialState = {
    user: TUser;

    userRequest: boolean;
    userError: boolean;

    loginRequest: boolean;
    loginSuccess: boolean;
    loginFailed: boolean;

    logoutRequest: boolean;
    logoutSuccess: boolean;
    logoutFailed: boolean;

    forgoutRequest: boolean;
    forgoutSuccess: boolean;
    forgoutFailed: boolean;

    resetRequest: boolean;
    resetSuccess: boolean;
    resetFailed: boolean;

    userInfoRequest: boolean;
    userInfoSuccess: boolean;
    userInfoFailed: boolean;

    tokenRequest: boolean;
    tokenSuccess: boolean;
    tokenFailed: boolean;

    userUpdateRequest: boolean;
    userUpdateSuccess: boolean;
    userUpdateFailed: boolean;

    success: boolean;
};

export const initialState:TInitialState = {
    user: {
        name: "",
        email: "",
    },

    userRequest: false,
    userError: false,

    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,

    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,

    forgoutRequest: false,
    forgoutSuccess: false,
    forgoutFailed: false,

    resetRequest: false,
    resetSuccess: false,
    resetFailed: false,

    userInfoRequest: false,
    userInfoSuccess: false,
    userInfoFailed: false,

    tokenRequest: false,
    tokenSuccess: false,
    tokenFailed: false,

    userUpdateRequest: false,
    userUpdateSuccess: false,
    userUpdateFailed: false,

    success: false,
};
