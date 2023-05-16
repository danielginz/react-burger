import { LOGOUT_USER_ERROR, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, SET_USER_ERROR, SET_USER_REQUEST, SET_USER_SUCCESS } from "../actions/constant"

const initialState = {
    email: '',
    name: '',
    error: false,
    request: false,
    auth: false,
    logoutRequest: false,
    logoutError: false,
    logoutSuccess: false
}

type ActionType = {
    type: string;
    email? : string;
    name?: string;
    check? : boolean;
}

export default function userReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case (SET_USER_REQUEST):
            {
                return {
                    ...state,
                    request: true,
                    error: false
                }
            }
        case (SET_USER_ERROR):
            {
                return {
                    ...state,
                    request: false,
                    error: true
                }
            }
        case (SET_USER_SUCCESS):
            {
                return {
                    ...state,
                    email: action.email,
                    name: action.name,
                    error: false,
                    logoutSuccess: false,
                    request: false,
                    auth: true
                }
            }
        case (LOGOUT_USER_REQUEST):
            {
                return {
                    ...state,
                    logoutError: false,
                    logoutRequest: true
                }
            }
        case (LOGOUT_USER_ERROR):
            {
                return {
                    ...state,
                    logoutError: true,
                    logoutRequest: false
                }
            }
        case (LOGOUT_USER_SUCCESS):
            {
                return {
                    ...state,
                    auth: false,
                    logoutSuccess: action.check,
                    logoutError: false,
                    logoutRequest: false
                }
            }
        default:
            return state
    }
}