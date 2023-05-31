import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIngredient } from '../types'

interface burgerConstructorState {
  bunItem: IIngredient,
  middleItems: Array<IIngredient>
}

// Define the initial state using that type
export const initialState: burgerConstructorState = {
  bunItem: {},
  middleItems: []
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBunItem(state, action: PayloadAction<IIngredient>) {
      state.bunItem = action.payload;
    },
    addMiddleItem(state, action: PayloadAction<IIngredient>) {
      state.middleItems.push(action.payload);
    },
    moveMiddleItem(state, action: PayloadAction<{ oldIndex: number, newIndex: number }>) {
      const movedItem = state.middleItems.splice(action.payload.oldIndex, 1);
      state.middleItems.splice(action.payload.newIndex, 0, movedItem[0]);
    },
    deleteMiddleItem(state, action: PayloadAction<number>) {
      state.middleItems.splice(action.payload, 1);
    },
    clearMiddleItems(state) {
      state.middleItems = [];
    }
  }
}) 
