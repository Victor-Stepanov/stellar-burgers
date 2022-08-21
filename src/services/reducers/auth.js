import {
	USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
	USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_FAILED,
	TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILED
} from '../actions/auth';

const initialUserState = {
	user: null,
	userRequest: false,
	userError: false,
	
	loginRequest:false,
	loginSuccess:false,
	loginFailed: false,
	
	tokenRequest: false,
	tokenSuccess: false,
	tokenFailed: false,
}

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST: {
			return {
				...state,
				userRequest:true
			}
		}
		case USER_REGISTER_SUCCESS: {
			return {
				...state,
				userError: false,
				userRequest: false,
				user:action.payload
			}
		}
		case USER_REGISTER_FAILED: {
			return {
				...state,
				userError: true,
				userRequest:false
			}
		}
		case USER_LOGIN_REQUEST: {
			return {
				...state,
				loginRequest:true
			}
		}
		case USER_LOGIN_SUCCESS: {
			return {
				...state,
				loginRequest: false,
				loginSuccess: true,
				loginFailed: false,
				user:action.payload
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
		default: {
			return state;
		}
	}
}