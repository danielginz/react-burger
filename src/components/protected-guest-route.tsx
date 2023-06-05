import {Navigate, RouteProps} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../services/hooks';

import { userSlice } from '../services/slices/user';
import {FC, useEffect } from "react";

export const ProtectedGuestRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const dispatch = useAppDispatch();

  const {
    isAuthorized
  } = useAppSelector(
      state => state.user
  );

  const { checkAuthorization } = userSlice.actions;

  useEffect(() => {
    dispatch(checkAuthorization());
  }, [])

  return !isAuthorized ? element : <Navigate to="/profile" replace/>;
}
