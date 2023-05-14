import React, { useCallback, useEffect, useState } from 'react';
import {OrdersPage} from '../../pages'
import {BrowserRouter as Router, Route, useLocation, useNavigate, Routes} from 'react-router-dom';
import { FORGOT_URL, LOGIN_URL, MAIN_URL, ORDERS_URL, PROFILE_URL, REGISTRATION_URL, RESET_URL, INGRIDIENT_URL, LENTA_URL } from '../../utils/urls';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import checkUser from '../../service/actions/checkUSer';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { DELETE_MODAL_INGRIDIENTS } from '../../service/actions/constant';
import getIngridients from '../../service/actions/getIngridients';
import AppHeader from '../AppHeader/AppHeader';
import Forgot from '../../pages/Forgot/Forgot';
import Profile from '../../pages/Profile/Profile';
import Main from '../../pages/Main/Main';
import Registration from '../../pages/Registration/Registration';
import Reset from '../../pages/Reset/Reset';
import Login from '../../pages/Login/Login';
import { ingridientType } from '../../utils/types';
import Feed from '../../pages/Feed/Feed';
import FeedItem from '../FeedItem/FeedItem';
import IngredientPage from '../../pages/IngridientPage';
import { useAppDispatch, useAppSelector } from '../../utils/uslessMove';

function App() {
  const ModalSwitch = () => {
  const dispatch = useAppDispatch()
  const [isLoad, setIsLoad] = useState(false)
  //const location = useLocation<{background: any, orderBg: any}>()
  const location = useLocation();
  const navigate = useNavigate();
  const ingredients = useAppSelector(store => store.ingridients.burgerIngridients)
  const logout = useAppSelector(store => store.user.logoutSuccess)
  let background = location.state && location.state.background;
  let orderBg = location.state && location.state.orderBg
  let modalItem : ingridientType | null = null

  if(background && localStorage.getItem('id') !== null){
    let id = localStorage.getItem('id')
    modalItem = ingredients.filter((_: ingridientType) => _._id === id)[0]
  } 
  const onClose = useCallback(() => {
    localStorage.removeItem('id')
    navigate(MAIN_URL);//.replace({pathname: MAIN_URL})
    dispatch({type: DELETE_MODAL_INGRIDIENTS})
  }, [navigate, dispatch])
  const init = async () => {
   !logout && await dispatch(checkUser())
    setIsLoad(true)
  }

  const orderModalClose = useCallback(() => {
    navigate('/');//.goBack()
  }, [])

  useEffect(() => {
    init()
    dispatch(getIngridients())
  }, [])

  if(!isLoad){
    return null
  }

  return (
    <div className="App">
      <AppHeader/>
      <Routes location={orderBg || background || location}>
        <Route path={MAIN_URL} >
          <Main/>
        </Route>
        <ProtectedRoute path={LOGIN_URL} exact noAuthRoute={PROFILE_URL} kind='login'>
          <Login/>
        </ProtectedRoute>

        <ProtectedRoute path={REGISTRATION_URL} exact noAuthRoute={PROFILE_URL} kind='login'>
          <Registration/>
        </ProtectedRoute>
        <ProtectedRoute path={FORGOT_URL} exact noAuthRoute={PROFILE_URL} kind='login'>
          <Forgot/>
        </ProtectedRoute>
        <ProtectedRoute path={RESET_URL} exact noAuthRoute={FORGOT_URL} kind='email'>
          <Reset/>
        </ProtectedRoute>
        <ProtectedRoute path={PROFILE_URL} exact noAuthRoute={LOGIN_URL} kind='user'>
          <Profile/>
        </ProtectedRoute>
        <ProtectedRoute path={ORDERS_URL} exact noAuthRoute={LOGIN_URL} kind='user'>
          <OrdersPage/>
        </ProtectedRoute>
        <ProtectedRoute path={ORDERS_URL+'/:number'} exact noAuthRoute={LOGIN_URL} kind='user'>
          <FeedItem/>
        </ProtectedRoute>
        <Route path={INGRIDIENT_URL+":id"}>
          <IngredientPage/>
        </Route>
        <Route path={LENTA_URL}>
          <Feed/>
        </Route>
        <Route path={LENTA_URL+'/:number'}>
          <FeedItem/>
        </Route>
      </Routes>
      {background && modalItem !== null && ( 
          <Route
            path={INGRIDIENT_URL+":id"}
            children={

              <Modal onClose={onClose}>
               <IngredientDetails {...modalItem}/>
              </Modal>}
            
          />)}
      {
         !!orderBg &&(
          <>
            <Route
              path={LENTA_URL+"/:number"}
              children={
              <Modal onClose={orderModalClose}>
                <FeedItem/>
              </Modal>
              }
            />
            <ProtectedRoute path={ORDERS_URL+'/:number'} exact noAuthRoute={LOGIN_URL} kind='user'>
                <Modal onClose={orderModalClose}>
                  <FeedItem/>
                </Modal>
            </ProtectedRoute>
            </>
         )}
        
    </div>
  );
  }

  return(
    <Router>
      <ModalSwitch/>
    </Router>
  )
}


export default App;
