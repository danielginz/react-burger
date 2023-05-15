import { baseUrl } from "../../utils/apiUrl";
import checkResponse from "../../utils/checkResponse";
import { GEt_BURGER_INGRIDIENTS_ERROR, GEt_BURGER_INGRIDIENTS_SUCCESS, GEt_BURGER_INGRIDIENTS__REQUEST } from "./constant"
import { AppDispatch } from '../../index';

export default function getIngridients() {
    const apiUrl = `${baseUrl}/ingredients`
    return function(dispatch: AppDispatch) {

        dispatch({ type: GEt_BURGER_INGRIDIENTS__REQUEST })
        fetch(apiUrl)
            .then(
                (resp) => checkResponse(resp)
            )
            .then(data => {
                dispatch({ type: GEt_BURGER_INGRIDIENTS_SUCCESS, ingridients: data.data })
            })
            .catch((err) => dispatch({ type: GEt_BURGER_INGRIDIENTS_ERROR }));
    }
}