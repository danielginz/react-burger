import { baseUrl } from "../../utils/apiUrl"
import checkResponse from "../../utils/checkResponse";
import { setCookie } from "../../utils/setCookie";
import { PROFILE_URL } from "../../utils/urls";
import { SET_USER_ERROR, SET_USER_REQUEST, SET_USER_SUCCESS } from "./constant";
//import {History} from 'history'
import { AppDispatch } from '../../index';
import {NavigateFunction} from "react-router-dom";

type signInForm = {
    email: string;
    pass: string;
}

export default function signIn(form : signInForm, navigateFunction : NavigateFunction) {
    const apiUrl = baseUrl + '/auth/login'
    return async function(dispatch: AppDispatch) {
        dispatch({ type: SET_USER_REQUEST })
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
                    "email": form.email,
                    "password": form.pass
                })
            })
            .then(
                (res) => checkResponse(res)

            ).then(data => {
                let authToken = data.accessToken
                let refToken = data.refreshToken
                if (authToken && refToken) {
                    setCookie('authToken', authToken);
                    setCookie('refToken', refToken);
                }
                dispatch({ type: SET_USER_SUCCESS, email: data.user.email, name: data.user.name });
                navigateFunction(PROFILE_URL)
            })
            .catch(() => dispatch({ type: SET_USER_ERROR }))
    }
}