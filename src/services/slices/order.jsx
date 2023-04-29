import { createSlice } from '@reduxjs/toolkit'
import { burgerConstructorSlice } from './burger-constructor';
import { itemsSlice } from './items';
import { NORMA_API } from '../../utils/burger-api';

export const placeOrder = (items) => {
  return dispatch => {
    dispatch(orderSlice.actions.request());
    fetch(`${NORMA_API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
        if (data.success)
          dispatch(orderSlice.actions.success({
            name: data.name,
            number: data.order.number,
            success: data.success
          }))
        else {
          dispatch(orderSlice.actions.failed())
          throw Error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(orderSlice.actions.openOrderModal())
        dispatch(burgerConstructorSlice.actions.setBunItem(null));
        dispatch(burgerConstructorSlice.actions.clearMiddleItems([]));
        dispatch(itemsSlice.actions.clearValues([]));
      })
  }
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderData: {},
    orderRequest: false,
    orderFailed: false,
    orderSuccess: false,
    isOrderModalOpen: false,
  },
  reducers: {
    request(state) {
      state.orderRequest = true;
      state.orderFailed = false;
      state.orderSuccess = false;
    },
    failed(state) {
      state.orderFailed = true;
      state.orderRequest = false;
      state.orderSuccess = false;
      state.orderData = {
        success: false
      }
    },
    success(state, action) {
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
