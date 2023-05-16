import { baseUrl } from "../../utils/apiUrl"
import checkResponse from "../../utils/checkResponse"
import { getCookie } from "../../utils/getCookie"
import { GET_ORDER_NUMBER_ERROR, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS } from "./constant"
import { AppDispatch } from '../../index';

export default function getOrderNumber(order: {ingredients: string[]}) {
    const apiUrl = `${baseUrl}/orders`
    return function(dispatch: AppDispatch) {
        dispatch({ type: GET_ORDER_NUMBER_REQUEST })
        fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `${getCookie('authToken')}`
                },
                body: JSON.stringify(order)
            })
            .then((resp) => checkResponse(resp))
            .then(data => dispatch({ type: GET_ORDER_NUMBER_SUCCESS, number: data.order.number }))
            .catch(err => dispatch({ type: GET_ORDER_NUMBER_ERROR }))
    }
}