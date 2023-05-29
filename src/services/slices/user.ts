import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import { NORMA_API } from '../../utils/burger-api';
import { useAppDispatch } from '../../services/hooks';
import { getCookie, setCookie, deleteCookie } from '../../services/utils';
import {IUser} from "../types";
import {wsSlice} from "./websocket";
import {feedSlice} from "./feed";

type TRedirectCallback = () => void;
export const getUser = () => {
  return (dispatch = useAppDispatch()) => {
    const accessToken: string = getCookie('accessToken') || '';

    const userRequestHeaders: Headers = new Headers();
    userRequestHeaders.append('Content-Type', 'application/json');
    userRequestHeaders.append('Authorization', accessToken);

    dispatch(userSlice.actions.request());
    // get user data from the API
    fetch(`${NORMA_API}/auth/user`, {
      method: 'GET',
      headers: userRequestHeaders
    })
        .then(res => {
          if (!res.ok && res.status >= 500) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success === true) {
            dispatch(userSlice.actions.setName(data.user.name));
            dispatch(userSlice.actions.setEmail(data.user.email));

            dispatch(userSlice.actions.setAuthorization(true));

            dispatch(userSlice.actions.success());
          }
          else if (data.message === 'You should be authorised') {
            // force redirect to login page
            dispatch(userSlice.actions.setAuthorization(false));
            dispatch(userSlice.actions.success());
          }
          else if (data.message === 'jwt expired') {
            refreshToken()
                .then((refresh_res) => {
                  if (!refresh_res.ok && refresh_res.status >= 500) {
                    throw Error(refresh_res.statusText);
                  }
                  return refresh_res.json();
                })
                .then((refresh_data) => {
                  if (refresh_data.success === true) {
                    setCookie('accessToken', refresh_data.accessToken, { path: '/' });
                    setCookie('refreshToken', refresh_data.refreshToken, { path: '/' });

                    userRequestHeaders.delete('Authorization');
                    userRequestHeaders.append('Authorization', refresh_data.accessToken || '');

                    fetch(`${NORMA_API}/auth/user`, {
                      method: 'GET',
                      headers: userRequestHeaders
                    })
                        .then(res => {
                          if (!res.ok && res.status >= 500) {
                            throw Error(res.statusText);
                          }
                          return res.json();
                        })
                        .then((data) => {
                          if (data.success) {
                            dispatch(userSlice.actions.setName(data.user.name));
                            dispatch(userSlice.actions.setEmail(data.user.email));

                            dispatch(userSlice.actions.setAuthorization(true));

                            dispatch(userSlice.actions.success());
                          }
                          else if (data.message === 'You should be authorised') {
                            // force redirect to login page
                            dispatch(userSlice.actions.setAuthorization(false));
                            dispatch(userSlice.actions.success());
                          }
                          else {
                            throw Error(data.message);
                          }
                        })
                        .catch((error) => {
                          dispatch(userSlice.actions.setAuthorization(false));
                          dispatch(userSlice.actions.failed())
                          console.log(error);
                        })
                  }
                  else {
                    throw Error(refresh_data.message);
                  }
                })
                .catch((error) => {
                  dispatch(userSlice.actions.setAuthorization(false));
                  dispatch(userSlice.actions.failed())
                  console.log(error);
                });
          }
          else {
            throw Error(data.message);
          }
        })
        .catch((error) => {
          dispatch(userSlice.actions.setAuthorization(false));
          dispatch(userSlice.actions.failed())
          console.log(error);
        })
  }
}

export const setUser = (user: IUser) => {
  return (dispatch = useAppDispatch()) => {
    const accessToken: string = getCookie('accessToken') || '';

    const userRequestHeaders: Headers = new Headers();
    userRequestHeaders.append('Content-Type', 'application/json');
    userRequestHeaders.append('Authorization', accessToken);

    dispatch(userSlice.actions.request());
    // get user data from the API
    fetch(`${NORMA_API}/auth/user`, {
      method: 'PATCH',
      headers: userRequestHeaders,
      body: JSON.stringify({
        "email": user.email,
        "password": user.password,
        "name": user.name,
      })
    })
        .then(res => {
          if (!res.ok && res.status >= 500) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success === true) {
            dispatch(userSlice.actions.setName(data.user.name));
            dispatch(userSlice.actions.setEmail(data.user.email));
            dispatch(userSlice.actions.success());
          }
          else if (data.message === 'jwt expired') {
            refreshToken()
                .then((refresh_res) => {
                  if (!refresh_res.ok && refresh_res.status >= 500) {
                    throw Error(refresh_res.statusText);
                  }
                  return refresh_res.json();
                })
                .then((refresh_data) => {
                  if (refresh_data.success === true) {
                    setCookie('accessToken', refresh_data.accessToken, { path: '/' });
                    setCookie('refreshToken', refresh_data.refreshToken, { path: '/' });

                    userRequestHeaders.delete('Authorization');
                    userRequestHeaders.append('Authorization', refresh_data.accessToken || '');

                    fetch(`${NORMA_API}/auth/user`, {
                      method: 'GET',
                      headers: userRequestHeaders,
                      body: JSON.stringify({
                        "email": user.email,
                        "password": user.password,
                        "name": user.name,
                      })
                    })
                        .then(res => {
                          if (!res.ok && res.status >= 500) {
                            throw Error(res.statusText);
                          }
                          return res.json();
                        })
                        .then((data) => {
                          if (data.success) {
                            dispatch(userSlice.actions.setName(data.user.name));
                            dispatch(userSlice.actions.setEmail(data.user.email));
                            dispatch(userSlice.actions.success());
                          }
                          else {
                            throw Error(data.message);
                          }
                        })
                        .catch((error) => {
                          dispatch(userSlice.actions.failed())
                          console.log(error);
                        })
                  }
                  else {
                    throw Error(refresh_data.message);
                  }
                })
                .catch((error) => {
                  dispatch(userSlice.actions.failed())
                  console.log(error);
                });
          }
          else {
            throw Error(data.message);
          }
        })
        .catch((error) => {
          dispatch(userSlice.actions.failed())
          console.log(error);
        })
  }
}

export const register = (user: IUser, redirectCallback: TRedirectCallback) => {
  return (dispatch = useAppDispatch()) => {
    dispatch(userSlice.actions.request());
    // send user data to the API
    fetch(`${NORMA_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": user.email,
        "password": user.password,
        "name": user.name,
      })
    })
        .then(res => {
          if (!res.ok && res.status >= 500) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            dispatch(userSlice.actions.setEmail(data.user.email));
            dispatch(userSlice.actions.setName(data.user.name));

            setCookie('accessToken', data.accessToken, { path: '/' });
            setCookie('refreshToken', data.refreshToken, { path: '/' });

            dispatch(userSlice.actions.setAuthorization(true));
            dispatch(userSlice.actions.success());
            redirectCallback();
          }
          else {
            throw Error(data.message);
          }
        })
        .catch((error) => {
          dispatch(userSlice.actions.setAuthorization(false));
          dispatch(userSlice.actions.failed())
          console.log(error);
        })
  }
}

export const login = (user: IUser, redirectCallback: TRedirectCallback) => {
  return (dispatch = useAppDispatch()) => {
    dispatch(userSlice.actions.request());
    // send user data to the API
    fetch(`${NORMA_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": user.email,
        "password": user.password
      })
    })
        .then(res => {
          if (!res.ok && res.status >= 500) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            dispatch(userSlice.actions.setEmail(data.user.email));
            dispatch(userSlice.actions.setName(data.user.name));

            setCookie('accessToken', data.accessToken, { path: '/' });
            setCookie('refreshToken', data.refreshToken, { path: '/' });

            dispatch(userSlice.actions.setAuthorization(true));
            dispatch(userSlice.actions.success());
            redirectCallback();
          }
          else {
            throw Error(data.message);
          }
        })
        .catch((error) => {
          dispatch(userSlice.actions.setAuthorization(false));
          dispatch(userSlice.actions.failed())
          console.log(error);
        })
  }
}

export const forgotPassword = (
    email: string,
    redirectCallback: TRedirectCallback
) => {
  return (dispatch = useAppDispatch()) => {
    dispatch(userSlice.actions.request());
    // send user data to the API
    fetch(`${NORMA_API}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email
      })
    })
        .then(res => {
          if (!res.ok && res.status >= 500) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            dispatch(userSlice.actions.success());
            redirectCallback();
          }
          else {
            throw Error(data.message);
          }
        })
        .catch((error) => {
          dispatch(userSlice.actions.failed())
          console.log(error);
        })
  }
}

export const resetPassword = (
    code: string,
    password: string,
    redirectCallback: TRedirectCallback
) => {
  return (dispatch = useAppDispatch()) => {
    dispatch(userSlice.actions.request());
    // send user data to the API
    fetch(`${NORMA_API}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "token": code
      })
    })
        .then(res => {
          if (!res.ok && res.status >= 500) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            dispatch(userSlice.actions.success());
            redirectCallback();
          }
          else {
            throw Error(data.message);
          }
        })
        .catch((error) => {
          dispatch(userSlice.actions.failed())
          console.log(error);
        })
  }
}

export const logout = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(userSlice.actions.request());
    fetch(`${NORMA_API}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": getCookie('refreshToken')
      })
    })
        .then(res => {
          if (!res.ok && res.status >= 500) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            deleteCookie('accessToken');
            deleteCookie('refreshToken');

            dispatch(userSlice.actions.resetUserData());

            dispatch(userSlice.actions.setAuthorization(false));
            dispatch(userSlice.actions.success());
          }
          else {
            throw Error(data.message);
          }
        })
        .catch((error) => {
          dispatch(userSlice.actions.failed())
          console.log(error);
        })
  }
}

export const refreshToken = () => {
  return fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token": getCookie('refreshToken')
    })
  })
}

export const startHistory = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(wsSlice.actions.wsConnectionStartUsers({
      token: (getCookie('accessToken') || '').replace('Bearer ', '')
    }));
    // saving user orders in feedSlice
    dispatch(feedSlice.actions.request());
  }
}

export const stopHistory = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(wsSlice.actions.wsConnectionStop());
  }
}

const fakePassword: string = '123456';

interface userState {
  user: IUser,
  userRequest: boolean,
  userFailed: boolean,
  userSuccess: boolean,
  isAuthorized: boolean
}

const initialState: userState = {
  user: {
    password: fakePassword,
  },
  userRequest: false,
  userFailed: false,
  userSuccess: false,
  isAuthorized: true
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    request(state) {
      state.userRequest = true;
      state.userFailed = false;
      state.userSuccess = false;
    },
    failed(state) {
      state.userFailed = true;
      state.userRequest = false;
      state.userSuccess = false;
    },
    success(state) {
      state.userSuccess = true;
      state.userRequest = false;
      state.userFailed = false;
    },
    setName(state, action: PayloadAction<string>) {
      state.user = {
        ...state.user,
        name: action.payload
      }
    },
    setPassword(state, action: PayloadAction<string>) {
      state.user = {
        ...state.user,
        password: action.payload
      }
    },
    setEmail(state, action: PayloadAction<string>) {
      state.user = {
        ...state.user,
        email: action.payload
      }
    },
    resetStatus(state) {
      // resetting only errors
      state.userFailed = false;
    },
    resetUserData(state) {
      state.user.name = '';
      state.user.email = '';
      // TODO: get password hash from server
      state.user.password = fakePassword;
    },
    setAuthorization(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
    checkAuthorization(state) {
      state.isAuthorized = ((getCookie('accessToken') !== '') &&
          (getCookie('refreshToken') !== ''));
    }
  }
})
