import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { burgerConstructorSlice } from './burger-constructor';
import { itemsSlice } from './items';
import { NORMA_API } from '../../utils/burger-api';
import { useAppDispatch } from '../../services/hooks';
import {INewOrder} from "../types";
import {getCookie, setCookie} from "../utils";
import {refreshToken} from "./user";
export const placeOrder = (items: (string | undefined)[]) => {
  return (dispatch = useAppDispatch()) => {
    dispatch(orderSlice.actions.request());

    // show modal right from request start to show loader
    dispatch(orderSlice.actions.openOrderModal());

    // get new order ID from API:
    fetch(`${NORMA_API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken')
      },
      body: JSON.stringify({
        "ingredients": items
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
            dispatch(orderSlice.actions.success({
              name: data.name,
              number: data.order.number,
              success: data.success
            }))
          }
          // if accessToken has gone stale we're need to refresh it first
          else if (data.message && data.message === 'jwt expired') {
            dispatch(orderSlice.actions.request());
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
                    dispatch(orderSlice.actions.request());
                    fetch(`${NORMA_API}/orders`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: getCookie('accessToken')
                      },
                      body: JSON.stringify({
                        "ingredients": items
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
                            dispatch(orderSlice.actions.success({
                              name: data.name,
                              number: data.order.number,
                              success: data.success
                            }))
                          }
                          else {
                            throw Error(data.message);
                          }
                        })
                        .catch((error) => {
                          dispatch(orderSlice.actions.failed());
                          console.log(error);
                        })
                  }
                  else {
                    throw Error(refresh_data.message);
                  }
                })
                .catch((error: any) => {
                  dispatch(orderSlice.actions.failed());
                  console.log(error);
                });
          }
          else {
            throw Error(data.message);
          }
        })
        .catch((error) => {
          dispatch(orderSlice.actions.failed());
          console.log(error);
        })
        .finally(() => {
          // clearing ordered ingredients from BurgerConstructor
          dispatch(burgerConstructorSlice.actions.setBunItem({}));
          dispatch(burgerConstructorSlice.actions.clearMiddleItems());
          dispatch(itemsSlice.actions.clearValues());

          /*dispatch(orderSlice.actions.openOrderModal())
          dispatch(burgerConstructorSlice.actions.setBunItem(null));
          dispatch(burgerConstructorSlice.actions.clearMiddleItems([]));
          dispatch(itemsSlice.actions.clearValues([]));*/

        })
  }
}

interface orderState {
    orderData: INewOrder,
    orderRequest: boolean,
    orderFailed: boolean,
    orderSuccess: boolean,
    isOrderModalOpen: boolean,
}

export const initialState: orderState = {
    orderData: {},
    orderRequest: false,
    orderFailed: false,
    orderSuccess: false,
    isOrderModalOpen: false,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        request(state) {
            state.orderRequest = true;
            state.orderFailed = false;
            state.orderSuccess = false;
            state.orderData = {};
        },
        failed(state) {
            state.orderFailed = true;
            state.orderRequest = false;
            state.orderSuccess = false;
            state.orderData = {
                success: false
            }
        },
        success(state, action: PayloadAction<INewOrder>) {
            state.orderSuccess = true;
            state.orderRequest = false;
            state.orderFailed = false;
            state.orderData = {
                name: action.payload.name,
                id: action.payload.number,
                success: action.payload.success
            }
        },
        openOrderModal(state) {
            state.isOrderModalOpen = true;
        },
        closeOrderModal(state) {
            state.isOrderModalOpen = false;
        }
    }
})

