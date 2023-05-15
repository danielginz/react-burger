import { baseUrl } from "../../utils/apiUrl";
import checkResponse from "../../utils/checkResponse";
import { deleteCookie } from "../../utils/deleteCookie";
import { getCookie } from "../../utils/getCookie";
import { LOGIN_URL } from "../../utils/urls";
import { LOGOUT_USER_ERROR, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS } from "./constant";
//import {History} from 'history'
import { AppDispatch } from '../../index';
import {NavigateFunction} from "react-router-dom";

export default function signOut(navigateFunction : NavigateFunction) {
    const apiUrl = baseUrl + '/auth/logout'
    return async function(dispatch : AppDispatch) {
        dispatch({ type: LOGOUT_USER_REQUEST })
        await fetch(apiUrl, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "token": `${getCookie('refToken')}`,
                })
            })
            .then(res => checkResponse(res))
            .then(data => {
                deleteCookie('refToken')
                deleteCookie('authToken')
                dispatch({ type: LOGOUT_USER_SUCCESS, check: data.success })
                navigateFunction(LOGIN_URL)
            })
            .catch(() => dispatch({ type: LOGOUT_USER_ERROR }))
    }
}