import { PASS_REFRESH_ERROR, PASS_REFRESH_REQUEST, PASS_REFRESH_SUCCESS, REFRESH_ERROR, REFRESH_REQUEST, REFRESH_SUCCESS } from "../actions/constant"

const initialState = {
    checkEmail: false,
    request: false,
    error: false,
    passResetRequest: false,
    passResetError: false,
    passResetSuccess: false
}

type ActionType = {
    type: string;
    check?: boolean;
}

export default function refreshReduser(state = initialState, action : ActionType) {
    switch (action.type) {
        case REFRESH_REQUEST:
            {
                return {
                    ...state,
                    error: false,
                    request: true
                }
            }
        case REFRESH_ERROR:
            {
                return {
                    ...state,
                    error: true,
                    request: false
                }
            }
        case REFRESH_SUCCESS:
            {
                return {
                    ...state,
                    checkEmail: action.check,
                    error: false,
                    request: false
                }
            }
        case PASS_REFRESH_REQUEST:
            {
                return {
                    ...state,
                    passResetRequest: true,
                    passResetError: false,
                }
            }
        case PASS_REFRESH_ERROR:
            {
                return {
                    ...state,
                    passResetRequest: false,
                    passResetError: true,
                }
            }
        case PASS_REFRESH_SUCCESS:
            {
                return {
                    ...state,
                    passResetSuccess: action.check,
                    passResetRequest: false,
                    passResetError: false,
                }
            }

        default:
            return state
    }
}