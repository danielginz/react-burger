import { AnyAction, MiddlewareAPI } from 'redux'
import { wsSlice } from '../slices/websocket';
import { feedSlice } from '../slices/feed';
import { setCookie } from '../utils';
import { refreshToken } from '../slices/user';
import { USER_ORDERS_WS_URL, ALL_ORDERS_WS_URL} from "../../utils/burger-api";

const {
  wsConnectionStartUsers,
  wsConnectionStartAll,
  wsConnectionStop,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed
} = wsSlice.actions;

export const wsMiddleware = () => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (a: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      let url = '';
      if (type === wsConnectionStartUsers.type) {
        url = USER_ORDERS_WS_URL;
        const wsUrl: string = payload.token ? (
          `${url}?token=${payload.token}`
        ) : (
          `${url}`
        );
        socket = new WebSocket(wsUrl);
      }

      if (type === wsConnectionStartAll.type) {
        url = ALL_ORDERS_WS_URL;
        const wsUrl: string = payload.token ? (
            `${url}?token=${payload.token}`
        ) : (
            `${url}`
        );
        socket = new WebSocket(wsUrl);
      }
      
      if (type === wsConnectionStop.type) {
        // user has moved to another page
        // 1001 code fires an InvalidAccessError
        socket && socket.close(1000, 'CLOSE_NORMAL');
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(wsConnectionSuccess());
        };

        socket.onerror = event => {
          dispatch(wsConnectionError());
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          // if accessToken has gone stale we're need to refresh it first
          if (restParsedData.message && restParsedData.message === 'Invalid or missing token') {
            socket && socket.close(1000, 'CLOSE_NORMAL');
            refreshToken()
            .then((refresh_res) => {
              if (!refresh_res.ok && refresh_res.status >= 500) {
                throw Error(refresh_res.statusText);
              }
              return refresh_res.json();
            })
            .then((refresh_data) => {
              if (refresh_data.success === true) {
                setCookie('accessToken', refresh_data.accessToken, { path: '/' });
                setCookie('refreshToken', refresh_data.refreshToken, { path: '/' });
                const wsToken: string = refresh_data.accessToken.replace('Bearer ', '');
                const wsUrl: string = `${url}?token=${wsToken}`;
                socket = new WebSocket(wsUrl);
              }
              else {
                throw Error(refresh_data.message);
              }
            })
            .catch((error) => {
              dispatch(wsConnectionError());
              console.log(error);
            });

          }
          dispatch(feedSlice.actions.setOrdersData(restParsedData));
        };

        socket.onclose = event => {
          dispatch(wsConnectionClosed());
        };
      }

      next(action);
    };
  };
};
