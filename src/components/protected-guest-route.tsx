import {Navigate, RouteProps} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { userSlice } from '../services/slices/user';
import {FC} from "react";

// @ts-ignore
export const ProtectedGuestRoute: FC<RouteProps> = ({ element }) => {
  const dispatch = useDispatch();

  const {
    isAuthorized
  } = useSelector(
      // @ts-ignore
    state => state.user
  );

  const { checkAuthorization } = userSlice.actions;

  dispatch(checkAuthorization());
  return !isAuthorized ? element : <Navigate to="/profile" replace/>;
}
