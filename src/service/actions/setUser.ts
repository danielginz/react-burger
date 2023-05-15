import { baseUrl } from "../../utils/apiUrl";
import checkResponse from "../../utils/checkResponse"
import { SET_USER_ERROR, SET_USER_REQUEST, SET_USER_SUCCESS } from "./constant";
import { AppDispatch } from '../../index';

type setUserUser = {
    email: string;
    pass: string;
    name: string;
}

export default function setUser(user : setUserUser, history: () => void) {
    const apiUrl = `${baseUrl}/auth/register`
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
                    "email": user.email,
                    "name": user.name,
                    "password": user.pass
                })
            })
            .then(
                (resp) =>
                checkResponse(resp)

            ).then(data => {
                dispatch({ type: SET_USER_SUCCESS, email: data.user.email, name: data.user.name });
                history()
            })
            .catch(() => dispatch({ type: SET_USER_ERROR }))
    }
}