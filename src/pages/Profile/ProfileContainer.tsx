
import React, { ReactNode, useCallback } from "react";
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import signOut from "../../service/actions/signOut";
import { PROFILE_URL, ORDERS_URL } from "../../utils/urls";
import style from './Profile.module.css'
import { useAppDispatch } from '../../utils/uslessMove';

export type ProfileContainerProps = {children: ReactNode}

export default function ProfileContainer({children}: ProfileContainerProps){
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const logout = useCallback(() => dispatch(signOut(navigate)), [dispatch, navigate])

    return(
        <div className={style.container}>
            <div className={style.sidebar + ' pr-15'}>
                <NavLink to={{pathname: PROFILE_URL}} className={({ isActive }) => (isActive ? `${style.active}` : `text text_type_main-medium pb-6 ${style.chat}`)}>
                    Профиль
                </NavLink>
                <NavLink to={{pathname: ORDERS_URL}} className={({ isActive }) => (isActive ? `${style.active}` : `text text_type_main-medium pb-6 ${style.chat}`)}>
                    История заказов
                </NavLink>
                <div className={`text text_type_main-medium ${style.chat}`} onClick={logout}>
                    Выйти
                </div>
            </div>
            <div className={useLocation().pathname !== ORDERS_URL ? style.card : style.orderCard}>
                {children}
            </div>
        </div>
    )
}