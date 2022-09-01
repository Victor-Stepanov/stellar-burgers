import {
	USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
	USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_FAILED,
	TOKEN_UPDATE_REQUEST, TOKEN_UPDATE_SUCCESS, TOKEN_UPDATE_FAILED,
	USER_INFO_REQUEST, USER_INFO_FAILED, USER_INFO_SUCCESS,
	USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAILED,
	FORGOUT_PASSWORD_REQUEST, FORGOUT_PASSWORD_SUCCESS, FORGOUT_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED
} from '../actions/auth';

const initialUserState = {
	user: null,
	
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
}

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST: {
			return {
				...state,
				userRequest: true
			}
		}
		case USER_REGISTER_SUCCESS: {
			return {
				...state,
				userError: false,
				userRequest: false,
				user: action.payload
			}
		}
		case USER_REGISTER_FAILED: {
			return {
				...state,
				userError: true,
				userRequest: false
			}
		}
		case USER_LOGIN_REQUEST: {
			return {
				...state,
				loginRequest: true,
				loginSuccess: false,
				loginFailed: false
			}
		}
		case USER_LOGIN_SUCCESS: {
			return {
				...state,
				loginRequest: false,
				loginSuccess: true,
				loginFailed: false,
				user: action.payload
			}
		}
		case USER_LOGIN_FAILED: {
			return {
				...state,
				loginFailed: true,
				loginRequest: false,
				loginSuccess: false,
			}
		}
		case USER_LOGOUT_REQUEST: {
			return {
				...state,
				logoutRequest: true,
				logoutSuccess: false,
				logoutFailed: false
			}
		}
		case USER_LOGOUT_SUCCESS: {
			return {
				...state,
				logoutRequest: false,
				user: null,
				logoutSuccess: true,
				logoutFailed: false
			}
		}
		case USER_LOGOUT_FAILED: {
			return {
				...state,
				logoutRequest: false,
				logoutSuccess: false,
				logoutFailed: true
			}
		}
		case FORGOUT_PASSWORD_REQUEST: {
			return {
				...state,
				forgoutRequest: true,
				forgoutSuccess: false,
				forgoutFailed: false
			}
		}
		case FORGOUT_PASSWORD_SUCCESS: {
			return {
				...state,
				forgoutRequest: false,
				forgoutSuccess: true,
				forgoutFailed: false,
				success: action.success
			}
		}
		case FORGOUT_PASSWORD_FAILED: {
			return {
				...state,
				forgoutRequest: false,
				forgoutSuccess: false,
				forgoutFailed: true
			}
		}
		case RESET_PASSWORD_REQUEST: {
			return {
				...state,
				resetRequest: true,
				resetSuccess: false,
				resetFailed: false
			}
		}
		case RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				resetRequest: false,
				resetSuccess: true,
				resetFailed: false,
				success: action.success
			}
		}
		case RESET_PASSWORD_FAILED: {
			return {
				...state,
				resetRequest: false,
				resetSuccess: false,
				resetFailed: true
			}
		}
		case USER_INFO_REQUEST: {
			return {
				...state,
				userInfoRequest: true,
				userInfoSuccess: false,
				userInfoFailed: false
			}
		}
		case USER_INFO_SUCCESS: {
			return {
				...state,
				user: action.payload,
				userInfoRequest: false,
				userInfoSuccess: true,
				userInfoFailed: false
			}
		}
		case USER_INFO_FAILED: {
			return {
				...state,
				userInfoRequest: false,
				userInfoSuccess: false,
				userInfoFailed: true
			}
		}
		case TOKEN_UPDATE_REQUEST: {
			return {
				...state,
				tokenRequest: true
			}
		}
		case TOKEN_UPDATE_SUCCESS: {
			return {
				...state,
				tokenRequest: false,
				tokenSuccess: true,
				tokenFailed: false
			}
		}
		case TOKEN_UPDATE_FAILED: {
			return {
				...state,
				tokenRequest: false,
				tokenSuccess: false,
				tokenFailed: true
			}
		}
		default: {
			return state;
		}
	}
}