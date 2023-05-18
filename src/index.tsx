import React from "react";
import ReactDOM from "react-dom";
import './index.module.css';
import App from './app';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './services/slices';
import {BrowserRouter} from "react-router-dom";
import {wsMiddleware} from "./services/middleware";

/*const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
});*/
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                thunk,
                wsMiddleware()
            ),
    devTools: process.env.NODE_ENV !== 'production',
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);