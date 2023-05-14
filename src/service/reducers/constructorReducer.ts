import { ingridientType } from "../../utils/types";
import { DELETE_CONSTRUCTOR_ELEMENT, UPDATE_BUN, UPDATE_CONSTRUCTOR_LIST, RELOAD_CONSTRUCTOR_LIST } from "../actions/constant"

const initialState = {
    constructorList: [],
    bun: {},
    uuids: []
}

type ActionType = {
    type: string;
    index?: number;
    array?: ingridientType[];
    uuid?: string;
    item: ingridientType;
}

export default function constructorReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case UPDATE_CONSTRUCTOR_LIST:
            {
                return {
                    ...state,
                    constructorList: [...state.constructorList, action.item],
                    uuids: [...state.uuids, action.uuid]

                }
            }
        case DELETE_CONSTRUCTOR_ELEMENT:
            {
                return {
                    ...state,
                    constructorList: [...state.constructorList.filter((item, index) => index !== action.index)]
                }
            }
        case RELOAD_CONSTRUCTOR_LIST:
            {
                return {
                    ...state,
                    constructorList: action.array
                }
            }
        case UPDATE_BUN:
            {
                return {
                    ...state,
                    bun: action.item
                }
            }
        default:
            return state
    }
}