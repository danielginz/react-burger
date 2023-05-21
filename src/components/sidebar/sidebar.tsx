import sidebarStyles from './sidebar.module.css';
import SidebarLink from '../sidebar-link/sidebar-link';
import { logout, userSlice } from '../../services/slices/user';

import { useNavigate } from 'react-router-dom';
import {useState, useEffect, FC} from 'react';
import {LOGIN, PROFILE, PROFILE_ORDERS} from "../../utils/routes-constants";
import { useAppSelector, useAppDispatch } from '../../services/hooks';

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { userRequest } = useAppSelector(state => state.user);
  const { resetStatus } = userSlice.actions;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetStatus());
  }, [])


  const [isProfilePage, setProfilePage] = useState<boolean>(false);
  const [isHistoryPage, setHistoryPage] = useState<boolean>(false);

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
      // @ts-ignore
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
          active={false}
        />
      </ul>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
);
}

export default Sidebar;
