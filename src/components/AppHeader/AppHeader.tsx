import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback } from 'react';
import { useNavigate} from 'react-router-dom';
import { MAIN_URL, PROFILE_URL, LENTA_URL } from '../../utils/urls';
import AppHeaderButton from '../AppHeaderButton/AppHeaderButton';
import headerStyles from './AppHeader.module.css'

export default function AppHeader(){
    const navigate = useNavigate();
    const goToPage = useCallback((url: string) => navigate(url)/*.replace({pathname: url})*/, [navigate])
    return(
        <header className={headerStyles.header}>
            <div className={headerStyles.container}>
                <div className={headerStyles.menu}>
                    <AppHeaderButton title='Конструктор' href={() => goToPage(MAIN_URL)} icon={<BurgerIcon type='primary'/>} color='#fff' />
                    <AppHeaderButton title='Лента заказов' href={() => goToPage(LENTA_URL)} icon={<ListIcon type='secondary'/>} color='#8585AD' />
                </div>
                <Logo/>
                <div className={headerStyles.profile}>
                        <AppHeaderButton title='Личный кабинет' href={() => goToPage(PROFILE_URL)} icon={<ProfileIcon type='secondary' />} color='#8585AD' />
                </div>
            </div>
        </header>
    )
}