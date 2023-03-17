import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from '../services/slices/user';

export function ProtectedRoute({ element }) {
  const dispatch = useDispatch();

  const {
    isAuthorized
  } = useSelector(
    state => state.user
  );

  const { checkAuthorization } = userSlice.actions;

  dispatch(checkAuthorization());
  return isAuthorized ? element : <Navigate to="/login" replace/>;

}
