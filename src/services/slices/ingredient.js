import { createSlice } from '@reduxjs/toolkit'

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState: {
        selectedIngredient: {}
    },
    reducers: {
        openIngredientModal(state, action) {
            state.selectedIngredient = action.payload;
        },
        closeIngredientModal(state) {
            state.selectedIngredient = {};
        }
    }
})
