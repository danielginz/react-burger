import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { NORMA_API } from '../../utils/burger-api';
import { useAppDispatch } from '../../services/hooks';
import {IIngredient} from "../types";

export const getItems = () => {
  return (dispatch = useAppDispatch()) => {
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
            dispatch(itemsSlice.actions.clearValues(data));
          })
          .catch((error) => {
            console.log(error);
            dispatch(itemsSlice.actions.failed());
          })
  }
}

interface itemsState {
    items: Array<IIngredient>,
    itemsRequest: boolean,
    itemsFailed: boolean,
    itemsSuccess: boolean,
}

export const initialState: itemsState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    itemsSuccess: false,
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
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
        success(state, action: PayloadAction<Array<IIngredient>>) {
            state.itemsSuccess = true;
            state.itemsRequest = false;
            state.itemsFailed = false;
            state.items = action.payload;
        },
        increaseQuantityValue(state, action: PayloadAction<string>) {
            state.items = [...state.items].map(item =>
                item._id === action.payload ? {
                    ...item,
                    quantity: (item.quantity || 0) + 1
                } : item
            );
        },
        decreaseQuantityValue(state, action: PayloadAction<string>) {
            state.items = [...state.items].map(item =>
                item._id === action.payload ? {
                    ...item,
                    quantity: (item.quantity || 1) - 1
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