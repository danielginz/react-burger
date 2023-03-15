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

function App() {
  const dispatch = useDispatch();

  let location = useLocation();
  let background = location.state && location.state.background;

  const {
    itemsSuccess,
  } = useSelector(
    state => state.items
  );

  // we need to have items from API in store to render ingredients on pages
  useEffect(() => {
    // we won't call API if items are already in store
    if (!itemsSuccess) {
      dispatch(getItems());
    }
  }, [dispatch, itemsSuccess]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>

        <Route path="/" element={<HomePage />} />

       {/* <Route path="/login" element={<ProtectedGuestRoute element={<LoginPage />}/>} />
        <Route path="/register" element={<ProtectedGuestRoute element={<RegisterPage />}/>} />*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/*<Route path="/forgot-password" element={<ProtectedGuestRoute element={<ForgotPasswordPage />}/>} />
        <Route path="/reset-password" element={<ProtectedGuestRoute element={<ResetPasswordPage />}/>} />*/}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/feed" element={<FeedPage />} />

        <Route path="/feed/:id" element={<OrderPage />} />

        {/*<Route path="/profile" element={<ProtectedRoute element={<ProfilePage />}/>} />
        <Route path="/profile/orders" element={<ProtectedRoute element={<HistoryPage />}/>} />*/}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/orders" element={<HistoryPage />} />

        {/*<Route path="/profile/orders/:id" element={<ProtectedRoute element={<OrderPage />}/>} />*/}
        <Route path="/profile/orders/:id" element={<OrderPage />} />

        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="*" element={<NotFound404/>}/>

        {
            background &&
            <Route path="/ingredients/:id" element={<IngredientModalPage />} />
        }
      </Routes>
    </>
  );
}

export default App;
