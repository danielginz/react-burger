import { Navigate, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { userSlice } from '../services/slices/user';

export function ProtectedGuestRoute({ children, isGuestOnly, ...rest }) {
  const dispatch = useDispatch();

  const {
    isAuthorized
  } = useSelector(
    state => state.user
  );

  const { checkAuthorization } = userSlice.actions;

  dispatch(checkAuthorization());
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          <Navigate
            to={{
              pathname: '/profile'
            }}
          />
        ) : (
          children
        )
      }
    />
  )
}
