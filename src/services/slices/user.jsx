import { createSlice } from '@reduxjs/toolkit'
import { fakeUserData } from '../../utils/user-data';

import { NORMA_API } from '../../utils/burger-api';

import { getCookie, setCookie, deleteCookie } from '../../utils/utils';

export const getUser = () => {
  return dispatch => {
    dispatch(userSlice.actions.request());
    fetch(`${NORMA_API}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken')
      }
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
            fetch(`${NORMA_API}/auth/user`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('accessToken'),
              }
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

export const setUser = (user) => {
  return dispatch => {
    dispatch(userSlice.actions.request());
    fetch(`${NORMA_API}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken')
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
            fetch(`${NORMA_API}/auth/user`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('accessToken'),
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

export const register = (user, redirectCallback) => {
  return dispatch => {
    dispatch(userSlice.actions.request());
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

export const login = (user, redirectCallback) => {
  return dispatch => {
    dispatch(userSlice.actions.request());
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

export const forgotPassword = (email, redirectCallback) => {
  return dispatch => {
    dispatch(userSlice.actions.request());
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

export const resetPassword = (code, password, redirectCallback) => {
  return dispatch => {
    dispatch(userSlice.actions.request());
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

export const logout = (redirectCallback) => {
  const refreshToken = getCookie('refreshToken');

  return dispatch => {
    dispatch(userSlice.actions.request());
    fetch(`${NORMA_API}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": refreshToken
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

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      password: fakeUserData.password,
      orders: fakeUserData.orders
    },
    userRequest: false,
    userFailed: false,
    userSuccess: false,
    isAuthorized: false
  },
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
    success(state, action) {
      state.userSuccess = true;
      state.userRequest = false;
      state.userFailed = false;
    },
    setName(state, action) {
      state.user = {
        ...state.user,
        name: action.payload
        }
    },
    setPassword(state, action) {
      state.user = {
        ...state.user,
        password: action.payload
        }
    },
    setEmail(state, action) {
      state.user = {
        ...state.user,
        email: action.payload
      }
    },
    setOrders(state, action) {
      state.user = {
        ...state.user,
        orders: action.payload
      }
    },
    resetStatus(state, action) {
      state.userFailed = false;
    },
    resetUserData(state) {
      state.user.name = '';
      state.user.email = '';
      state.user.password = fakeUserData.password;
      state.user.orders = fakeUserData.orders;
    },
    setAuthorization(state, action) {
      state.isAuthorized = action.payload;
    },
    checkAuthorization(state) {
      state.isAuthorized = ((getCookie('accessToken') !== undefined) &&
        (getCookie('refreshToken') !== undefined));
    }
  }
}) 
