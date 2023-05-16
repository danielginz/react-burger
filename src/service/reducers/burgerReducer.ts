import { GEt_BURGER_INGRIDIENTS_ERROR, GEt_BURGER_INGRIDIENTS_SUCCESS, GEt_BURGER_INGRIDIENTS__REQUEST } from "../actions/constant"
import { ingridientType } from '../../utils/types';

const initialState = {
    burgerIngridients: [],
    burgerIngridientsRequest: false,
    burgerIngridientsError: false
}

type ActionType = {
    type: string;
    ingridients: ingridientType[];
}

export const burgerReducer = (state = initialState, action : ActionType) => {
    switch (action.type) {
        case GEt_BURGER_INGRIDIENTS__REQUEST:
            {
                return {
                    ...state,
                    burgerIngridientsRequest: true,
                    burgerIngridientsError: false
                }
            }
        case GEt_BURGER_INGRIDIENTS_ERROR:
            {
                return {
                    ...state,
                    burgerIngridientsRequest: false,
                    burgerIngridientsError: true
                }
            }
        case GEt_BURGER_INGRIDIENTS_SUCCESS:
            {
                return {
                    ...state,
                    burgerIngridients: action.ingridients,
                    burgerIngridientsRequest: false,
                    burgerIngridientsError: false
                }
            }
        default:
            return state
    }
}