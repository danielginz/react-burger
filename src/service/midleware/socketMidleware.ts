import { wsActions as wsActionsType } from '../actions/constant';
import { AppDispatch, rootStoreType } from '../../index';
import { Middleware, MiddlewareAPI } from 'redux';
export const socketMiddleware : (wsUrl : string, wsActions: typeof wsActionsType) => Middleware = (wsUrl : string, wsActions: typeof wsActionsType) => {
    return (store: MiddlewareAPI<AppDispatch, rootStoreType>) => {
      let socket : WebSocket | null = null;
  
      return (next : any) => (action: {type:string; payload: object | string}) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
        if (type === wsInit) {
          socket = new WebSocket((typeof payload === 'string' && payload) || wsUrl);
        }
        if (socket) {
          socket.onopen = (event: Event) => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = (event: Event) => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
  
            dispatch({ type: onMessage, payload: parsedData });
          };
  
          socket.onclose = (event: CloseEvent) => {
            dispatch({ type: onClose, payload: event });
          };

          if(type === onClose){
            socket.close()
          }
  
          if (type === wsSendMessage) {
            socket.send(JSON.stringify(payload));
          }
        }
  
        next(action);
      };
    };
  };