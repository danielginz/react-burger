import { createSlice } from '@reduxjs/toolkit'

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bunItem: {},
        middleItems: [],
        totalPrice: 0
    },
    reducers: {
        setBunItem(state, action) {
            state.bunItem = action.payload;
        },
        addMiddleItem(state, action) {
            state.middleItems.push(action.payload);
        },
        moveMiddleItem(state, action) {
            const movedItem = state.middleItems.splice(action.payload.oldIndex, 1);
            state.middleItems.splice(action.payload.newIndex, 0, movedItem[0]);
        },
        deleteMiddleItem(state, action) {
            state.middleItems.splice(action.payload, 1);
        },
        clearMiddleItems(state) {
            state.middleItems = [];
        },
        calcTotalPrice(state) {
            !!state.bunItem.name ? (
                // there are 2 types of bun only:
                state.totalPrice = state.bunItem.price * 2 + state.middleItems.reduce(
                    (acc, p) => acc + p.price, 0
                )
            ) : ( state.middleItems.length ? (
                    state.totalPrice = state.middleItems.reduce((acc, p) => acc + p.price, 0)
                ) : (
                    state.totalPrice = 0
                )
            );
        }
    }
})
