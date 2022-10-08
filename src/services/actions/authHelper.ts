import {
  USER_INFO_FAILED,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  TOKEN_UPDATE_FAILED,
  TOKEN_UPDATE_REQUEST,
  TOKEN_UPDATE_SUCCESS,
  FORGOUT_PASSWORD_FAILED,
  FORGOUT_PASSWORD_REQUEST,
  FORGOUT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_REGISTER_SUCCESS,
} from "../action-types";

//Данные регистрации
interface IUserRegisterRequest {
  readonly type: typeof USER_REGISTER_REQUEST;
}

interface IUserRegisterSuccess {
  readonly type: typeof USER_REGISTER_SUCCESS;
}
interface IUserRegisterFailed {
  readonly type: typeof USER_REGISTER_FAILED;
}

type TUserRegisterActions =
  | IUserRegisterRequest
  | IUserRegisterSuccess
  | IUserRegisterFailed;

//Данные авторизации
interface IUserLoginRequest {
  readonly type: typeof USER_LOGIN_REQUEST;
}

interface IUserLoginSuccess {
  readonly type: typeof USER_LOGIN_SUCCESS;
}
interface IUserLoginFailed {
  readonly type: typeof USER_LOGIN_FAILED;
}

type TUserLoginActions =
  | IUserLoginRequest
  | IUserLoginSuccess
  | IUserLoginFailed;

//Выход с учетной записи
interface IUserLogoutRequest {
  readonly type: typeof USER_LOGOUT_REQUEST;
}
interface IUserLogoutSuccess {
  readonly type: typeof USER_LOGOUT_SUCCESS;
}
interface IUserLogoutFailed {
  readonly type: typeof USER_LOGOUT_FAILED;
}
type TUserLogoutActions =
  | IUserLogoutRequest
  | IUserLogoutSuccess
  | IUserLogoutFailed;

//sendEmailResetValue
interface IForgoutPasswordRequest {
  readonly type: typeof FORGOUT_PASSWORD_REQUEST;
}

interface IForgoutPasswordSuccess {
  readonly type: typeof FORGOUT_PASSWORD_SUCCESS;
}

interface IForgoutPasswordFailed {
  readonly type: typeof FORGOUT_PASSWORD_FAILED;
}

type TForgoutActions =
  | IForgoutPasswordRequest
  | IForgoutPasswordSuccess
  | IForgoutPasswordFailed;

//sendUpdateUserData UPDATE_USER_FAILED
interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}
interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
}
interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

type TUpdateUserActions =
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed;

//sendNewPassword RESET_PASSWORD_FAILED

interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

type TResetPasswordActions =
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed;

//sendUpdateToken TOKEN_UPDATE_FAILED
interface ITokenUpdateRequest {
  readonly type: typeof TOKEN_UPDATE_REQUEST;
}
interface ITokenUpdateSuccess {
  readonly type: typeof TOKEN_UPDATE_SUCCESS;
}
interface ITokenUpdateFailed {
  readonly type: typeof TOKEN_UPDATE_FAILED;
}
type TTokenUpdateActions =
  | ITokenUpdateRequest
  | ITokenUpdateSuccess
  | ITokenUpdateFailed;

//getUserInfo USER_INFO_REQUEST

interface IUserInfoRequest {
  readonly type: typeof USER_INFO_REQUEST;
}
interface IUserInfoSuccess {
  readonly type: typeof USER_INFO_SUCCESS;
}
interface IUserInfoFailed {
  readonly type: typeof USER_INFO_FAILED;
}

type TUserInfoActions = IUserInfoRequest | IUserInfoSuccess | IUserInfoFailed;

export type TUserActions =
  | TUserRegisterActions
  | TUserLoginActions
  | TUserLogoutActions
  | TForgoutActions
  | TUpdateUserActions
  | TResetPasswordActions
  | TTokenUpdateActions
  | TUserInfoActions;
