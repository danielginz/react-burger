import { createSlice } from '@reduxjs/toolkit'
import { NORMA_API } from '../../utils/burger-api';

export const getItems = () => {
  return dispatch => {
    dispatch(itemsSlice.actions.request());
    fetch(`${NORMA_API}/ingredients`)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(({data}) => {
        dispatch(itemsSlice.actions.success(data));
        /*data.forEach(ingridient => {
          ingridient = { ...ingridient, quantity: 0};
          console.log("AAA, ingridient: "+JSON.stringify(ingridient));
        })*/
        dispatch(itemsSlice.actions.clearValues(data));
        //dispatch(data.clearValues([]));

        console.log("AAA, ingridient 111: "+JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(itemsSlice.actions.failed());
      })
  }
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    itemsSuccess: false,
  },
  reducers: {
    request(state) {
      state.itemsRequest = true;
      state.itemsFailed = false;
      state.itemsSuccess = false;
    },
    failed(state) {
      state.itemsFailed = true;
      state.itemsRequest = false;
      state.itemsSuccess = false;
    },
    success(state, action) {
      state.itemsSuccess = true;
      state.itemsRequest = false;
      state.itemsFailed = false;
      state.items = action.payload;
    },
    increaseQuantityValue(state, action) {
      state.items = [...state.items].map(item =>
          item._id === action.payload ? {
            ...item,
            quantity: ++item.quantity
          } : item
      );
    },
    decreaseQuantityValue(state, action) {
      state.items = [...state.items].map(item =>
          item._id === action.payload ? {
            ...item,
            quantity: --item.quantity
          } : item
      );
    },
    clearValues(state) {
      state.items = [...state.items].map(item => ({
        ...item,
        quantity: 0
      }));
    }
  }
}) 
