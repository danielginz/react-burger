import { createSlice } from '@reduxjs/toolkit'
import { NORMA_API } from '../../utils/burger-api';
import ErrorFallback from "../../utils/error-fallback";

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
            })
            .catch((error) => {
                <ErrorFallback error={error} />;
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
                    __v: ++item.__v
                } : item
            );
        },
        decreaseQuantityValue(state, action) {
            state.items = [...state.items].map(item =>
                item._id === action.payload ? {
                    ...item,
                    __v: --item.__v
                } : item
            );
        },
        clearValues(state) {
            state.items = [...state.items].map(item => ({
                ...item,
                __v: 0
            }));
        }
    }
})
