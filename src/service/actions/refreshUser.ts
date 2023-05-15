import { SET_USER_SUCCESS } from "./constant";
import { baseUrl } from "../../utils/apiUrl";
import checkResponse from "../../utils/checkResponse";
import { getCookie } from "../../utils/getCookie";
import { setCookie } from "../../utils/setCookie";
import { AppDispatch } from '../../index';

type refreshUserProps =  {
    name: string;
    login: string;
    pass: string;
}

export default function refreshUser(user ?: refreshUserProps) {
    const apiUrl = baseUrl + '/auth/user'
    return async function(dispatch : AppDispatch) {
        await fetch(apiUrl, {
                method: 'PATCH',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${getCookie('authToken')}`
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(user ? {
                    "token": `${getCookie('refToken')}`,
                    "email": user.login,
                    "name": user.name,
                    "password": user.pass
                } : {
                    "token": `${getCookie('refToken')}`,
                })
            }).then(res => checkResponse(res))
            .then(data => {
                let authToken = data.accessToken
                let refToken = data.refreshToken
                if (authToken && refToken) {
                    setCookie('authToken', authToken);
                    setCookie('refToken', refToken);
                }
                dispatch({ type: SET_USER_SUCCESS, email: data.user.email, name: data.user.name });
            }).catch((e) => console.log(e))
    }
}