import { useSelector, useDispatch } from "react-redux";
import sidebarStyles from './sidebar.module.css';
import SidebarLink from '../sidebar-link/sidebar-link';
import { logout, userSlice } from '../../services/slices/user';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {LOGIN, PROFILE, PROFILE_ORDERS} from "../../utils/routes-constants";

function Sidebar() {
  const dispatch = useDispatch();

  const { userRequest } = useSelector(state => state.user);
  const { resetStatus } = userSlice.actions;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetStatus());
  }, [])


  const [isProfilePage, setProfilePage] = useState(false);
  const [isHistoryPage, setHistoryPage] = useState(false);

  const currentUrl = window.location.pathname
    
  useEffect(() => {
    switch (currentUrl) {
      case PROFILE:
          setProfilePage(true);
          break;
      case PROFILE_ORDERS:
          setHistoryPage(true);
          break;
        default:
          break;
    }
  }, [currentUrl]);

  const onProfileClick = () => {
    navigate(PROFILE);
  };

  const onHistoryClick = () => {
    navigate(PROFILE_ORDERS);
  };

  const redirectOnSuccess = () => {
    navigate(LOGIN);
  }

  const onLogoutClick = () => {
    if (!userRequest) {
      dispatch(logout(redirectOnSuccess));
    }
  };

  return(
    <aside className={sidebarStyles.sidebar_container}>
      <ul className={sidebarStyles.sidebar_list}>
        <SidebarLink
          text={'Профиль'}
          onClick={onProfileClick}
          active={isProfilePage}
        />
        <SidebarLink
          text={'История заказов'}
          onClick={onHistoryClick}
          active={isHistoryPage}
        /> 
        <SidebarLink
          text={'Выход'}
          onClick={onLogoutClick}
        />
      </ul>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
);
}

export default Sidebar;
