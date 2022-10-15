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

import {TUserActions} from '../actions';
import {TUser} from '../types/data';

type TInitialState ={
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

	success:boolean;

}

const initialUserState:TInitialState = {
	user: {
		name:'',
		email:''
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

	success:false
};

export const userReducer = (state = initialUserState, action:TUserActions):TInitialState => {
	switch (action.type) {
		case USER_REGISTER_REQUEST: {
			return {
				...state,
				userRequest: true,
			};
		}
		case USER_REGISTER_SUCCESS: {
			return {
				...state,
				userError: false,
				userRequest: false,
				user: action.payload.user,
			};
		}
		case USER_REGISTER_FAILED: {
			return {
				...state,
				userError: true,
				userRequest: false,
			};
		}
		case USER_LOGIN_REQUEST: {
			return {
				...state,
				loginRequest: true,
				loginSuccess: false,
				loginFailed: false,
			};
		}
		case USER_LOGIN_SUCCESS: {
			return {
				...state,
				loginRequest: false,
				loginSuccess: true,
				loginFailed: false,
				user: action.payload.user,
			};
		}
		case USER_LOGIN_FAILED: {
			return {
				...state,
				loginFailed: true,
				loginRequest: false,
				loginSuccess: false,
			};
		}
		case USER_LOGOUT_REQUEST: {
			return {
				...state,
				logoutRequest: true,
				logoutSuccess: false,
				logoutFailed: false,
			};
		}
		case USER_LOGOUT_SUCCESS: {
			return {
				...state,
				logoutRequest: false,
				user: {
					name:'',
					email:''
				},
				logoutSuccess: true,
				logoutFailed: false,
			};
		}
		case USER_LOGOUT_FAILED: {
			return {
				...state,
				logoutRequest: false,
				logoutSuccess: false,
				logoutFailed: true,
			};
		}
		case UPDATE_USER_REQUEST: {
			return {
				...state,
				userUpdateRequest: true,
				userUpdateSuccess: false,
				userUpdateFailed: false,
			};
		}
		case UPDATE_USER_SUCCESS: {
			return {
				...state,
				user: action.payload.user,
				userUpdateRequest: false,
				userUpdateSuccess: true,
				userUpdateFailed: false,
			};
		}
		case UPDATE_USER_FAILED: {
			return {
				...state,
				userUpdateRequest: false,
				userUpdateSuccess: false,
				userUpdateFailed: true,
			};
		}
		case FORGOUT_PASSWORD_REQUEST: {
			return {
				...state,
				forgoutRequest: true,
				forgoutSuccess: false,
				forgoutFailed: false,
			};
		}
		case FORGOUT_PASSWORD_SUCCESS: {
			return {
				...state,
				forgoutRequest: false,
				forgoutSuccess: true,
				forgoutFailed: false,
				success: action.payload.success,
			};
		}
		case FORGOUT_PASSWORD_FAILED: {
			return {
				...state,
				forgoutRequest: false,
				forgoutSuccess: false,
				forgoutFailed: true,
			};
		}
		case RESET_PASSWORD_REQUEST: {
			return {
				...state,
				resetRequest: true,
				resetSuccess: false,
				resetFailed: false,
			};
		}
		case RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				resetRequest: false,
				resetSuccess: true,
				resetFailed: false,
				success: action.payload.success,
			};
		}
		case RESET_PASSWORD_FAILED: {
			return {
				...state,
				resetRequest: false,
				resetSuccess: false,
				resetFailed: true,
			};
		}
		case USER_INFO_REQUEST: {
			return {
				...state,
				userInfoRequest: true,
				userInfoSuccess: false,
				userInfoFailed: false,
			};
		}
		case USER_INFO_SUCCESS: {
			return {
				...state,
				user: action.payload.user,
				userInfoRequest: false,
				userInfoSuccess: true,
				userInfoFailed: false,
			};
		}
		case USER_INFO_FAILED: {
			return {
				...state,
				userInfoRequest: false,
				userInfoSuccess: false,
				userInfoFailed: true,
			};
		}
		case TOKEN_UPDATE_REQUEST: {
			return {
				...state,
				tokenRequest: true,
			};
		}
		case TOKEN_UPDATE_SUCCESS: {
			return {
				...state,
				tokenRequest: false,
				tokenSuccess: true,
				tokenFailed: false,
			};
		}
		case TOKEN_UPDATE_FAILED: {
			return {
				...state,
				tokenRequest: false,
				tokenSuccess: false,
				tokenFailed: true,
			};
		}
		default: {
			return state;
		}
	}
};
