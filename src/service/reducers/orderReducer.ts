import { GEt_BURGER_INGRIDIENTS_ERROR, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS, HIDE_ORDER_MODAL } from "../actions/constant"

const initialState = {
    orderNumber: null,
    orderNumberRequest: false,
    orderNumberError: false,
    orderShow: false
}

type ActionType = {
    type: string;
    number: number | string;
}

export const orderReducer = (state = initialState, action : ActionType) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST:
            {
                return {
                    ...state,
                    orderNumberRequest: true,
                    orderNumberError: false
                }
            }
        case GEt_BURGER_INGRIDIENTS_ERROR:
            {
                return {
                    ...state,
                    orderNumberRequest: false,
                    orderNumberError: true
                }
            }
        case GET_ORDER_NUMBER_SUCCESS:
            {

                return {
                    ...state,
                    orderNumber: action.number,
                    orderNumberRequest: false,
                    orderNumberError: false,
                    orderShow: true
                }
            }

        case HIDE_ORDER_MODAL:
            {
                return {
                    ...state,
                    orderShow: false,
                    orderNumber: null
                }
            }
        default:
            return state
    }
}