import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
  } from './constant';
  
  export const wsConnectionSuccess = () => {
    return {
      type: WS_CONNECTION_SUCCESS
    };
  };
  
  export const wsConnectionError = () => {
    return {
      type: WS_CONNECTION_ERROR
    };
  };
  
  export const wsConnectionClosed = () => {
    return {
      type: WS_CONNECTION_CLOSED
    };
  };
  
  export const wsGetMessage = (message : string) => {
    return {
      type: WS_GET_MESSAGE,
      payload: message
    };
  };
  
  export const wsSendMessage = (message : string) => {
    return {
      type: WS_SEND_MESSAGE,
      payload: message
    };
  };

  export const wsActionCreator = {
    wsSendMessage,
    wsGetMessage,
    wsConnectionError,
    wsConnectionClosed,
    wsConnectionSuccess
  }