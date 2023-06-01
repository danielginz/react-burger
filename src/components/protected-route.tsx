import {Navigate, RouteProps, useLocation} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { userSlice } from '../services/slices/user';
import {FC, PropsWithChildren, useEffect} from "react";

export type ProtectedRoute = PropsWithChildren<{
  anonymous: boolean;
  children: JSX.Element
}>

export function ProtectedRoute({ children, anonymous = false }: ProtectedRoute) {
  const dispatch = useAppDispatch();

  const { checkAuthorization } = userSlice.actions;

  useEffect(() => {
    dispatch(checkAuthorization());
  }, []);

  const isAuthorized = useAppSelector((store) => store.user.isAuthorized);

  const location = useLocation();
  const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isAuthorized) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={ from } />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isAuthorized) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
}