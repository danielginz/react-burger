import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices';
import { wsMiddleware } from './middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        thunk,
        wsMiddleware()/*,
        wsMiddleware2()*/
      ),
  devTools: process.env.NODE_ENV !== 'production',
  }); 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch