import {Navigate, RouteProps} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from '../services/hooks';

import { userSlice } from '../services/slices/user';
import {FC} from "react";

// @ts-ignore
export const ProtectedGuestRoute: FC<RouteProps> = ({ element }) => {
  const dispatch = useAppDispatch();

  const {
    isAuthorized
  } = useAppSelector(
    state => state.user
  );

  const { checkAuthorization } = userSlice.actions;

  dispatch(checkAuthorization());
  return !isAuthorized ? element : <Navigate to="/profile" replace/>;
}
