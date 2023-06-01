import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './services/hooks';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getItems } from './services/slices/items';

import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  FeedPage,
  OrderPage,
  OrderModalPage,
  ProfilePage,
  HistoryPage,
  IngredientPage,
  IngredientModalPage,
  NotFound404
} from './pages';
import { ProtectedRoute } from './components/protected-route';
import { ProtectedGuestRoute } from './components/protected-guest-route';
import AppHeader from './components/app-header/app-header';
import {
  FEED,
  FEED_ID, FORGOT_PASSWORD,
  INGRIDIENTS_ID, LOGIN, NOT_FOUND_PAGE,
  PROFILE,
  PROFILE_ORDERS,
  PROFILE_ORDERS_ID, REGISTER, RESET_PASSWORD
} from "./utils/routes-constants";

function App() {
  const dispatch = useAppDispatch();

  let location = useLocation();
  let background = location.state && location.state.background;

  const {
    itemsSuccess,
  } = useAppSelector(
      state => state.items
  );

  useEffect(() => {
    if (!itemsSuccess) {
      dispatch(getItems());
    }
  }, [dispatch, itemsSuccess]);


  return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />

          <Route path={LOGIN} element={<ProtectedGuestRoute element={<LoginPage />} />} />
          <Route path={REGISTER} element={<ProtectedGuestRoute element={<RegisterPage />} />} />
          <Route path={FORGOT_PASSWORD} element={<ProtectedGuestRoute element={<ForgotPasswordPage />} />} />

          <Route path={RESET_PASSWORD} element={<ProtectedGuestRoute element={<ResetPasswordPage />} />} />
          <Route path={FEED} element={<FeedPage />} />
          <Route path={FEED_ID} element={<OrderPage />} />

          <Route path={PROFILE} element={<ProtectedRoute children={<ProfilePage />} anonymous={false}  />} />
          <Route path={PROFILE_ORDERS} element={<ProtectedRoute children={<HistoryPage />} anonymous={false}  />} />
          <Route path={PROFILE_ORDERS_ID} element={<ProtectedRoute children={<OrderPage />} anonymous={false}  />} />

          {/*<Route path={PROFILE} element={<ProtectedRoute children={<ProfilePage />} />} />
          <Route path={PROFILE_ORDERS} element={<ProtectedRoute element={<HistoryPage />} />} />
          <Route path={PROFILE_ORDERS_ID} element={<ProtectedRoute element={<OrderPage />} />} />*/}


          <Route path={INGRIDIENTS_ID} element={<IngredientPage />} />

          <Route path={NOT_FOUND_PAGE} element={<NotFound404/>}/>
        </Routes>

        <Routes>
          {background && (
              <Route
                  path={INGRIDIENTS_ID}
                  element={
                    <IngredientModalPage />
                  }
              />
          )}

          {background && (
              <Route
                  path={PROFILE_ORDERS_ID}
                  element={
                    <OrderModalPage />
                  }
              />
          )}

          {background && (
              <Route
                  path={FEED_ID}
                  element={
                    <OrderModalPage />
                  }
              />
          )}
        </Routes>
      </>
  );
}

export default App;