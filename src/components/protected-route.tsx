import {Navigate, RouteProps} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from '../services/slices/user';
import {FC, useEffect} from "react";

// @ts-ignore
export const ProtectedRoute: FC<RouteProps> = ({ element }) => {
  const dispatch = useDispatch();

  const currentUrl = window.location.pathname
  console.log("AAA, ProtectedRoute, currentUrl: "+currentUrl)

  const {
    isAuthorized
  } = useSelector(
      // @ts-ignore
      state => state.user
  );

  const { checkAuthorization } = userSlice.actions;

  useEffect(() => {
    dispatch(checkAuthorization());
  }, []);

  return isAuthorized ? element : <Navigate to="/login" replace/>;

}
