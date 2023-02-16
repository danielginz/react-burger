import React from 'react';
import appHeaderStyles from './app-header.module.css';
import MenuItem from '../menu-item/menu-item';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return(
        <header>
            <nav className={appHeaderStyles.menu_container}>
                <ul className={appHeaderStyles.menu_list}>
                    <ul className={appHeaderStyles.menu_list_left}>
                        <MenuItem icon={<BurgerIcon type="primary" />} text="Конструктор" link="#" active/>
                        <MenuItem icon={<ListIcon type="secondary" />} text="Лента заказов" link="#" />
                    </ul>
                    <li className={appHeaderStyles.menu_list_center}>
                        <Logo />
                    </li>
                    <span className={appHeaderStyles.menu_list_right}>
                        <MenuItem icon={<ProfileIcon type="secondary" />} text="Личный кабинет" link="#" />
                    </span>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
