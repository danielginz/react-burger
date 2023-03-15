import { Navigate, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from '../services/slices/user';

export function ProtectedRoute({ children, isGuestOnly, ...rest }) {
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
          children
        ) : (
          <Navigate
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
