import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../actions/constant';

  
  const initialState = {
    wsConnected: false,
    get: false,
    messages: []
  };
  
  export const wsReducer = (state = initialState, action : {type: string; payload: {} }) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false,
          get: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false,
          get: false,
          messages: []
        };
  
      case WS_GET_MESSAGE:
        return {
          ...state,
          get: true,
          messages: state.messages.length
            ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
            : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
        };
      default:
        return state;
    }
  };