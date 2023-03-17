import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
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
  PROFILE_ORDERS_ID, REGISTER,
  RESETT_PASSWORD
} from "./utils/routes-constants";

function App() {
  const dispatch = useDispatch();

  let location = useLocation();
  let background = location.state && location.state.background;

  //const getItems = (state) => state.items

  const {
    itemsSuccess,
  } = useSelector(
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

        <Route path={LOGIN} element={<ProtectedGuestRoute element={<LoginPage />}/>} />
        <Route path={REGISTER} element={<ProtectedGuestRoute element={<RegisterPage />}/>} />
        <Route path={FORGOT_PASSWORD} element={<ProtectedGuestRoute element={<ForgotPasswordPage />}/>} />

        <Route path={RESETT_PASSWORD} element={<ResetPasswordPage element={<ForgotPasswordPage />}/>} />
        <Route path={FEED} element={<FeedPage />} />
        <Route path={FEED_ID} element={<OrderPage />} />

        <Route path={PROFILE} element={<ProtectedRoute element={<ProfilePage />}/>} />
        <Route path={PROFILE_ORDERS} element={<ProtectedRoute element={<HistoryPage />}/>} />
        <Route path={PROFILE_ORDERS_ID} element={<ProtectedRoute element={<OrderPage />}/>} />


        <Route path={INGRIDIENTS_ID} element={<IngredientPage />} />

        <Route path={NOT_FOUND_PAGE} element={<NotFound404/>}/>

        {
            background &&
            <Route path={INGRIDIENTS_ID} element={<IngredientModalPage />} />
        }
      </Routes>
    </>
  );
}

export default App;
