import appHeaderStyles from './app-header.module.css';
import MenuItem from '../menu-item/menu-item';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC } from 'react';
import { useNavigate } from "react-router-dom";
import {FEED, PROFILE} from "../../utils/routes-constants";
import {TIconProps} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

// AppHeader: FC<TIconProps> = () => {
const AppHeader: FC = () => {
    const [isHomePage, setHomePage] = useState<boolean>(false);
    const [isFeedPage, setFeedPage] = useState<boolean>(false);
    const [isProfilePage, setProfilePage] = useState<boolean>(false);
    const navigate = useNavigate();

    const currentUrl = window.location.pathname

    useEffect(() => {
        switch (currentUrl.split('/')[1]) {
            case '':
                setHomePage(true);
                break;
            case 'feed':
                setFeedPage(true);
                break;
            case 'profile':
                setProfilePage(true);
                break;
            default:
                break;
        }
    }, [currentUrl]);

    const onConstructorClick = () => {
        navigate("/");
    };

    const onFeedClick = () => {
        navigate(FEED);
    };
    const onProfileClick = () => {
        navigate(PROFILE);
    };

    return(
        <header>
            <nav className={appHeaderStyles.menu_container}>
                <ul className={appHeaderStyles.menu_list}>
                    <li className={appHeaderStyles.menu_list_left}>
                        <ul className={appHeaderStyles.menu_list_left_items}>
                            <li>
                                <MenuItem
                                    icon={
                                        <BurgerIcon type={isHomePage ? "primary" : "secondary"} />
                                    }
                                    text="Конструктор"
                                    onClick={onConstructorClick}
                                    active={isHomePage}
                                />
                            </li>
                            <li>

                                <MenuItem
                                    icon={
                                        <ListIcon type={isFeedPage ? "primary" : "secondary"} />
                                    }
                                    text="Лента заказов"
                                    onClick={onFeedClick}
                                    active={isFeedPage}
                                />
                            </li>
                        </ul>
                    </li>
                    <li className={appHeaderStyles.menu_list_center}>
                        <Logo />
                    </li>
                    <li className={appHeaderStyles.menu_list_right}>
                        <span>
                            <MenuItem
                                icon={
                                    <ProfileIcon type={isProfilePage ? "primary" : "secondary"} />
                                }
                                text="Личный кабинет"
                                onClick={onProfileClick}
                                active={isProfilePage}
                            />
                        </span>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
