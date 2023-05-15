import { combineReducers } from "redux";
import { burgerReducer } from "./burgerReducer";
import constructorReducer from "./constructorReducer";
import modalReducer from "./modalReducer";
import { orderReducer } from "./orderReducer";
import refreshReduser from "./refreshReduser";
import userReducer from "./userReducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
    ingridients: burgerReducer,
    modals: modalReducer,
    order: orderReducer,
    con: constructorReducer,
    user: userReducer,
    refresh: refreshReduser,
    ws: wsReducer
})