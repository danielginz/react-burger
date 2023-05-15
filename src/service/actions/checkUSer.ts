import { baseUrl } from "../../utils/apiUrl";
import checkResponse from "../../utils/checkResponse";
import { getCookie } from "../../utils/getCookie";
import { SET_USER_SUCCESS } from "./constant";
import refreshUser from "./refreshUser";
import {AppDispatch, AppThunk } from '../../index';

export default function checkUser() {
    const apiUrl = baseUrl + '/auth/user'
    return async function(dispatch : AppThunk<AppDispatch>) {
        await fetch(apiUrl, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${getCookie('authToken')}`
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            }).then(
                (resp) =>
                checkResponse(resp)

            ).then(data => {
                dispatch({ type: SET_USER_SUCCESS, email: data.user.email, name: data.user.name });
            })
            .catch((e) => { e === 'jwt expired' ? dispatch(refreshUser()) : console.log(e) })
    }
}